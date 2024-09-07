import { create_room } from "#/controllers/room.controller";

import { Router } from "express";

const router = Router();

router.post("/register", create_room);

export default router;
