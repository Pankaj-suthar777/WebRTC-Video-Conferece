import { Model, model, ObjectId, Schema } from "mongoose";

export interface MessageDocument {
  _id: ObjectId;
  roomId: string;
  text: string;
  socketId: string;
  name: string;
  createdAt: Date;
  isHost: boolean;
}

const messageSchema = new Schema<MessageDocument>(
  {
    roomId: {
      type: String,
      required: true,
    },
    socketId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isHost: {
      type: Boolean,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("message", messageSchema) as Model<MessageDocument>;
