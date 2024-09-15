import { Request } from "express";

export interface CreateMessage extends Request {
  body: {
    text: string;
    name: string;
    socketId: string;
    isHost?: boolean;
  };
}
