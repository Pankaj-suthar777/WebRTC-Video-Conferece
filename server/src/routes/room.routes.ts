import {
  create_room,
  delete_room,
  get_my_rooms,
  is_room_exist,
} from "#/controllers/room.controller";
import { isAuth } from "#/middleware/auth";

import { Router } from "express";

const router = Router();

router.post("/create-room", isAuth, create_room);
router.get("/get-my-rooms", isAuth, get_my_rooms);
router.delete("/:roomId", isAuth, delete_room);
router.get("/is-room-exist/:roomId", is_room_exist);

export default router;
