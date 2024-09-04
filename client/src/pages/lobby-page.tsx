import CodeClipboard from "@/components/layout/code-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LobbyPage() {
  const [roomLink, setRoomLink] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({ name: "", link: "" });

  const generateLink = () => {
    const roomId = generateUniqueRoomId();
    const protocol = window.location.protocol;
    const host = window.location.host;

    const link = `${protocol}//${host}/room/${roomId}`;
    setRoomLink(link);
    setError({ ...error, link: "" });
    return link;
  };

  const generateUniqueRoomId = () => {
    return "xxxxxxx".replace(/[x]/g, () =>
      Math.floor(Math.random() * 26).toString(16)
    );
  };

  const createRoomHandler = () => {
    if (name.length === 0) {
      setError({ ...error, name: "Name is required field" });
      return;
    }
    if (!roomLink) {
      setError({ ...error, link: "Please generate room link first" });
      return;
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid sm:w-[450px] w-[330px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create Room</h1>
            <p className="text-balance text-muted-foreground">
              Enter your name to generate a link and share it to start a video
              call.
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
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={generateLink}
              >
                Generate link
              </Button>
            </div>
            {error.link && <p className="text-red-500">{error.link}</p>}
            {roomLink && (
              <div className="sm:w-[450px] w-[330px]">
                <CodeClipboard roomLink={roomLink} />
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              onClick={createRoomHandler}
              disabled={!roomLink || !name}
            >
              Create room and join
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
