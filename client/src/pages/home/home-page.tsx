import { Button } from "@/components/custom/button";
import { FAQ } from "@/components/home/faq";
import InterestedIn from "@/components/home/interested-in";
import Header from "@/components/layout/header";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAuthForm } from "../auth/login/user-auth-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authSlice";
import Footer from "@/components/layout/footer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import useCreatePrivateRoom from "@/hooks/mutations/room/useCreatePrivateRoom";
import { toast } from "@/hooks/use-toast";
import { PrivateRoomTable } from "@/components/home/my-private-room-table/data-table";
import {
  columns,
  Payment,
} from "@/components/home/my-private-room-table/column";

const HomePage = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuthStore();

  const { createRoom, loading, newlyCreateRoomLink } = useCreatePrivateRoom();

  useEffect(() => {
    if (isAuthenticated) {
      setOpenLoginModal(false);
    } else {
      setOpenLoginModal(true);
    }
  }, [isAuthenticated]);

  const isUserAuthenticatedModal = async (redirect?: string) => {
    if (isAuthenticated && token) {
      if (redirect) {
        return navigate(redirect);
      } else {
        await handleOpenCreateRoomModal();
      }
    } else {
      setOpenLoginModal(true);
    }
  };

  const handleOpenCreateRoomModal = async () => {
    setOpenCreateRoomModal(true);
    await createRoom();
  };

  const copyNewlyCreateRoomHandler = () => {
    navigator.clipboard.writeText(newlyCreateRoomLink);
    toast({
      title: "Link is copied to clipboard",
    });
  };

  const data: Payment[] = [
    {
      id: "1",
      amount: 250.0,
      status: "success",
      email: "user1@example.com",
    },
    {
      id: "2",
      amount: 100.0,
      status: "pending",
      email: "user2@example.com",
    },
    {
      id: "3",
      amount: 50.0,
      status: "failed",
      email: "user3@example.com",
    },
    {
      id: "4",
      amount: 300.0,
      status: "processing",
      email: "user4@example.com",
    },
    {
      id: "5",
      amount: 120.0,
      status: "success",
      email: "user5@example.com",
    },
  ];

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
                  START RANDOM VIDEO CHAT
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
            <Button
              onClick={() => isUserAuthenticatedModal()}
              className="md:py-12 py-8 md:px-24 px-12 text-lg"
            >
              Create Room
            </Button>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <PrivateRoomTable columns={columns} data={data} />
          <FAQ />
        </div>
      </div>

      <div>
        {/* Create Room Modal */}
        <Dialog
          open={openCreateRoomModal}
          onOpenChange={() => setOpenCreateRoomModal(!openCreateRoomModal)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to join room.
              </DialogDescription>
            </DialogHeader>
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={newlyCreateRoomLink}
                    readOnly
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                  onClick={copyNewlyCreateRoomHandler}
                >
                  <span className="sr-only">Copy</span>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            )}

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Login Room Modal */}
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
