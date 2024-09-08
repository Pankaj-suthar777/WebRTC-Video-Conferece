import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../custom/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const InterestedIn = () => {
  const [interest, setInterest] = useState<string[]>([]);
  const [name, setName] = useState("");

  const addIntersetHandler = () => {
    if (interest.includes(name) || !name) {
      toast({ title: "Already included" });
      return;
    }
    setInterest([...interest, name]);
    setName("");
  };

  const removeIntersetHandler = (value: string) => {
    const filterdInterset = interest.filter((i) => i != value);
    setInterest(filterdInterset);
  };

  return (
    <div className="border border-slate-600 md:p-8 p-4 mt-8 md:mx-8">
      <p className="font-semibold text-lg underline mb-2">
        You are interested in:
      </p>
      <div className="flex gap-4">
        <Input
          className="border border-slate-500 mb-2"
          placeholder="Enter interest (e.g. border, friends, gaming...)"
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addIntersetHandler();
            }
          }}
          value={name}
        />
        <Button variant={"secondary"} onClick={addIntersetHandler}>
          Add
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {interest.map((i) => (
          <Badge className="text-md font-light gap-2" key={i}>
            {i}
            <X
              className="cursor-pointer"
              size={14}
              onClick={() => removeIntersetHandler(i)}
            />
          </Badge>
        ))}
      </div>
      <div className="flex justify-start items-center gap-4 mt-2">
        <Label className="text-md" htmlFor="common-interset">
          common interests only
        </Label>
        <Switch id="common-interset" className="shadow-lg" />
      </div>
      <Separator className="mt-4" />
    </div>
  );
};

export default InterestedIn;
