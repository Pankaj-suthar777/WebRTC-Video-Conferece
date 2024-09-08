import { SendHorizonal, SkipForwardIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { colors } from "@/constant/colors";

const ChatControlBox = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden h-full">
      <div className="md:h-16 h-20 bg-slate-400 w-full mb-2 mt-2 md:mt-0"></div>
      <div className="flex-grow overflow-y-auto">
        {/* Chat messages */}
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-gray-900 text-sm">Hey, how are you?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">
                I'm good, thanks! How about you?
              </p>
            </div>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 5, 3, 4, 1, 1].map((m, index) => (
            <div key={index} className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-gray-900 text-sm">
                  I'm doing great, thanks for asking!
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:px-4">
        {/* Chat input */}
        <div className="flex justify-center items-center h-16">
          <Button
            style={{ backgroundColor: colors.primary }}
            className="md:h-[50px] md:block hidden"
          >
            <SkipForwardIcon size={18} />
          </Button>
          <Input
            type="text"
            className="mx-4 flex-grow md:h-[50px] text-lg"
            placeholder="Type a message..."
          />
          <Button
            style={{ backgroundColor: colors.primary }}
            className="md:h-[50px]"
          >
            <SendHorizonal size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatControlBox;
