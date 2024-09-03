import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LobbyPage } from "./pages/lobby-page";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" Component={LobbyPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
