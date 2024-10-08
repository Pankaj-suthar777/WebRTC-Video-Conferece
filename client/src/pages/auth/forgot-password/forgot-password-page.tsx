import { Link } from "react-router-dom";
import { ForgotPasswordForm } from "./forgot-password-form";

const ForgotPasswordPage = () => {
  return (
    <div className="container relative h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8 p-4 bg-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-3xl tracking-tight text-center font-bold mb-4">
              Forgot Password
            </h1>
            {/* <p className="text-sm text-muted-foreground">
              Enter your email and password below <br />
              to log into your account
            </p> */}
          </div>
          <ForgotPasswordForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link className="underline" to={"/login"}>
              Go to login?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
