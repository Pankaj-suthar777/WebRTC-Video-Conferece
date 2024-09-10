import { Button } from "@/components/custom/button";
import { CopyIcon, Link as LinkLucideIcon, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import useDeleteRoomMutation from "@/hooks/mutations/room/useDeleteRoomMutation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { roomLink } from "@/utils/helper";

const RoomActionsCell = ({ roomId, _id }: { roomId: string; _id: string }) => {
  const { mutate, isLoading } = useDeleteRoomMutation();

  const handleDelete = () => {
    mutate(_id);
  };

  return (
    <div className="flex items-center gap-4">
      <Button disabled={isLoading} size={"sm"}>
        <Link to={`/room/${roomId}`}>Join</Link>
      </Button>
      <CopyLinkButton roomId={roomId} />
      <Button
        disabled={isLoading}
        variant={"destructive"}
        size={"sm"}
        onClick={handleDelete}
      >
        <Trash size={14} />
      </Button>
    </div>
  );
};

export default RoomActionsCell;

const CopyLinkButton = ({ roomId }: { roomId: string }) => {
  const copyRoomLinkHandler = () => {
    navigator.clipboard.writeText(roomLink(roomId));
    toast({
      title: "Link is copied to clipboard",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"sm"}>
          <LinkLucideIcon size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to join room.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={roomLink(roomId)} readOnly />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={copyRoomLinkHandler}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
