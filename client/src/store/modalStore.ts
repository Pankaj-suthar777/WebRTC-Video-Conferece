import { create } from "zustand";

interface ModalState {
  loginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;
  createRoomModalOpen: boolean;
  setCreateRoomModalOpen: (open: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  loginModalOpen: false,
  setLoginModalOpen: (open) => set({ loginModalOpen: open }),
  createRoomModalOpen: false,
  setCreateRoomModalOpen: (open) => set({ createRoomModalOpen: open }),
}));

export default useModalStore;
