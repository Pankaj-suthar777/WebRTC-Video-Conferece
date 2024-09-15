import {
  send_message,
  get_room_messages,
} from "#/controllers/message.controller";
import { validate } from "#/middleware/validator";
import { CreateMessageSchema } from "#/schema/message.schema";
import { Router } from "express";

const router = Router();

router.post(
  "/send-message/:roomId",
  validate(CreateMessageSchema),
  send_message
);
router.get("/get-room-messages/:roomId", get_room_messages);

export default router;
