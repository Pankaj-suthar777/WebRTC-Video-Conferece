import { Server } from "socket.io";
import http from "http";
import express from "express";
import { CLIENT_URL } from "#/utils/variables";
import messageModel from "#/model/message.model";
import roomModel from "#/model/room.model";
import historyModal from "#/model/history.modal";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL],
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

export interface RoomUser {
  name: string;
  socketId: string;
  isHost: boolean;
}

export const getReceiverUser = (
  roomId: string,
  senderSocketId: string
): RoomUser => {
  const room = rooms.get(roomId);
  if (!room) return;
  const otherUser = room.find((u: RoomUser) => u.socketId !== senderSocketId);
  return otherUser;
};

io.on("connection", (socket) => {
  socket.on("room:join", async (data) => {
    // room => roomId
    const { name, room, isHost } = data;

    if (!rooms.has(room)) {
      rooms.set(room, []);
    }

    const roomUsers = rooms.get(room);

    roomUsers.push({ name, socketId: socket.id, isHost });

    rooms.set(room, roomUsers);

    io.to(room).emit("user:joined", { name, socketId: socket.id, isHost });

    socket.join(room);
    io.to(socket.id).emit("room:join", { ...data, socketId: socket.id });
  });

  socket.on("get:all:user", async ({ roomId }) => {
    const roomUsers = rooms.get(roomId);

    io.to(socket.id).emit("all:user", { all_users: roomUsers });
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    rooms.forEach(async (users: RoomUser[], room) => {
      // Filter out the disconnected user
      const updatedUsers = users.filter((user) => user.socketId !== socket.id);

      // If no users remain in the room, you can delete the room
      if (updatedUsers.length === 0) {
        rooms.delete(room);
        await messageModel.deleteMany({ roomId: room });
        await roomModel.deleteOne({ roomId: room });
      } else {
        await historyModal.create({
          roomId: room,
          users,
        });

        rooms.set(room, updatedUsers);
        // Notify other users in the room that a user has disconnected
        io.to(room).emit("user:disconnected", { socketId: socket.id });
      }
    });
  });
});

export { app, io, server };
