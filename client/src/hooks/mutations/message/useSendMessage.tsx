import { getClient } from "@/api/client";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "react-query";

interface BodyData {
  roomId: string;
  text: string;
}

const sendMessage = async ({ roomId, text }: BodyData) => {
  const client = await getClient();
  const { data } = await client.post("/message/send-message/" + roomId, {
    text,
  });
  return data;
};

const useSendMessageMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: BodyData) => await sendMessage(data),
    onMutate: ({ text, roomId }) => {
      //   queryClient.setQueryData<{ messages: Message[] }>(
      //     ["messages", roomId],
      //     (data) => {
      //       console.log("data=>>", data);
      //       //   const newMessagesArray = [messages];
      //       //   return { rooms: filterRooms };
      //     },
      //   );
    },
    onSuccess: (data: any) => {
      toast({
        title: data.message,
      });
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.message || "Something went wrong",
      });
    },
  });

  return { mutate, isLoading };
};

export default useSendMessageMutation;
