import ChatControlBox from "@/components/chat-control/chat-control-box";
import Header from "@/components/layout/header";
import { useSocket } from "@/context/SocketProvider";
import { useEffect, useState } from "react";

interface SocketUser {
  socketId: string;
}

const RandomRoom = () => {
  const socket = useSocket();

  const [otherUser, setOtherUser] = useState<SocketUser | null>(null);
  const [myInfo, setMyInfo] = useState<SocketUser | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    socket.on("my-socket-id", async (data: any) => {
      setMyInfo(data);
    });
  }, [socket]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header />
      <div className="grid h-[calc(100vh-60px)] overflow-hidden p-2 md:grid-cols-2 md:p-4">
        <div className="flex h-[35vh] w-full flex-col gap-4 md:h-full">
          <div className="relative h-full w-full bg-black">
            {/* self camera - for mobile size device */}
            <div className="absolute bottom-4 right-4 h-[80px] w-[120px] bg-yellow-200 md:hidden">
              <div className="h-full w-full"></div>
            </div>
          </div>
          {/* self camera - for desktop/tablet size device */}
          <div className="hidden h-full w-full bg-black md:block"></div>
        </div>

        <div className="flex flex-1 items-center justify-center overflow-hidden md:h-full md:px-4">
          <ChatControlBox />
        </div>
      </div>
    </div>
  );
};

export default RandomRoom;
