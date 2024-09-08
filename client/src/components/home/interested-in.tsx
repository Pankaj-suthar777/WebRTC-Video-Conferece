import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../custom/button";

const InterestedIn = () => {
  const [interest, setInterest] = useState<string[]>([]);
  const [name, setName] = useState("");

  const addIntersetHandler = (value: string) => {
    if (interest.includes(value)) {
      return;
    }
    setInterest([...interest, value]);
  };

  const removeIntersetHandler = (value: string) => {
    const filterdInterset = interest.filter((i) => i != value);
    setInterest(filterdInterset);
  };

  const removeAllIntersetHandler = () => {
    setInterest([]);
  };

  return (
    <div className="border border-slate-600 p-8 mt-8 mx-8">
      <p className="font-semibold text-lg underline mb-2">
        You are interested in:
      </p>
      <div>
        <Input
          className="border border-slate-500 mb-2"
          placeholder="Enter interest (e.g. border, friends, gaming...)"
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={addIntersetHandler}>Add</Button>
      </div>
      <p>2. Spamming "M or F" will result in a timeout.</p>
    </div>
  );
};

export default InterestedIn;
