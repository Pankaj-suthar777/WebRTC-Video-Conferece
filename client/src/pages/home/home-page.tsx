import { Button } from "@/components/custom/button";
import { FAQ } from "@/components/home/faq";
import InterestedIn from "@/components/home/interested-in";
import Header from "@/components/layout/header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAuthForm } from "../auth/login/user-auth-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authSlice";
import Footer from "@/components/layout/footer";

const HomePage = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { isAuthenticated, token } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setOpenLoginModal(false);
    }
  }, [isAuthenticated]);

  const isUserAuthenticatedModal = (redirect: string) => {
    if (isAuthenticated && token) {
      return navigate(redirect);
    }
    setOpenLoginModal(true);
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="container max-w-[700px] p-4">
        <div className="mb-4">
          <div className="w-full h-12 flex justify-center py-12 mb-4">
            <div className="flex justify-center flex-col items-center">
              <h1 className="text-xl underline">Start exploring</h1>
              <p>(Create a random chat)</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-4">
              <div>
                {/* <Button
                  onClick={() => isUserAuthenticatedModal("")}
                  className="md:py-12 py-8 md:px-24 px-12 text-lg"
                >
                  TEXT
                </Button> */}
              </div>
              <div>
                <Button
                  onClick={() => isUserAuthenticatedModal("/random-room")}
                  className="md:py-12 py-8 md:px-24 px-12 text-lg"
                >
                  VIDEO
                </Button>
              </div>
            </div>
          </div>
          <InterestedIn />
          <div className="border border-slate-600 md:p-8 p-4 mt-8 md:mx-8">
            <p className="font-semibold text-lg underline mb-2">
              Most Basic Rules:
            </p>
            <p>
              1. You must be <span className="font-semibold">18 or older </span>
              to use this site.
            </p>
            <p>
              2. Spamming <span className="font-semibold">"M or F"</span> will
              result in a timeout.
            </p>
          </div>
        </div>

        <div>
          <div className="w-full h-12 flex justify-center py-12 mb-4">
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-xl underline">Create Room</h1>
              <p>(Create a personal chat)</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="md:py-12 py-8 md:px-24 px-12 text-lg">
              Create Room
            </Button>
          </div>
        </div>
        <div className="mt-12">
          <FAQ />
        </div>
      </div>

      <div>
        <Dialog
          open={openLoginModal}
          onOpenChange={() => setOpenLoginModal(!openLoginModal)}
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
      <div className="border-t border-slate-600 h-2 w-full mt-12" />
      <Footer />
    </div>
  );
};

export default HomePage;
