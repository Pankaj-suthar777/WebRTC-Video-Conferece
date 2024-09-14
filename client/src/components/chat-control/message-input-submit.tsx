import { SendHorizonal } from "lucide-react";
import { Button } from "../custom/button";
import { Input } from "../ui/input";
import { colors } from "@/constant/colors";

const MessageInputSubmit = () => {
  return (
    <>
      <Input
        type="text"
        className="mx-4 flex-grow text-lg md:h-[45px]"
        placeholder="Type a message..."
      />
      <Button
        style={{ backgroundColor: colors.primary }}
        className="md:h-[45px]"
      >
        <SendHorizonal size={18} />
      </Button>
    </>
  );
};

export default MessageInputSubmit;
