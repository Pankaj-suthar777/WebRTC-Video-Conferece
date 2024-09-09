import { Room } from "@/@types/room";
import { getClient } from "@/api/client";
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
