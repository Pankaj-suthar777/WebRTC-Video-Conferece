import roomModel from "#/model/room.model";
import { v4 as uuidv4 } from "uuid";
import { RequestHandler } from "express";
import { CreateRoom } from "#/@types/room";
import { CLIENT_URL } from "#/utils/variables";

export const create_room: RequestHandler = async (req: CreateRoom, res) => {
  const host = req.user.id;

  try {
    const roomId = uuidv4();

    await roomModel.create({
      hostId: host,
      roomId,
      isPrivateRoom: true,
    });

    const roomLink = `${CLIENT_URL}/room/${roomId}`;

    res.send({
      roomLink,
      roomId,
      message: "Room created successfully",
    });
  } catch (error) {
    res.send({
      message: error?.message,
    });
  }
};
