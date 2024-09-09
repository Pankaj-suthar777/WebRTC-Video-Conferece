import { createUser, signIn, verifyToken } from "#/controllers/auth.controller";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  LoginUserSchema,
  VerfiyUserSchema,
} from "#/schema/user.schema";

import { Router } from "express";

const router = Router();

router.post("/register", validate(CreateUserSchema), createUser);
router.post("/login", validate(LoginUserSchema), signIn);
router.post("/verify-token", validate(VerfiyUserSchema), verifyToken);

export default router;
