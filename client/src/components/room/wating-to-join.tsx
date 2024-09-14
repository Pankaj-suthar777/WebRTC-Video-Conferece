import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BarLoaderComponent from "../layout/bar-loader-component";
import { Button } from "../ui/button";
import { SocketUser } from "@/pages/private-room/call-room/call-room-page";
import { useEffect } from "react";

interface Props {
  otherUser: SocketUser | null;
  handleCallUser: () => void;
  remoteStream: any;
}

const WatingToJoin = ({ otherUser, handleCallUser, remoteStream }: Props) => {
  const show = !remoteStream || !otherUser;

  useEffect(() => {
    const call = () => {
      handleCallUser();
      setTimeout(handleCallUser, 1000);
    };
    if (otherUser?.isHost === true) {
      call();
    }
  }, [handleCallUser, otherUser?.isHost]);

  return (
    <div>
      <Dialog open={show}>
        <DialogContent showCloseIcon={false} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {otherUser
                ? `${otherUser?.name} is trying to join`
                : "Waiting for someone to join"}
            </DialogTitle>
          </DialogHeader>

          {!otherUser ? (
            <BarLoaderComponent className="bg-indigo-600" />
          ) : (
            otherUser?.isHost === false && (
              <Button
                onClick={() => {
                  handleCallUser();
                  setTimeout(handleCallUser, 1000);
                }}
              >
                Accept call
              </Button>
            )
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WatingToJoin;
