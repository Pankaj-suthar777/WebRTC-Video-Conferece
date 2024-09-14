import { colors } from "@/constant/colors";
import CompassLoader from "../layout/compass-loader";
import { SkipForwardIcon } from "lucide-react";
import { Button } from "../custom/button";
import { useState } from "react";

const NextButton = () => {
  const [isSearchingOtherChat, setIsSearchingOtherChat] = useState(false);

  const onClickNextChatHandler = () => {
    setIsSearchingOtherChat(true);
    setTimeout(() => setIsSearchingOtherChat(false), 5000);
  };

  return (
    <Button
      onClick={onClickNextChatHandler}
      variant={isSearchingOtherChat ? "outline" : "default"}
      style={{
        backgroundColor: isSearchingOtherChat ? "" : colors.primary,
      }}
      className="hidden items-center justify-center px-10 md:flex md:h-[45px]"
    >
      {isSearchingOtherChat ? (
        <CompassLoader height="18px" width="18px" />
      ) : (
        <SkipForwardIcon size={18} />
      )}
    </Button>
  );
};

export default NextButton;
