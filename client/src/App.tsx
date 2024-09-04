import { BrowserRouter, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/lobby-page";
import { Toaster } from "@/components/ui/toaster";
import JoinRoomPage from "./pages/join-room-page";
import { SocketProvider } from "./context/SocketProvider";
import CallRoomPage from "./pages/call-room-page";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <SocketProvider>
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/create-room" Component={LobbyPage} />
          <Route path="/room/:roomId" Component={JoinRoomPage} />
          <Route path="/call-room/:roomId" Component={CallRoomPage} />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
};

export default App;
