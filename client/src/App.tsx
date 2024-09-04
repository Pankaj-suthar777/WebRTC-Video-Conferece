import { BrowserRouter, Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/lobby-page";
import { Toaster } from "@/components/ui/toaster";
import JoinRoomPage from "./pages/join-room-page";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/create-room" Component={LobbyPage} />
        <Route path="/room/:roomId" Component={JoinRoomPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
