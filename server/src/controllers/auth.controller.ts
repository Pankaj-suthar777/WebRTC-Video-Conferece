import { CreateUser } from "#/@types/user";
import userModel from "#/model/user.model";
import { JWT_SECRET } from "#/utils/variables";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const createUser: RequestHandler = async (req: CreateUser, res) => {
  const { email, password, name } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.status(403).json({ error: "Email is already in use!" });
    }

    const user = await userModel.create({ email, password, name });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.status(201).json({
      user: { id: user._id, name, email },
      message: "Signup is successfull",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const signIn: RequestHandler = async (req, res) => {
  const { password, email } = req.body;

  const user = await userModel.findOne({
    email,
  });
  if (!user) return res.status(403).json({ error: "Email/Password mismatch!" });

  // compare the password
  const matched = await user.comparePassword(password);
  if (!matched)
    return res.status(403).json({ error: "Email/Password mismatch!" });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar?.url,
    },
    token,
  });
};

export const verifyToken: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;
    const isValid = jwt.verify(token, JWT_SECRET);
    console.log("isValid", isValid);
    res.send({ isValid });
  } catch (error) {
    res.status(401).send({ message: "Invalid or expired token", error });
  }
};
