import { Keys } from "@/@types/keys";
import client from "@/api/client";
import useAuthStore from "@/store/authSlice";
import { useEffect, useState } from "react";
import publicRoutes from "./routes/publicRoutes";
import privateRoutes from "./routes/privateRoutes";

const GetRoutes = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [routes, setRoutes] = useState(publicRoutes);
  const [loading, setLoading] = useState(true);

  const { setUser } = useAuthStore();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await client.post("/auth/verify-token", {
          token: localStorage.getItem(Keys.AUTH_TOKEN),
        });
        if (data?.userInfo) {
          setUser(data?.userInfo);
          setIsVerified(true);
          setRoutes(privateRoutes);
        }
      } catch {
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };
    if (localStorage.getItem(Keys.AUTH_TOKEN)) {
      verifyToken();
    } else {
      setLoading(false);
      setIsVerified(false);
    }
  }, [setUser]);

  return { isVerified, loading, routes };
};

export default GetRoutes;
