import { SendHorizonal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ChatBox = () => {
  return (
    <div className="flex flex-col  w-full overflow-hidden h-full">
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
      <div className="w-full px-4">
        {/* Chat input */}
        <div className="flex justify-center items-center h-16">
          <Input
            type="text"
            className="mr-4 flex-grow"
            placeholder="Type a message..."
          />
          <Button variant={"ghost"}>
            <SendHorizonal size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
