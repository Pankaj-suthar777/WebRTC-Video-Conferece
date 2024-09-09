import client from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";
import { generateUniqueRoomId } from "@/utils/helper";

const generateLink = () => {
  const roomId = generateUniqueRoomId();

  const protocol = window.location.protocol;
  const host = window.location.host;

  const link = `${protocol}//${host}/room/${roomId}`;
  return link;
};

const useCreatePrivateRoom = () => {
  const [loading, setLoading] = useState(false);
  const [newlyCreateRoomLink, setNewlyCreateRoomLink] = useState("");

  const createRoom = async () => {
    setLoading(true);
    try {
      const roomId = generateLink();
      setNewlyCreateRoomLink(roomId);
      const response = await client.post("/room/create-room", { roomId });
      toast({
        variant: "default",
        title: response?.data?.message,
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return { createRoom, loading, newlyCreateRoomLink };
};

export default useCreatePrivateRoom;
