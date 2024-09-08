import client from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";
import { useNavigate } from "react-router-dom";

interface UserResetPasswordInfo {
  newPassword: string;
  confirmPassword: string;
}

const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const resetPassword = async (credentials: UserResetPasswordInfo) => {
    setLoading(true);

    try {
      const response = await client.post(
        "/api/auth/reset-password",
        credentials
      );
      toast({
        variant: "default",
        title: response?.data?.message,
      });
      navigate("/login");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading };
};

export default useResetPasswordMutation;
