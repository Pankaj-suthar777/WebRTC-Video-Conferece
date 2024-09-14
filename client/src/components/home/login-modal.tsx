import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAuthForm } from "@/pages/auth/login/user-auth-form";
import useAuthStore from "@/store/authSlice";
import useModalStore from "@/store/modalSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginModal = () => {
  const { isAuthenticated } = useAuthStore();
  const { loginModalOpen, setLoginModalOpen } = useModalStore();

  useEffect(() => {
    setLoginModalOpen(!isAuthenticated);
  }, [isAuthenticated, setLoginModalOpen]);

  return (
    <div>
      <Dialog
        open={loginModalOpen}
        onOpenChange={() => setLoginModalOpen(!loginModalOpen)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-3xl">Login</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <UserAuthForm />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
