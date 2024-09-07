import client from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";
import useAuthStore from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

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
      const response = await client.post("/api/auth/login", credentials);
      setUser(response.data?.userInfo);
      setToken(response.data?.token);
      toast({
        variant: "default",
        title: response?.data?.message,
      });
      navigate("/random-room");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLoginMutation;
