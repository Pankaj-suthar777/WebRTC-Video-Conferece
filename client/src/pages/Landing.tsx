import ChatBox from "@/components/chat/chat-box";

const Landing = () => {
  return (
    <div className="grid grid-cols-3 h-screen overflow-hidden p-4">
      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex-grow bg-red-200 relative">
          <div className="absolute bottom-4 right-4 h-[100px] w-[150px] bg-yellow-200">
            <div className="w-full h-full"></div>
          </div>
        </div>
        <div className="h-[15%] bg-green-200"></div>
      </div>
      <div className="p-4 h-full overflow-hidden">
        <ChatBox />
      </div>
    </div>
  );
};

export default Landing;
