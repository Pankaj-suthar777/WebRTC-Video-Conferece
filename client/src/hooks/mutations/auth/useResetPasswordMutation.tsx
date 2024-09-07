import client from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";

interface UserResetPasswordInfo {
  newPassword: string;
  confirmPassword: string;
}

const useResetpasswordMutation = () => {
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
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading };
};

export default useResetpasswordMutation;
