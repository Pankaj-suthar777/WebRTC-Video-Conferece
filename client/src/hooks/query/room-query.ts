import { Room } from "@/@types/room";
import client, { getClient } from "@/api/client";
import { useQuery } from "react-query";
import { toast } from "../use-toast";

const getMyRooms = async () => {
  const client = await getClient();
  const { data } = await client.get("/room/get-my-rooms");
  return data;
};

export const useGetRooms = () => {
  return useQuery<{ rooms: Room[] }>({
    queryKey: ["my-rooms"],
    queryFn: getMyRooms,
    onError: (error: any) => {
      toast({
        title: error?.message || "something went wrong",
      });
    },
  });
};

const isRoomExist = async (roomId: string) => {
  const { data } = await client.get("/room/is-room-exist/" + roomId);
  return data;
};

export const useIsRoomExist = (roomId: string) => {
  return useQuery<{ roomExist: boolean }>({
    queryKey: ["is-room-exist"],
    queryFn: () => isRoomExist(roomId),
    onError: (error: any) => {
      toast({
        title: error?.message || "something went wrong",
      });
    },
    enabled: !!roomId,
  });
};
