import { z } from "zod";

export const RoomIdParamValidateSchema = z.object({
  params: z.object({
    roomId: z.string({
      required_error: "room id is required",
    }),
  }),
});
