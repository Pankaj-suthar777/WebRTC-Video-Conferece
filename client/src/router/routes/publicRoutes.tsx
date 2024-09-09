import LoginPage from "@/pages/auth/login/login-page";
import ForgotPasswordPage from "@/pages/auth/forgot-password/forgot-password-page";
import ResetPasswordPage from "@/pages/auth/reset-password/reset-password-page";
import RegisterPage from "@/pages/auth/register/register-page";
import NotFoundPage from "@/pages/error/not-found-error";
import HomePage from "@/pages/home/home-page";

const publicRoutes = [
  {
    path: "/",
    element: <HomePage />,
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
    path: "*",
    element: <NotFoundPage />,
  },
];

export default publicRoutes;
