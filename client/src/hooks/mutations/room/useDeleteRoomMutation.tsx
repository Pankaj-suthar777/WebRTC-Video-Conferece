import { Room } from "@/@types/room";
import { getClient } from "@/api/client";
import { useMutation, useQueryClient } from "react-query";

const deleteRoom = async (_id: string) => {
  const client = await getClient();
  const { data } = await client.delete("/room/" + _id);
  return data;
};

const useDeleteRoomMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (_id: string) => await deleteRoom(_id),
    onMutate: (_id) => {
      queryClient.setQueryData<{ rooms: Room[] }>(
        ["my-rooms"],
        (oldData: any) => {
          const filterRooms = oldData?.rooms?.filter((r: any) => r._id !== _id);

          return { rooms: filterRooms };
        },
      );
    },
  });

  return { mutate, isLoading };
};

export default useDeleteRoomMutation;
