import NextButton from "./next-button";
import ChatMessages from "./chat-messages";
import MessageInputSubmit from "./message-input-submit";

interface Props {
  showNextButton?: boolean;
}

const ChatControlBox = ({ showNextButton = true }: Props) => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="mb-2 mt-2 h-20 w-full bg-slate-400 md:mt-0 md:h-16"></div>
      <div className="flex-grow overflow-y-auto">
        {/* Chat messages */}
        <ChatMessages />
      </div>
      <div className="w-full md:px-4">
        {/* Chat input */}
        <div className="flex h-16 items-center justify-center">
          {showNextButton && <NextButton />}

          <MessageInputSubmit />
        </div>
      </div>
    </div>
  );
};

export default ChatControlBox;
