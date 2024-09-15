import { Message } from "@/@types/message";
import { useSocket } from "@/context/SocketProvider";
import { useGetRoomMessages } from "@/hooks/query/message-query";
import useMySocketInfoStore from "@/store/mySocketInfo";
import moment from "moment";
import { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const ChatMessages = () => {
  const { roomId } = useParams();
  const { data } = useGetRoomMessages(roomId);
  const { mySocketInfo } = useMySocketInfoStore();

  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("newMessage", (newMessage: Message) => {
      queryClient.setQueryData<{ messages: Message[] }>(
        ["messages", roomId],
        (data: any) => {
          const newMessagesArray = [...data.messages, newMessage];
          return { messages: newMessagesArray };
        },
      );
    });
    return () => {
      socket.off("newMessage");
    };
  });

  const lastMessageRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [data]);

  return (
    <div className="flex flex-col gap-4 p-4">
      {data?.messages.map((message, i) => (
        <div
          key={i}
          className={`flex w-full ${
            message.socketId === mySocketInfo?.socketId
              ? "justify-end"
              : "justify-start"
          }`}
          ref={lastMessageRef}
        >
          <div className={`mb-4 flex max-w-[80%] flex-col space-y-1`}>
            {/* Sender name and timestamp */}
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-700">
                {message.name}
              </p>
              <p className="text-xs text-gray-500">
                {moment(message.createdAt).fromNow()}
              </p>
            </div>

            {/* Message content */}
            <div
              className={`break-words rounded-lg px-4 py-2 shadow-sm ${
                message.socketId === mySocketInfo?.socketId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
