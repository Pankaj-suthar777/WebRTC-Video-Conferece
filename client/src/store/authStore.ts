import { Keys } from "@/@types/keys";
import { User } from "@/@types/user";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  token: string | null;
  setToken: (token: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ isAuthenticated: true, user: user }),
  logout: () => set({ isAuthenticated: false, user: null, token: null }),
  token: localStorage.getItem(Keys.AUTH_TOKEN)
    ? (localStorage.getItem(Keys.AUTH_TOKEN) as string)
    : null,
  setToken: (token) => set({ token }),
}));

export default useAuthStore;
