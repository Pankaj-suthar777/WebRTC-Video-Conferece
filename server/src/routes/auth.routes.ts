import { createUser, signIn, verifyToken } from "#/controllers/auth.controller";

import { Router } from "express";

const router = Router();

router.post("/register", createUser);
router.post("/login", signIn);
router.post("/verify-token", verifyToken);

export default router;
