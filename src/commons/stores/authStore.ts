import { create } from "zustand";
import { AuthState } from "./types";

export const useAuthStore = create<AuthState>((set) => {
    return {
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
    };
});
