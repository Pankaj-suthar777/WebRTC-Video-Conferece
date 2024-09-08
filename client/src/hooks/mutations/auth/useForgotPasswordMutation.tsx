import client from "@/api/client";
import { useState } from "react";
import { toast } from "../../use-toast";

interface UserForgotPasswordInfo {
  email: string;
}

const useForgotPasswordMutation = () => {
  const [loading, setLoading] = useState(false);
  const forgotPassword = async (credentials: UserForgotPasswordInfo) => {
    setLoading(true);

    try {
      const response = await client.post(
        "/api/auth/forgot-password",
        credentials
      );
      toast({
        variant: "default",
        title: response?.data?.message,
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: err.response?.data?.error || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading };
};

export default useForgotPasswordMutation;
