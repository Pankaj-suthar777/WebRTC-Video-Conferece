import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { SocketProvider } from "./context/SocketProvider";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <Toaster />
      <SocketProvider>{children}</SocketProvider>
    </BrowserRouter>
  );
};

export default Provider;
