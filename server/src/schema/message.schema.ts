import { z } from "zod";

export const CreateMessageSchema = z.object({
  body: z.object({
    text: z.string({
      required_error: "text is required",
    }),
    socketId: z.string({
      required_error: "socketId is required",
    }),
    name: z.string({
      required_error: "name is required",
    }),
    isHost: z.boolean().optional(),
  }),
  params: z.object({
    roomId: z.string({
      required_error: "roomId is required in parameter",
    }),
  }),
});
