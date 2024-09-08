import {
  useHandleUserJoined,
  useSendStreams,
  useHandleCallAccepted,
  useHandleNegoNeedIncomming,
  useHandleNegoNeedFinal,
  useHandleCallUser,
  useHandleIncommingCall,
} from "@/utils/callFunctions";
import { useSocket } from "@/context/SocketProvider";
import peer from "@/service/peer";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import WatingToJoin from "@/components/room/wating-to-join";
import { PhoneOff, Ellipsis, Mic, MicOff } from "lucide-react";
import ChatControlBox from "@/components/chat-control/chat-control-box";

export interface OtherUser {
  name?: string;
  socketId?: string;
  isHost?: boolean;
}

const CallRoomPage = () => {
  const [micOn, setMicOn] = useState(true);

  const socket = useSocket();

  const [otherUser, setOtherUser] = useState<OtherUser | null>(null);
  const [myStream, setMyStream] = useState<any>("");
  const [remoteStream, setRemoteStream] = useState<any>("");

  const handleUserJoined = useHandleUserJoined(setOtherUser);
  const sendStreams = useSendStreams(myStream);
  const handleCallAccepted = useHandleCallAccepted(sendStreams);
  const handleNegoNeedIncomming = useHandleNegoNeedIncomming(socket);
  const handleNegoNeedFinal = useHandleNegoNeedFinal();
  const handleCallUser = useHandleCallUser(otherUser, socket, setMyStream);
  const handleIncommingCall = useHandleIncommingCall(
    otherUser,
    setOtherUser,
    setMyStream,
    socket
  );

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev: any) => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    handleCallAccepted,
    handleIncommingCall,
    handleNegoNeedFinal,
    handleNegoNeedIncomming,
    handleUserJoined,
    socket,
  ]);

  useEffect(() => {
    if (!myStream) {
      handleCallUser();
    }
  }, [myStream, handleCallUser]);

  useEffect(() => {
    if (otherUser) {
      if (!remoteStream) {
        sendStreams();
      }
    }
  }, [otherUser, remoteStream, sendStreams]);

  const micHandler = () => {
    setMicOn(!micOn);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 h-screen overflow-hidden p-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex-grow bg-black relative flex justify-center">
            {remoteStream && (
              <div className="h-full w-fit relative">
                <ReactPlayer
                  playing
                  muted
                  height="100%"
                  width="100%"
                  url={remoteStream}
                />
                <div className="h-14 z-5 bg-slate-600 w-full absolute bottom-0 opacity-40 flex justify-center items-center">
                  {/* <p className="text-white opacity-100">{userName}</p> */}
                </div>
              </div>
            )}
            <div className="absolute bottom-4 right-4 h-fit w-fit">
              {myStream && (
                <div className="h-full w-fit border border-black bg-black relative flex justify-center flex-col items-center">
                  <ReactPlayer
                    playing
                    muted
                    height="98px"
                    width="130px"
                    url={myStream}
                  />
                  <p className="text-center text-sm text-white">
                    {otherUser?.name}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="h-[15%] bg-green-200">
            <div className="h-full w-full flex justify-center items-center">
              <div className="flex space-x-4 items-center">
                <div
                  className="p-4 bg-red-200 rounded-full cursor-pointer"
                  onClick={micHandler}
                >
                  {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                </div>
                <div className="p-6 bg-red-200 rounded-full cursor-pointer">
                  <PhoneOff size={32} />
                </div>
                <div className="p-4 bg-red-200 rounded-full cursor-pointer">
                  <Ellipsis size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 h-full overflow-hidden md:block hidden">
          <ChatControlBox />
        </div>
      </div>
      <WatingToJoin
        handleCallUser={handleCallUser}
        otherUser={otherUser}
        remoteStream={remoteStream}
      />
    </>
  );
};

export default CallRoomPage;
