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
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import ChatBox from "@/components/chat/chat-box";
import WatingToJoin from "@/components/room/wating-to-join";
import AcceptCall from "@/components/room/accept-call";
import { Button } from "@/components/ui/button";

export interface OtherUser {
  name?: string;
  socketId?: string;
}

const CallRoomPage = () => {
  const location = useLocation();
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
      console.log("GOT TRACKS!!");
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

  // useEffect(() => {
  //   if (myStream) {
  //     sendStreams();
  //   }
  // }, [myStream, sendStreams]);

  // console.log("done");

  // const callUser = useCallback(() => handleCallUser(), [handleCallUser]);
  // callUser();

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

  return (
    <>
      <div className="grid md:grid-cols-3 h-screen overflow-hidden p-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex-grow bg-red-200 relative flex justify-center">
            {remoteStream && (
              <div className="h-full w-fit">
                <ReactPlayer
                  playing
                  muted
                  height="100%"
                  width="100%"
                  url={remoteStream}
                />
              </div>
            )}
            <div className="absolute bottom-4 right-4 h-[100px] w-[150px]">
              {myStream && (
                <div className="h-full w-fit border border-black">
                  <ReactPlayer
                    playing
                    muted
                    height="100px"
                    width="150px"
                    url={myStream}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="h-[15%] bg-green-200"></div>
        </div>
        <div className="p-4 h-full overflow-hidden md:block hidden">
          <ChatBox />
        </div>
      </div>
      <WatingToJoin
        handleCallUser={handleCallUser}
        otherUser={otherUser}
        remoteStream={remoteStream}
      />
      {/* <AcceptCall acceptCallFunction={acceptCallHandler} /> */}
    </>
  );
};

export default CallRoomPage;

// <div>
//   <h1>Room Page</h1>
//   <h4>{otherUser?.socketId ? "Connected" : "No one in room"}</h4>
//   {myStream && <button onClick={sendStreams}>Send Stream</button>}
//   {otherUser?.socketId && <button onClick={handleCallUser}>CALL</button>}
//   {myStream && (
//     <>
//       <h1>My Stream</h1>
//       <ReactPlayer
//         playing
//         muted
//         height="100px"
//         width="200px"
//         url={myStream}
//       />
//     </>
//   )}
//   {remoteStream && (
//     <>
//       <h1>Remote Stream</h1>
//       <ReactPlayer
//         playing
//         muted
//         height="100px"
//         width="200px"
//         url={remoteStream}
//       />
//     </>
//   )}
// </div>
