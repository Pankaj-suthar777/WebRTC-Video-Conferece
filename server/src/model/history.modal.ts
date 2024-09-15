import { RoomUser } from "#/socket/socket";
import { Model, model, ObjectId, Schema } from "mongoose";
import { boolean } from "zod";

export interface HistoryDocument {
  _id: ObjectId;
  roomId: string;
  users: RoomUser;
}

const historySchema = new Schema<HistoryDocument>(
  {
    roomId: {
      type: String,
      required: true,
    },
    users: [
      {
        name: {
          type: String,
          required: true,
        },
        socketId: {
          type: String,
          required: true,
        },
        isHost: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model("history", historySchema) as Model<HistoryDocument>;
