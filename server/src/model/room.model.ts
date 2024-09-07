import { Model, model, ObjectId, Schema } from "mongoose";

export interface RoomDocument {
  _id: ObjectId;
  roomId: string;
  isPrivateRoom: boolean;
  hostId: ObjectId;
}

const roomSchema = new Schema<RoomDocument>(
  {
    roomId: {
      type: String,
      required: true,
    },
    isPrivateRoom: {
      type: Boolean,
      default: false,
    },
    hostId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model("room", roomSchema) as Model<RoomDocument>;
