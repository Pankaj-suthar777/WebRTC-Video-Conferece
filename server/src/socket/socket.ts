import { Server } from "socket.io";
import http from "http";
import express from "express";
import { CLIENT_URL } from "#/utils/variables";
import roomModel from "#/model/room.model";

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
  socket.on("room:join", async (data) => {
    // room => roomId
    const { name, room, isHost } = data;

    if (!rooms.has(room)) {
      rooms.set(room, []);
    }

    const roomUsers = rooms.get(room);

    // const isHost = roomUsers.length === 0;

    roomUsers.push({ isHost, name, socketId: socket.id });

    rooms.set(room, roomUsers);

    io.to(room).emit("user:joined", { name, id: socket.id, isHost });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
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

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import { CLIENT_URL } from "#/utils/variables";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: [CLIENT_URL],
//     methods: ["GET", "POST"],
//   },
// });

// interface User {
//   isHost: boolean;
//   name: string;
// }

// const roomSocketMap: { [roomId: string]: string[] } = {}; // {roomId: socketIds[]}
// const userSocketMap: { [socketId: string]: User[] } = {};
// /* {socketId: User[]}
//       User {
//         isHost : boolean
//         name : string
//       }
// */

// export const getUserBySocketId = (socketId: string) => {
//   return userSocketMap[socketId];
// };

// export const getRoomSocketIdByRoomId = (roomId: string) => {
//   return roomSocketMap[roomId];
// };

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   socket.on("room:join", (data) => {
//     if (!roomSocketMap[data.roomId]) {
//       roomSocketMap[data.roomId].push(socket.id);
//       socket.join(data.roomId);
//       if (roomSocketMap[data.roomId].length === 2) {
//         io.to(data.roomId).emit("all-user-connected");
//       }
//     }
//   });

//   // io.to(roomId).emit();

//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);

//     // Remove the socketId from userSocketMap
//     delete userSocketMap[socket.id];

//     // Remove socketId from roomSocketMap for each room it may belong to
//     Object.keys(roomSocketMap).forEach((roomId) => {
//       roomSocketMap[roomId] = roomSocketMap[roomId].filter(
//         (id) => id !== socket.id
//       );

//       // clean up empty rooms
//       if (roomSocketMap[roomId].length === 0) {
//         delete roomSocketMap[roomId];
//       }
//     });
//   });
// });

// export { app, io, server };
