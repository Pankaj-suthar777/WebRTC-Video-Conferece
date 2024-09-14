import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import useModalStore from "@/store/modalStore";
import { toast } from "@/hooks/use-toast";

export const useAuthenticatedTask = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuthStore();
  const { setLoginModalOpen } = useModalStore();

  const handleAuthenticatedTask = async ({
    redirectPath,
    onAuthenticated,
  }: {
    redirectPath?: string;
    onAuthenticated?: () => Promise<void>;
  }) => {
    if (isAuthenticated && token) {
      if (redirectPath) {
        navigate(redirectPath);
      } else if (onAuthenticated) {
        try {
          await onAuthenticated();
        } catch (error: any) {
          toast({
            title: "An error occurred while processing your request.",
            description: error.message,
          });
        }
      }
    } else {
      setLoginModalOpen(true);
    }
  };

  return handleAuthenticatedTask;
};
