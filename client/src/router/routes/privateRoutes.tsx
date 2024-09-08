import JoinRoomPage from "@/pages/private-room/join-page/join-room-page";
import CallRoomPage from "@/pages/private-room/call-room/call-room-page";
import CreateRoomPage from "@/pages/private-room/create-room-page";
import HomePage from "@/pages/home/home-page";

const privateRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/room/:roomId",
    element: <JoinRoomPage />,
  },
  {
    path: "/call-room/:roomId",
    element: <CallRoomPage />,
  },
  {
    path: "/create-room",
    element: <CreateRoomPage />,
  },
];

export default privateRoutes;
