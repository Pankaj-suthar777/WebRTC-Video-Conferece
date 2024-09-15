import { Message } from "@/@types/message";
import { getClient } from "@/api/client";
import { useQuery } from "react-query";
import { toast } from "../use-toast";

const getRoomMessages = async (roomId: string | undefined) => {
  if (!roomId) return;
  const client = await getClient();
  const { data } = await client.get("/message/get-room-messages/" + roomId);
  return data;
};

export const useGetRoomMessages = (roomId: string | undefined) => {
  return useQuery<{ messages: Message[] }>({
    queryKey: ["messages", roomId],
    queryFn: () => getRoomMessages(roomId),
    onError: (error: any) => {
      toast({
        title: error?.message || "something went wrong",
      });
    },
    enabled: !!roomId,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
