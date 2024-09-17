import { Server } from "socket.io";
import http from "http";
import express from "express";
import { CLIENT_URL } from "#/utils/variables";

import {
  privateRoomDisconnectUserFunc,
  privateRoomFunc,
} from "./private-room-socket";
import {
  randomRoomFunc,
  randomRoomDisconnectUserFunc,
} from "./random-room-socket";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL],
    methods: ["GET", "POST"],
  },
});

export const rooms = new Map();

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
  // private room sockets logic
  privateRoomFunc(socket, io);

  // random room sockets logic
  randomRoomFunc(socket, io);

  socket.on("disconnect", () => {
    privateRoomDisconnectUserFunc(socket, io);
    randomRoomDisconnectUserFunc(socket, io);
  });
});

export { app, io, server };
