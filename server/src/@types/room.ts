import { Request } from "express";

export interface CreateRoom extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: any;
        name: string;
        email: string;
        avatar?: string;
      };
      token: string;
    }
  }
}
