import { Server } from "socket.io";
import http from "http";
import express from "express";
import { CLIENT_URL } from "#/utils/variables";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL],
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { name, room } = data;

    if (!rooms.has(room)) {
      rooms.set(room, []);
    }

    const roomUsers = rooms.get(room);

    const isHost = roomUsers.length === 0;

    roomUsers.push({ isHost, name, socketId: socket.id });
    rooms.set(room, roomUsers);

    io.to(room).emit("user:joined", { name, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
    const members = rooms.get(room);
    console.log(members);
    io.to(socket.id).emit("get-rooms-member-info", members);
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
});

export { app, io, server };
