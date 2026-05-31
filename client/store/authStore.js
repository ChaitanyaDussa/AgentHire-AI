import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  setSession: ({ user, token }) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", token);
    }
    set({ user, token });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
    }
    set({ user: null, token: null });
  }
}));
