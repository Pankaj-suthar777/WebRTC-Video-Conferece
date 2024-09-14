import { SendHorizonal, SkipForwardIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { colors } from "@/constant/colors";
import { useState } from "react";
import CompassLoader from "../layout/compass-loader";

const ChatControlBox = () => {
  const [isSearchingOtherChat, setIsSearchingOtherChat] = useState(false);

  const onClickNextChatHandler = () => {
    setIsSearchingOtherChat(true);
    setTimeout(() => setIsSearchingOtherChat(false), 5000);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="mb-2 mt-2 h-20 w-full bg-slate-400 md:mt-0 md:h-16"></div>
      <div className="flex-grow overflow-y-auto">
        {/* Chat messages */}
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2">
              <p className="text-sm text-gray-900">Hey, how are you?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg bg-blue-500 px-4 py-2">
              <p className="text-sm text-white">
                I'm good, thanks! How about you?
              </p>
            </div>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 5, 3, 4, 1, 1].map((_, index) => (
            <div key={index} className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2">
                <p className="text-sm text-gray-900">
                  I'm doing great, thanks for asking!
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:px-4">
        {/* Chat input */}
        <div className="flex h-16 items-center justify-center">
          <Button
            onClick={onClickNextChatHandler}
            variant={isSearchingOtherChat ? "outline" : "default"}
            style={{
              backgroundColor: isSearchingOtherChat ? "" : colors.primary,
            }}
            className="hidden items-center justify-center px-10 md:flex md:h-[45px]"
          >
            {isSearchingOtherChat ? (
              <CompassLoader height="18px" width="18px" />
            ) : (
              <SkipForwardIcon size={18} />
            )}
          </Button>
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
        </div>
      </div>
    </div>
  );
};

export default ChatControlBox;
