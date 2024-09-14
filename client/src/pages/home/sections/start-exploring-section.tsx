import { Button } from "@/components/custom/button";
import { useAuthenticatedTask } from "@/hooks/use-authticated-task";

const StartExploringSection: React.FC = () => {
  const authticateTask = useAuthenticatedTask();

  return (
    <section className="mb-4">
      <div className="mb-4 flex h-12 w-full justify-center py-12">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl underline">Start exploring</h1>
          <p>(Create a random chat)</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => authticateTask({ redirectPath: "/random-room" })}
          className="px-12 py-8 text-lg md:px-24 md:py-12"
        >
          START RANDOM VIDEO CHAT
        </Button>
      </div>
    </section>
  );
};

export default StartExploringSection;
