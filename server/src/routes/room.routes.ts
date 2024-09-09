import { create_room } from "#/controllers/room.controller";
import { isAuth } from "#/middleware/auth";

import { Router } from "express";

const router = Router();

router.post("/create-room", isAuth, create_room);

export default router;
