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
import { useLocation, useParams } from "react-router-dom";

export interface SocketUser {
  name?: string;
  socketId?: string;
  isHost?: boolean;
}

const CallRoomPage = () => {
  const socket = useSocket();
  const { state } = useLocation();
  const { roomId } = useParams();

  const [micOn, setMicOn] = useState(true);
  const [otherUser, setOtherUser] = useState<SocketUser | null>(null);
  const [myInfo, setMyInfo] = useState<SocketUser | null>(null);
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
    socket,
  );

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev: any) => {
      const remoteStream = ev.streams;

      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.emit("get:all:user", { roomId });
  }, [roomId, socket]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("all:user", (data: any) => {
      const { all_users } = data;
      console.log("useruser", all_users[0]);

      if (!myInfo) return;
      if (!otherUser) {
        all_users?.[0].map((user: SocketUser) => {
          if (user.socketId !== myInfo?.socketId) {
            setOtherUser(user);
          }
        });
      }
    });

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("all:user", (data: any) => {
        const { all_users } = data;

        if (!otherUser) {
          all_users?.map((user: SocketUser) => {
            if (user.socketId !== myInfo?.socketId) {
              setOtherUser(user);
            }
          });
        }
      });
    };
  }, [
    handleCallAccepted,
    handleIncommingCall,
    handleNegoNeedFinal,
    handleNegoNeedIncomming,
    handleUserJoined,
    myInfo,
    myInfo?.socketId,
    otherUser,
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

  useEffect(() => {
    if (state) {
      setMyInfo({
        isHost: state.isHost,
        name: state.name,
        socketId: state.socketId,
      });
    }
  }, [state]);

  const micHandler = () => {
    setMicOn(!micOn);
  };

  return (
    <>
      <div className="grid h-screen overflow-hidden p-4 md:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="relative flex flex-grow justify-center bg-black">
            {remoteStream && (
              <div className="relative h-full w-fit">
                <ReactPlayer
                  playing
                  muted
                  height="100%"
                  width="100%"
                  url={remoteStream}
                />
                <div className="z-5 absolute bottom-0 flex h-14 w-full items-center justify-center bg-slate-600 opacity-40">
                  <p className="text-white opacity-100">{myInfo?.name}</p>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 right-4 h-fit w-fit">
              {myStream && (
                <div className="relative flex h-full w-fit flex-col items-center justify-center border border-black bg-black">
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
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex items-center space-x-4">
                <div
                  className="cursor-pointer rounded-full bg-red-200 p-4"
                  onClick={micHandler}
                >
                  {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                </div>
                <div className="cursor-pointer rounded-full bg-red-200 p-6">
                  <PhoneOff size={32} />
                </div>
                <div className="cursor-pointer rounded-full bg-red-200 p-4">
                  <Ellipsis size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden h-full overflow-hidden p-4 md:block">
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
