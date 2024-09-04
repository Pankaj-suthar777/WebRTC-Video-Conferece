import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function JoinRoomPage() {
  const { roomId } = useParams();
  const [name, setName] = useState("");
  const [error, setError] = useState({ name: "" });

  const JoinRoomHandler = () => {
    if (name.length === 0) {
      setError({ ...error, name: "Name is required field" });
      return;
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid sm:w-[450px] w-[330px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Join Room</h1>
            <p className="text-balance text-muted-foreground">
              Enter your name and join room.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="name">Your name</Label>
              </div>
              <Input
                type="name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError({ ...error, name: "" });
                }}
              />
              {error.name && <p className="text-red-500">{error.name}</p>}
            </div>

            <Button
              type="submit"
              className="w-full"
              onClick={JoinRoomHandler}
              disabled={!roomId || !name}
            >
              Join
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/medium.webp"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
