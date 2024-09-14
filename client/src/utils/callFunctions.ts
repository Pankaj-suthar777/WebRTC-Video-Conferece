import peer from "@/service/peer";
import { useCallback } from "react";
import { useSocket } from "@/context/SocketProvider";
import { SocketUser } from "@/pages/private-room/call-room/call-room-page";

interface OtherUser {
  name?: string;
  socketId?: string;
  isHost?: boolean;
}

// Handles when another user joins the call
export const useHandleUserJoined = (
  setOtherUser: (user: OtherUser | null) => void,
) => {
  return useCallback(
    (data: any) => {
      console.log("userdata===", data);
      console.log("here is done");
      setOtherUser({
        name: data.name,
        socketId: data.socketId,
        isHost: data?.isHost,
      });
    },
    [setOtherUser],
  );
};

// Sends the local media streams to the peer
export const useSendStreams = (myStream: MediaStream) => {
  return useCallback(() => {
    if (myStream) {
      for (const track of myStream.getTracks()) {
        try {
          peer.peer.addTrack(track, myStream);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [myStream]);
};

// Handles when a call is accepted by the other user
export const useHandleCallAccepted = (sendStreams: () => void) => {
  return useCallback(
    ({
      // from,
      ans,
    }: any) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams],
  );
};

// Handles an incoming negotiation offer from the peer
export const useHandleNegoNeedIncomming = (
  socket: ReturnType<typeof useSocket>,
) => {
  return useCallback(
    async ({ from, offer }: any) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket],
  );
};

// Handles the final negotiation response from the peer
export const useHandleNegoNeedFinal = () => {
  return useCallback(async ({ ans }: any) => {
    await peer.setLocalDescription(ans);
  }, []);
};

// Initiates a call to another user
export const useHandleCallUser = (
  otherUser: OtherUser | null,
  socket: ReturnType<typeof useSocket>,
  setMyStream: (stream: MediaStream) => void,
) => {
  return useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: otherUser?.socketId, offer });
    setMyStream(stream);
  }, [otherUser?.socketId, setMyStream, socket]);
};

// Handles an incoming call from another user
export const useHandleIncommingCall = (
  otherUser: OtherUser | null,
  setOtherUser: (user: OtherUser | null) => void,
  setMyStream: (stream: MediaStream) => void,
  socket: ReturnType<typeof useSocket>,
) => {
  return useCallback(
    async ({ from, offer }: any) => {
      setOtherUser({ ...otherUser, socketId: from });
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [otherUser, setOtherUser, setMyStream, socket],
  );
};

export const useHandleAllUsers = ({
  myInfo,
  otherUser,
  setOtherUser,
}: {
  myInfo: SocketUser | null;
  otherUser: SocketUser | null;
  setOtherUser: React.Dispatch<React.SetStateAction<SocketUser | null>>;
}) => {
  return useCallback(
    async (data: any) => {
      const { all_users } = data;

      if (!myInfo) return;
      if (!otherUser) {
        all_users?.map((user: SocketUser) => {
          if (user.socketId !== myInfo?.socketId) {
            setOtherUser(user);
          }
        });
      }
    },
    [myInfo, otherUser, setOtherUser],
  );
};
