import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../custom/button";
import { CopyIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Loader from "../layout/loader";
import { toast } from "@/hooks/use-toast";
import useModalStore from "@/store/modalSlice";

interface ModalsProps {
  loading: boolean;
  newlyCreateRoomLink: string;
}

const ShareLinkModal = ({ loading, newlyCreateRoomLink }: ModalsProps) => {
  const { createRoomModalOpen, setCreateRoomModalOpen } = useModalStore();

  const copyRoomLink = () => {
    if (newlyCreateRoomLink) {
      navigator.clipboard.writeText(newlyCreateRoomLink);
      toast({ title: "Link is copied to clipboard" });
    }
  };

  return (
    <div>
      <Dialog
        open={createRoomModalOpen}
        onOpenChange={() => setCreateRoomModalOpen(!createRoomModalOpen)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to join the room.
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue={newlyCreateRoomLink} readOnly />
              </div>
              <Button
                type="button"
                size="sm"
                className="px-3"
                onClick={copyRoomLink}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareLinkModal;
