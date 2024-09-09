import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <Toaster />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
};

export default Provider;
