import client from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { Keys } from "@/@types/keys";

interface UserRegisterInfo {
  password: string;
  email: string;
  name: string;
}

const useRegisterMutation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useAuthStore();
  const register = async (credentials: UserRegisterInfo) => {
    setLoading(true);

    try {
      const response = await client.post("/auth/register", credentials);

      setUser(response.data?.userInfo);
      setToken(response.data?.token);
      localStorage.setItem(Keys.AUTH_TOKEN, response.data?.token);

      toast({
        variant: "default",
        title: response?.data?.message,
      });

      navigate("/random-room");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
};

export default useRegisterMutation;
