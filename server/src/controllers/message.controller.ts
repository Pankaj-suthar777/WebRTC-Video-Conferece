import { CreateMessage } from "#/@types/message";
import messageModel from "#/model/message.model";
import { getReceiverUser, io } from "#/socket/socket";
import { RequestHandler } from "express";

export const send_message: RequestHandler = async (req: CreateMessage, res) => {
  try {
    const { text, name, socketId, isHost } = req.body;
    const { roomId } = req.params;

    await messageModel.create({
      text,
      roomId,
      name,
      socketId,
      isHost,
    });
    const receiver = getReceiverUser(roomId, socketId);

    io.to(receiver.socketId).emit("newMessage", {
      text,
      roomId,
      name,
      socketId,
      isHost,
    });

    return res.send({
      message: "Message sent",
    });
  } catch (error) {
    res.send({
      message: error?.message,
    });
  }
};

export const get_room_messages: RequestHandler = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await messageModel.find({
      roomId,
    });

    return res.send({
      messages,
    });
  } catch (error) {
    res.send({
      message: error?.message,
    });
  }
};
