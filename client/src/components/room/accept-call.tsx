import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface Props {
  show?: boolean;
  acceptCallFunction: () => void;
}

const AcceptCall = ({ show = false, acceptCallFunction }: Props) => {
  return (
    <div>
      <Dialog open={show}>
        <DialogContent showCloseIcon={false} className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Accept Call</DialogTitle>
            <Button
              variant="default"
              onClick={() => {
                acceptCallFunction();
              }}
            >
              Accept call
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcceptCall;
