import { Message } from "@/@types/message";
import { getClient } from "@/api/client";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "react-query";

interface BodyData {
  roomId: string;
  text: string;
  socketId: string;
  name: string;
  isHost?: boolean;
}

const sendMessage = async ({
  roomId,
  name,
  socketId,
  text,
  isHost,
}: BodyData) => {
  const client = await getClient();
  const { data } = await client.post("/message/send-message/" + roomId, {
    name,
    socketId,
    text,
    isHost,
  });
  return data;
};

const useSendMessageMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: BodyData) => await sendMessage(data),
    onMutate: ({ roomId, name, socketId, text, isHost }) => {
      queryClient.setQueryData<{ messages: Message[] }>(
        ["messages", roomId],
        (data: any) => {
          const newMessagesArray = [
            ...data.messages,
            { roomId, name, socketId, text, isHost },
          ];
          return { messages: newMessagesArray };
        },
      );
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
