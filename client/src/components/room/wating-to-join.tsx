import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BarLoaderComponent from "../layout/bar-loader-component";
import { Button } from "../ui/button";

interface Props {
  otherUser: OtherUser | null;
  handleCallUser: () => void;
  remoteStream: any;
}

const WatingToJoin = ({ otherUser, handleCallUser, remoteStream }: Props) => {
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

          {!otherUser ? (
            <BarLoaderComponent />
          ) : (
            <Button
              onClick={() => {
                handleCallUser();
                setTimeout(handleCallUser, 1000);
              }}
            >
              Accept call
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WatingToJoin;
