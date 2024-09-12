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

export const get_my_rooms: RequestHandler = async (req, res) => {
  const user = req.user;

  try {
    const rooms = await roomModel.find({
      hostId: user.id,
    });

    res.send({
      rooms: rooms || [],
    });
  } catch (error) {
    res.send({
      message: error?.message,
    });
  }
};

export const delete_room: RequestHandler = async (req, res) => {
  const { roomId } = req.params;

  try {
    await roomModel.findByIdAndDelete(roomId);

    res.send({
      message: "room deleted",
    });
  } catch (error) {
    res.send({
      message: error?.message,
    });
  }
};

export const is_room_exist: RequestHandler = async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await roomModel.find({
      roomId,
    });

    if (room.length === 0) {
      return res.send({
        roomExist: false,
      });
    }

    return res.send({
      roomExist: true,
    });
  } catch (error) {
    res.send({
      message: error?.message,
    });
  }
};

export const is_host_joining: RequestHandler = async (req, res) => {
  const { roomId } = req.params;

  if (!req?.user) {
    return res.send({
      isHostTryingToJoin: false,
    });
  }

  const { id } = req?.user;

  try {
    const room = await roomModel.find({
      hostId: id,
      roomId: roomId,
    });

    if (room.length === 0) {
      return res.send({
        isHostTryingToJoin: false,
      });
    }

    return res.send({
      isHostTryingToJoin: true,
      name: req.user.name,
    });
  } catch (error) {
    res.send({
      message: error?.message,
    });
  }
};

export const is_user_joining: RequestHandler = async (req, res) => {
  const { roomId } = req.params;
  const { name } = req?.body;

  try {
    const room = await roomModel.find({
      roomId: roomId,
    });

    if (room.length === 0) {
      return res.status(401).send({
        message: "room not exist.",
      });
    }

    return res.send({
      isUserTryingToJoin: true,
    });
  } catch (error) {
    res.send({
      message: error?.message,
    });
  }
};
