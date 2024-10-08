import { SocketRoomResponse } from "@/@types/socket-room-info";
import { getClient } from "@/api/client";
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
import useMySocketInfoStore from "@/store/mySocketInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required field" }),
});

const JoinRoomForm = () => {
  const [isImHost, setIsImHost] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const { setMySocketInfo } = useMySocketInfoStore();
  const { roomId } = useParams();

  const navigate = useNavigate();
  const socket = useSocket();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleJoinRoom = useCallback(
    (data: SocketRoomResponse) => {
      const { room, name, socketId } = data;
      setMySocketInfo({ isHost: isImHost, name, socketId: socketId as string });
      navigate(`/room/call-room/${room}`, {
        state: {
          name,
          isHost: isImHost,
          socketId,
          isUserWantVideoOn: videoOn,
          isUserWantMicOn: micOn,
        },
      });
    },
    [setMySocketInfo, isImHost, navigate, videoOn, micOn],
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [handleJoinRoom, socket]);

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

  const JoinRoomHandler = useCallback(
    (data: z.infer<typeof formSchema>) => {
      const { name } = data;
      socket.emit("room:join", { name, room: roomId, isHost: isImHost });
    },
    [roomId, socket, isImHost],
  );

  return (
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
      <div className="flex items-center justify-center space-x-4">
        <div
          className="cursor-pointer rounded-full border border-slate-400 bg-red-200 p-4 shadow-md"
          onClick={() => {
            setVideoOn(!videoOn);
          }}
        >
          {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
        </div>
        <div
          className="cursor-pointer rounded-full border border-slate-400 bg-red-200 p-4 shadow-md"
          onClick={() => {
            setMicOn(!micOn);
          }}
        >
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </div>
      </div>
    </Form>
  );
};

export default JoinRoomForm;
