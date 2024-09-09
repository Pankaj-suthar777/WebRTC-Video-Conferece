import JoinRoomPage from "@/pages/private-room/join-page/join-room-page";
import CallRoomPage from "@/pages/private-room/call-room/call-room-page";
import HomePage from "@/pages/home/home-page";
import { SocketProvider } from "@/context/SocketProvider";

const privateRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/room",
    element: <SocketProvider />,
    children: [
      { path: "/room/call-room/:roomId", element: <CallRoomPage /> },
      {
        path: "/room/:roomId",
        element: <JoinRoomPage />,
      },
    ],
  },
];

export default privateRoutes;
