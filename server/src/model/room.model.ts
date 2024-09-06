import { Model, model, ObjectId, Schema } from "mongoose";

interface User {
  name: string;
  isHost: boolean;
  socketId: string;
}

export interface RoomDocument {
  _id: ObjectId;
  users: User[];
  roomId: string;
}

const roomSchema = new Schema<RoomDocument>(
  {
    roomId: {
      type: String,
      required: true,
    },
    users: [
      {
        name: String,
        socketId: String,
        isHost: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default model("User", roomSchema) as Model<RoomDocument>;
