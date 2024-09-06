import express from "express";
import "dotenv/config";
import cors from "cors";

import { CLIENT_URL, PORT } from "./utils/variables";
import { app, server } from "./socket/socket";

app.use(
  cors({
    origin: [CLIENT_URL],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SERVER_PORT = PORT || 8000;
server.listen(SERVER_PORT, () => {
  console.log(`listening on ${SERVER_PORT}`);
});
