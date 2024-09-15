import Loader from "@/components/layout/loader";
import JoinRoomForm from "@/components/room/join-room/join-room-form";
import { Button } from "@/components/ui/button";
import { useIsRoomExist } from "@/hooks/query/room-query";
import { useNavigate, useParams } from "react-router-dom";

export default function JoinRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useIsRoomExist(roomId || "");

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!data?.roomExist) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl">Room not exist or deleted automatically</h1>
        <Button onClick={() => navigate(-1)} variant={"outline"}>
          GO BACK
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[330px] gap-6 sm:w-[450px]">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Join Room</h1>
            <p className="text-balance text-muted-foreground">
              Enter your name and join room.
            </p>
          </div>
          <JoinRoomForm />
        </div>
      </div>
    </div>
  );
}
