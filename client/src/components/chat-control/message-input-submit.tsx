import { SendHorizonal } from "lucide-react";
import { Button } from "../custom/button";
import { Input } from "../ui/input";
import { colors } from "@/constant/colors";
import useSendMessageMutation from "@/hooks/mutations/message/useSendMessage";
import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import useMySocketInfoStore from "@/store/mySocketInfo";

const MessageInputSubmit = () => {
  const [text, setText] = useState("");
  const { roomId } = useParams();

  const { mutate, isLoading } = useSendMessageMutation();
  const { mySocketInfo } = useMySocketInfoStore();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!roomId || !mySocketInfo) return;
    const { isHost, name, socketId } = mySocketInfo;

    mutate({ roomId, text, isHost, name, socketId });
    setText("");
  };

  return (
    <>
      <form onSubmit={submitHandler} className="flex w-full">
        <Input
          type="text"
          className="mx-4 flex-grow text-lg md:h-[45px]"
          placeholder="Type a message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
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
