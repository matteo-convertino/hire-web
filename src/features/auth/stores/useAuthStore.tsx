import { create } from "zustand";
import { UserResponseDTO } from "@/dto/response/UserResponseDTO";

interface AuthStore {
  user: UserResponseDTO | null | undefined;
  setUser: (user: UserResponseDTO | null | undefined) => void;
  guestUser: UserResponseDTO | null | undefined;
  setGuestUser: (user: UserResponseDTO | null | undefined) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  guestUser: undefined,
  setGuestUser: (user) => set({ user })
}));
