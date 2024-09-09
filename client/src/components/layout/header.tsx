import { Keys } from "@/@types/keys";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/authSlice";
import { Button } from "../custom/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    localStorage.removeItem(Keys.AUTH_TOKEN);
  };

  return (
    <div className="h-[60px] w-full bg-slate-400 top-0 flex justify-center items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[85%] h-full flex justify-between items-center">
        <h1 className="font-bold text-2xl">Logo</h1>
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
