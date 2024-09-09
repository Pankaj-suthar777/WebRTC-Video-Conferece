import { Request } from "express";

export interface CreateRoom extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}
