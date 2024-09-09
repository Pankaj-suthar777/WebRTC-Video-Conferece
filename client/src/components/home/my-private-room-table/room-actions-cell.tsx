import { Button } from "@/components/custom/button";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import useDeleteRoomMutation from "@/hooks/mutations/room/useDeleteRoomMutation";

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
