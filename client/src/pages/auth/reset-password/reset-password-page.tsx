import { ResetPasswordForm } from "./reset-password-form";

const ResetPasswordPage = () => {
  return (
    <div className="container relative h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8 p-4 bg-white">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-3xl font-bold text-center tracking-tight mb-4">
              Reset Password
            </h1>
          </div>
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
