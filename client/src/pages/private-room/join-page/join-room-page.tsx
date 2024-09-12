import { SocketRoomResponse } from "@/@types/socket-room-info";
import { getClient } from "@/api/client";
import Loader from "@/components/layout/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSocket } from "@/context/SocketProvider";
import { useIsRoomExist } from "@/hooks/query/room-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required field" }),
});

export default function JoinRoomPage() {
  const [isImHost, setIsImHost] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { roomId } = useParams();

  const navigate = useNavigate();
  const socket = useSocket();

  const { isLoading, data } = useIsRoomExist(roomId || "");

  const handleJoinRoom = useCallback(
    (data: SocketRoomResponse) => {
      const { room, name, socketId } = data;
      console.log("here ===", data);
      navigate(`/room/call-room/${room}`, {
        state: { name, isHost: isImHost, socketId },
      });
    },
    [navigate, isImHost],
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [handleJoinRoom, socket]);

  const JoinRoomHandler = useCallback(
    (data: z.infer<typeof formSchema>) => {
      const { name } = data;
      socket.emit("room:join", { name, room: roomId, isHost: isImHost });
    },
    [roomId, socket, isImHost],
  );

  useEffect(() => {
    const isHostTryingToJoin = async () => {
      const client = await getClient();
      const { data } = await client.get("/room/join-room-host/" + roomId);
      if (data?.isHostTryingToJoin) {
        setIsImHost(true);
      }
    };
    isHostTryingToJoin();
  }, [navigate, roomId]);

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(JoinRoomHandler)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Your name</FormLabel>
                        <FormControl>
                          <Input placeholder="display name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Join
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
