import { SocketUser } from "@/pages/private-room/call-room/call-room-page";
import { create } from "zustand";

interface SocketInfo {
  mySocketInfo: SocketUser | null;
  setMySocketInfo: (user: SocketUser) => void;
}

const useMySocketInfoStore = create<SocketInfo>((set) => ({
  mySocketInfo: null,
  setMySocketInfo: (user: SocketUser) => set({ mySocketInfo: user }),
}));

export default useMySocketInfoStore;
