import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BarLoaderComponent from "../layout/bar-loader-component";
import { SocketUser } from "@/pages/private-room/call-room/call-room-page";

interface Props {
  otherUser: SocketUser | null;
  handleCallUser?: () => void;
  remoteStream: any;
}

const WatingToJoin = ({ otherUser, remoteStream }: Props) => {
  const show = !remoteStream || !otherUser;

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

          {!otherUser && <BarLoaderComponent colorClass="bg-indigo-600" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WatingToJoin;
