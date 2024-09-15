import express from "express";
import "dotenv/config";
import cors from "cors";
import "#/db";
import "#/utils/cron-job";

import { CLIENT_URL, PORT } from "./utils/variables";
import { app, server } from "./socket/socket";

app.use(
  cors({
    origin: [CLIENT_URL],
  })
);

import authRoute from "#/routes/auth.routes";
import roomRoute from "#/routes/room.routes";
import messageRoute from "#/routes/message.routes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/room", roomRoute);
app.use("/api/message", messageRoute);

const SERVER_PORT = PORT || 8000;
server.listen(SERVER_PORT, () => {
  console.log(`listening on ${SERVER_PORT}`);
});
