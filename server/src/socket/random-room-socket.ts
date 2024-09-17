import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export const userSocketMap = new Set([]);
export const roomSocketMap = new Map();

export const randomRoomFunc = (socket: Socket, io: any) => {
  if (!userSocketMap.has(socket.id)) {
    io.emit("my-socket-id", socket.id);
    userSocketMap.add(socket.id);
  }

  socket.on("connect:users", async ({ otherUserSocketId }: any) => {
    const roomId = uuidv4();

    if (!roomSocketMap.has(roomId)) {
      roomSocketMap.set(roomId, [otherUserSocketId, socket.id]);
    }
  });
};

export const randomRoomDisconnectUserFunc = (socket: Socket, io: any) => {
  if (userSocketMap.has(socket.id)) {
    userSocketMap.delete(socket.id);
  }
};
