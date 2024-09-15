import { SendHorizonal } from "lucide-react";
import { Button } from "../custom/button";
import { Input } from "../ui/input";
import { colors } from "@/constant/colors";
import useSendMessageMutation from "@/hooks/mutations/message/useSendMessage";
import { useParams } from "react-router-dom";
import { useState } from "react";

const MessageInputSubmit = () => {
  const [text, setText] = useState("");
  const { mutate, isLoading } = useSendMessageMutation();
  const { roomId } = useParams();

  const submitHandler = () => {
    if (!roomId) return;

    mutate({ roomId, text });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          className="mx-4 flex-grow text-lg md:h-[45px]"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          style={{ backgroundColor: colors.primary }}
          className="md:h-[45px]"
          type="submit"
          disabled={isLoading}
          loading={isLoading}
        >
          <SendHorizonal size={18} />
        </Button>
      </form>
    </>
  );
};

export default MessageInputSubmit;
