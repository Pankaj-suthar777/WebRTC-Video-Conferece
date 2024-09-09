import { createContext, useMemo, useContext } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

const SocketContext = createContext<null | any>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = () => {
  const socket = useMemo(() => io(process.env.BACKEND_URL as string), []);

  return (
    <SocketContext.Provider value={socket}>
      <Outlet />
    </SocketContext.Provider>
  );
};
