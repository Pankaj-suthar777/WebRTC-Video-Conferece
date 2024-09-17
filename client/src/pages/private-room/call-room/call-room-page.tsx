// import {
//   useHandleUserJoined,
//   useSendStreams,
//   useHandleCallAccepted,
//   useHandleNegoNeedIncomming,
//   useHandleNegoNeedFinal,
//   useHandleCallUser,
//   useHandleIncommingCall,
//   useHandleAllUsers,
//   useHandleRemoveDisconnectedUser,
// } from "@/utils/callFunctions";
// import { useSocket } from "@/context/SocketProvider";
// import peer from "@/service/peer";
// import { useEffect, useState } from "react";
// import ReactPlayer from "react-player";
// import WatingToJoin from "@/components/room/wating-to-join";
// import { PhoneOff, Ellipsis, Mic, MicOff, Video, VideoOff } from "lucide-react";
// import ChatControlBox from "@/components/chat-control/chat-control-box";
// import { useLocation, useParams } from "react-router-dom";

// export interface SocketUser {
//   name: string;
//   socketId: string;
//   isHost?: boolean;
// }

// const CallRoomPage = () => {
//   const socket = useSocket();
//   const { state } = useLocation();
//   const { roomId } = useParams();

//   const [micOn, setMicOn] = useState(true);
//   const [videoOn, setVideoOn] = useState(true);

//   const [otherUser, setOtherUser] = useState<SocketUser | null>(null);
//   const [myInfo, setMyInfo] = useState<SocketUser | null>(null);
//   const [myStream, setMyStream] = useState<MediaStream | null>(null);
//   const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

//   const handleUserJoined = useHandleUserJoined(setOtherUser);
//   const sendStreams = useSendStreams(myStream);
//   const handleCallAccepted = useHandleCallAccepted(sendStreams);
//   const handleNegoNeedIncomming = useHandleNegoNeedIncomming(socket);
//   const handleNegoNeedFinal = useHandleNegoNeedFinal();
//   const handleCallUser = useHandleCallUser(otherUser, socket, setMyStream);
//   const handleIncommingCall = useHandleIncommingCall(
//     otherUser,
//     setOtherUser,
//     setMyStream,
//     socket,
//   );
//   const handleAllUsers = useHandleAllUsers({
//     myInfo,
//     otherUser,
//     setOtherUser,
//   });
//   const handleRemovedDisconnectedUser = useHandleRemoveDisconnectedUser({
//     otherUser,
//     setOtherUser,
//   });

//   useEffect(() => {
//     const handleTrackEvent = async (ev: any) => {
//       const remoteStream = ev.streams[0];
//       setRemoteStream(remoteStream);
//     };

//     if (peer?.peer) {
//       peer.peer.addEventListener("track", handleTrackEvent);
//     }

//     return () => {
//       if (peer?.peer) {
//         peer.peer.removeEventListener("track", handleTrackEvent);
//       }
//     };
//   }, [micOn]);

//   useEffect(() => {
//     socket.emit("get:all:user", { roomId });
//   }, [roomId, socket]);

//   useEffect(() => {
//     socket.on("user:joined", handleUserJoined);
//     socket.on("incomming:call", handleIncommingCall);
//     socket.on("call:accepted", handleCallAccepted);
//     socket.on("peer:nego:needed", handleNegoNeedIncomming);
//     socket.on("peer:nego:final", handleNegoNeedFinal);
//     socket.on("all:user", handleAllUsers);
//     socket.on("user:disconnected", handleRemovedDisconnectedUser);

//     return () => {
//       socket.off("user:joined", handleUserJoined);
//       socket.off("incomming:call", handleIncommingCall);
//       socket.off("call:accepted", handleCallAccepted);
//       socket.off("peer:nego:needed", handleNegoNeedIncomming);
//       socket.off("peer:nego:final", handleNegoNeedFinal);
//       socket.off("all:user", handleAllUsers);
//       socket.off("user:disconnected", handleRemovedDisconnectedUser);
//     };
//   }, [
//     handleAllUsers,
//     handleCallAccepted,
//     handleIncommingCall,
//     handleNegoNeedFinal,
//     handleNegoNeedIncomming,
//     handleRemovedDisconnectedUser,
//     handleUserJoined,
//     myInfo,
//     myInfo?.socketId,
//     otherUser,
//     socket,
//   ]);

//   useEffect(() => {
//     if (!myStream) {
//       handleCallUser();
//     }
//   }, [myStream, handleCallUser]);

//   useEffect(() => {
//     if (otherUser) {
//       if (!remoteStream) {
//         sendStreams();
//       }
//     }
//   }, [otherUser, remoteStream, sendStreams]);

//   useEffect(() => {
//     if (state) {
//       setMyInfo({
//         isHost: state.isHost,
//         name: state.name,
//         socketId: state.socketId,
//       });
//     }
//   }, [state]);

//   const micHandler = () => {
//     // setRemoteStream(remoteStr);
//     setMicOn(!micOn);
//   };

//   const videoHandler = () => {
//     if (myStream && myStream.getVideoTracks().length > 0) {
//       const videoTrack = myStream.getVideoTracks()[0];

//       // Ensure remoteStream and its video track are defined before assigning
//       const remoteVideoTracks = myStream.getVideoTracks();
//       console.log("remoteVideoTracks", remoteVideoTracks);
//       if (remoteVideoTracks.length > 0) {
//         for (let i = 0; i <= remoteVideoTracks.length; i++) {
//           if (!remoteVideoTracks[i]) break;
//           console.log("remoteVideoTracks.length", i, remoteVideoTracks[i]);
//           if (remoteVideoTracks[i]?.enabled === true) {
//             remoteVideoTracks[i].enabled = false;
//           } else {
//             remoteVideoTracks[i].enabled = true;
//           }
//         }
//       }

//       videoTrack.enabled = !videoOn;
//       setVideoOn(!videoOn);

//       console.log("Video is now", !videoOn ? "on" : "off");
//     } else {
//       console.log("No video track found in the stream");
//     }
//   };

//   return (
//     <>
//       <div className="grid h-screen overflow-hidden p-4 md:grid-cols-3">
//         <div className="col-span-2 flex flex-col gap-4">
//           <div className="relative flex flex-grow justify-center bg-black">
//             {remoteStream && (
//               <div className="relative h-full w-fit">
//                 <ReactPlayer
//                   playing
//                   muted
//                   height="100%"
//                   width="100%"
//                   url={remoteStream}
//                 />
//                 <div className="z-5 absolute bottom-0 flex h-14 w-full items-center justify-center bg-slate-600 opacity-40">
//                   <p className="text-white opacity-100">{myInfo?.name}</p>
//                 </div>
//               </div>
//             )}
//             <div className="absolute bottom-4 right-4 h-fit w-fit">
//               {myStream && (
//                 <div className="relative flex h-full w-fit flex-col items-center justify-center border border-black bg-black">
//                   <ReactPlayer
//                     playing
//                     muted
//                     height="98px"
//                     width="130px"
//                     url={myStream}
//                   />
//                   <p className="text-center text-sm text-white">
//                     {otherUser?.name}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="h-[15%] bg-green-200">
//             <div className="flex h-full w-full items-center justify-center">
//               <div className="flex items-center space-x-4">
//                 <div
//                   className="cursor-pointer rounded-full bg-red-200 p-4"
//                   onClick={videoHandler}
//                 >
//                   {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
//                 </div>
//                 <div
//                   className="cursor-pointer rounded-full bg-red-200 p-4"
//                   onClick={micHandler}
//                 >
//                   {micOn ? <Mic size={24} /> : <MicOff size={24} />}
//                 </div>
//                 <div className="cursor-pointer rounded-full bg-red-200 p-6">
//                   <PhoneOff size={32} />
//                 </div>
//                 <div className="cursor-pointer rounded-full bg-red-200 p-4">
//                   <Ellipsis size={24} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="hidden h-full overflow-hidden px-4 md:block">
//           <ChatControlBox showNextButton={false} />
//         </div>
//       </div>
//       <WatingToJoin
//         handleCallUser={handleCallUser}
//         otherUser={otherUser}
//         remoteStream={remoteStream}
//       />
//     </>
//   );
// };

// export default CallRoomPage;
import {
  useHandleUserJoined,
  useSendStreams,
  useHandleCallAccepted,
  useHandleNegoNeedIncomming,
  useHandleNegoNeedFinal,
  useHandleCallUser,
  useHandleIncommingCall,
  useHandleAllUsers,
  useHandleRemoveDisconnectedUser,
} from "@/utils/callFunctions";
import { useSocket } from "@/context/SocketProvider";
import peer from "@/service/peer";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import WatingToJoin from "@/components/room/wating-to-join";
import { PhoneOff, Ellipsis, Mic, MicOff, Video, VideoOff } from "lucide-react";
import ChatControlBox from "@/components/chat-control/chat-control-box";
import { useLocation, useParams } from "react-router-dom";

export interface SocketUser {
  name: string;
  socketId: string;
  isHost?: boolean;
}

const CallRoomPage = () => {
  const socket = useSocket();
  const { state } = useLocation();
  const { roomId } = useParams();

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const [otherUser, setOtherUser] = useState<SocketUser | null>(null);
  const [myInfo, setMyInfo] = useState<SocketUser | null>(null);
  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [remoteVideoOn, setRemoteVideoOn] = useState(true); // Track remote video status

  const handleUserJoined = useHandleUserJoined(setOtherUser);
  const sendStreams = useSendStreams(myStream);
  const handleCallAccepted = useHandleCallAccepted(sendStreams);
  const handleNegoNeedIncomming = useHandleNegoNeedIncomming(socket);
  const handleNegoNeedFinal = useHandleNegoNeedFinal();
  const handleCallUser = useHandleCallUser(otherUser, socket, setMyStream);
  const handleIncommingCall = useHandleIncommingCall(
    otherUser,
    setOtherUser,
    socket,
  );
  const handleAllUsers = useHandleAllUsers({
    myInfo,
    otherUser,
    setOtherUser,
  });
  const handleRemovedDisconnectedUser = useHandleRemoveDisconnectedUser({
    otherUser,
    setOtherUser,
  });

  useEffect(() => {
    socket.emit("get:all:user", { roomId });
  }, [roomId, socket]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("all:user", handleAllUsers);
    socket.on("user:disconnected", handleRemovedDisconnectedUser);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("all:user", handleAllUsers);
      socket.off("user:disconnected", handleRemovedDisconnectedUser);
    };
  }, [
    handleAllUsers,
    handleCallAccepted,
    handleIncommingCall,
    handleNegoNeedFinal,
    handleNegoNeedIncomming,
    handleRemovedDisconnectedUser,
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

  useEffect(() => {
    // Get user media (video/audio)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyStream(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  }, []);

  // Handle toggling video
  const videoHandler = () => {
    if (myStream && myStream.getVideoTracks().length > 0) {
      const videoTrack = myStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setVideoOn(videoTrack.enabled);
      console.log("videoTrack==?;;;", videoTrack);

      console.log("Video is now", videoTrack.enabled ? "on" : "off");
    } else {
      console.log("No video track found in the stream.");
    }
  };

  // Handle toggling microphone
  const micHandler = () => {
    if (myStream && myStream.getAudioTracks().length > 0) {
      const audioTrack = myStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setMicOn(audioTrack.enabled);
      console.log("Microphone is now", audioTrack.enabled ? "on" : "off");
      console.log("audioTrack==?;;;", audioTrack);
    } else {
      console.log("No audio track found in the stream.");
    }
  };

  useEffect(() => {
    const handleTrackEvent = async (ev: any) => {
      const remoteStream = ev.streams[0];
      setRemoteStream(remoteStream);

      // Check for video track in the incoming stream

      const remoteVideoTrack = remoteStream.getVideoTracks()[0];
      if (remoteVideoTrack) {
        remoteVideoTrack.onmute = () => setRemoteVideoOn(false); // When the remote video is turned off
        remoteVideoTrack.onunmute = () => setRemoteVideoOn(true); // When the remote video is turned on
      }
    };

    if (peer?.peer) {
      peer.peer.addEventListener("track", handleTrackEvent);
    }

    return () => {
      if (peer?.peer) {
        peer.peer.removeEventListener("track", handleTrackEvent);
      }
    };
  }, []);

  return (
    <>
      <div className="grid h-screen overflow-hidden p-4 md:grid-cols-3">
        <div className="col-span-2 flex flex-col items-center bg-black">
          <div className="relative flex max-w-[850px] flex-grow justify-center">
            {/* Only display remote video if the remote user's video is on */}
            {remoteStream && remoteVideoOn && (
              <ReactPlayer
                url={remoteStream}
                playing
                muted
                width="100%"
                height="100%"
              />
            )}
            <div className="absolute bottom-4 right-4 h-fit w-fit">
              {myStream && (
                <ReactPlayer
                  url={myStream}
                  playing
                  muted
                  width="130px"
                  height="98px"
                />
              )}
            </div>
          </div>
          <div className="h-[2%] w-full bg-white"></div>
          <div className="h-[15%] w-full bg-green-200">
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex items-center space-x-4">
                <div
                  className="cursor-pointer rounded-full border border-slate-400 bg-red-200 p-4 shadow-md"
                  onClick={videoHandler}
                >
                  {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
                </div>
                <div
                  className="cursor-pointer rounded-full border border-slate-400 bg-red-200 p-4 shadow-md"
                  onClick={micHandler}
                >
                  {micOn ? <Mic size={24} /> : <MicOff size={24} />}
                </div>
                <div className="cursor-pointer rounded-full border border-slate-400 bg-red-200 p-4 shadow-md">
                  <PhoneOff size={24} />
                </div>
                <div className="cursor-pointer rounded-full border border-slate-400 bg-red-200 p-4 shadow-md">
                  <Ellipsis size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden h-full w-full overflow-hidden px-4 md:block">
          <ChatControlBox showNextButton={false} />
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
