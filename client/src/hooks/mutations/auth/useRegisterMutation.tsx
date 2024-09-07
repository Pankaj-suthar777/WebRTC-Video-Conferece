import client from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";
import useAuthStore from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

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
      const response = await client.post("/api/auth/register", credentials);

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

  return { register, loading };
};

export default useRegisterMutation;
