import { Keys } from "@/@types/keys";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/authStore";
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
    <div className="top-0 flex h-[60px] w-full items-center justify-center bg-slate-400">
      <div className="flex h-full w-[95%] items-center justify-between md:w-[90%] lg:w-[85%]">
        <h1 className="text-2xl font-bold">Logo</h1>
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
