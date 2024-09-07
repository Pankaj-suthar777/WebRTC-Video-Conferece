import roomModel from "#/model/room.model";
import { v4 as uuidv4 } from "uuid";
import { RequestHandler } from "express";
import { CreateRoom } from "#/@types/room";

export const create_room: RequestHandler = async (req: CreateRoom, res) => {
  const host = req.user.id;

  try {
    const roomId = uuidv4();
    const room = roomModel.create({
      hostId: host,
      roomId,
      isPrivateRoom: true,
    });
    res.send({
      roomId,
      message: "Room created successfully",
    });
  } catch (error) {}
};
