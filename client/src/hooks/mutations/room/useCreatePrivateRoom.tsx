import { getClient } from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";
import { useQueryClient } from "react-query";

const useCreatePrivateRoom = () => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [newlyCreateRoomLink, setNewlyCreateRoomLink] = useState("");

  const createRoom = async () => {
    setLoading(true);
    try {
      const client = await getClient();
      const response = await client.post("/room/create-room");
      toast({
        variant: "default",
        title: response?.data?.message,
      });
      setNewlyCreateRoomLink(response?.data?.roomLink);
      queryClient.invalidateQueries({ queryKey: ["my-rooms"] });
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
