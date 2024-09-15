import {
  create_room,
  delete_room,
  get_my_rooms,
  is_room_exist,
  is_host_joining,
  is_user_joining,
} from "#/controllers/room.controller";
import { isAuth } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import { RoomIdParamValidateSchema } from "#/schema/room.schema";

import { Router } from "express";

const router = Router();

// validation middleware
const roomIdValidation = validate(RoomIdParamValidateSchema);

// room related routes only
router.post("/create-room", isAuth, create_room);
router.get("/get-my-rooms", isAuth, get_my_rooms);
router.delete("/:roomId", roomIdValidation, isAuth, delete_room);
router.get("/is-room-exist/:roomId", roomIdValidation, is_room_exist);

// room and there user related routes only
router.get(
  "/join-room-host/:roomId",
  roomIdValidation,
  isAuth,
  is_host_joining
);
router.get("/join-room-user/:roomId", roomIdValidation, is_user_joining);

export default router;
