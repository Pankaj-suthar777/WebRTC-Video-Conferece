import client from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";
import useAuthStore from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { Keys } from "@/@types/keys";

interface UserLoginInfo {
  password: string;
  email: string;
}

const useLoginMutation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useAuthStore();

  const login = async (credentials: UserLoginInfo) => {
    setLoading(true);
    try {
      const response = await client.post("/auth/login", credentials);
      setUser(response.data?.userInfo);
      setToken(response.data?.token);
      localStorage.setItem(Keys.AUTH_TOKEN, response.data?.token);
      toast({
        variant: "default",
        title: response?.data?.message,
      });
      navigate("/");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLoginMutation;
