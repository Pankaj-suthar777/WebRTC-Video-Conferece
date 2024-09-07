import { Route, Routes } from "react-router-dom";
import LobbyPage from "./pages/private-room/create-room-page";
import JoinRoomPage from "./pages/private-room/join-page/join-room-page";
import CallRoomPage from "./pages/private-room/call-room/call-room-page";
import Landing from "./pages/private-room/Landing";
import LoginPage from "./pages/auth/login/login-page";
import RegisterPage from "./pages/auth/register/register-page";
import Provider from "./Provider";
import ForgotPasswordPage from "./pages/auth/forgot-password/forgot-password-page";
import ResetPasswordPage from "./pages/auth/reset-password/reset-password-page";

const App = () => {
  return (
    <Provider>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/create-room" Component={LobbyPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />

        <Route path="/f" Component={ForgotPasswordPage} />
        <Route path="/r" Component={ResetPasswordPage} />

        <Route path="/room/:roomId" Component={JoinRoomPage} />
        <Route path="/call-room/:roomId" Component={CallRoomPage} />
      </Routes>
    </Provider>
  );
};

export default App;
