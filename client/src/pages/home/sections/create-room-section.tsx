import { Button } from "@/components/custom/button";
import useCreatePrivateRoom from "@/hooks/mutations/room/useCreatePrivateRoom";
import { useAuthenticatedTask } from "@/hooks/use-authticated-task";
import { toast } from "@/hooks/use-toast";
import useModalStore from "@/store/modalStore";

const CreateRoomSection = ({
  createRoomFunction,
}: {
  createRoomFunction?: () => Promise<void>;
}) => {
  const { createRoom } = useCreatePrivateRoom();
  const { setCreateRoomModalOpen } = useModalStore();

  const authticateTask = useAuthenticatedTask();

  const openCreateRoomModalHandler = async () => {
    setCreateRoomModalOpen(true);
    try {
      if (createRoomFunction) {
        await createRoomFunction();
      } else {
        await createRoom();
      }
    } catch (error: any) {
      toast({ title: "Failed to create room", description: error.message });
    }
  };

  return (
    <section className="mt-8">
      <div className="mb-4 flex h-12 w-full justify-center py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl underline">Create Room</h1>
          <p>(Create a personal chat)</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={async () => {
            await authticateTask({
              onAuthenticated: openCreateRoomModalHandler,
            });
          }}
          className="px-12 py-8 text-lg md:px-24 md:py-12"
        >
          Create Room
        </Button>
      </div>
    </section>
  );
};

export default CreateRoomSection;
