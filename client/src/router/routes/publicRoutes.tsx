import LoginPage from "@/pages/auth/login/login-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password/forgot-password-page";
import ResetPasswordPage from "@/pages/auth/reset-password/reset-password-page";
import RegisterPage from "@/pages/auth/register/register-page";
import NotFoundPage from "@/pages/error/not-found-error";
import HomePage from "@/pages/home/home-page";
import { SocketProvider } from "@/context/SocketProvider";
import JoinRoomPage from "@/pages/private-room/join-page/join-room-page";
import CallRoomPage from "@/pages/private-room/call-room/call-room-page";
import CallTestPage from "@/pages/test-page";

const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test",
    element: <CallTestPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default publicRoutes;
