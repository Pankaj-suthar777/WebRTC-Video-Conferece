export interface Message {
  _id: string;
  roomId: string;
  text: string;
  socketId: string;
  name: string;
  isHost: boolean;
  createdAt: Date;
}
