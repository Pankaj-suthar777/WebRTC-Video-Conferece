import { Request } from "express";

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
