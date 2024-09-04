import { useSocket } from "@/context/SocketProvider";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface OtherUser {
  name: string;
  id: string;
}

const CallRoomPage = () => {
  const location = useLocation();
  const socket = useSocket();

  const [otherUser, setOtherUser] = useState<OtherUser | null>(null);
  const [myStream, setMyStream] = useState("");
  const [remoteStream, setRemoteStream] = useState("");

  const handleUserJoined = useCallback((data: any) => {
    setOtherUser(data);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);

    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [handleUserJoined, socket]);

  return (
    <div>
      <div>{location.state.yourName}</div>
      <div>{otherUser?.name}</div>
    </div>
  );
};

export default CallRoomPage;
