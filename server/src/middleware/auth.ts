import User from "#/model/user.model";
import { JWT_SECRET } from "#/utils/variables";
import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export const isAuth: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];
  if (token) {
    const payload = verify(token, JWT_SECRET) as JwtPayload;
    const id = payload.userId;

    const user = await User.findOne({ _id: id });
    if (!user) return res.status(403).json({ error: "Unauthorized request!" });

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar?.url,
    };

    req.token = token;
  }
  next();
};
