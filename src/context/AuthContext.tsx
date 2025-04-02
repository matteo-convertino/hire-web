"use client";

import React, { createContext, useState } from "react";
import { UserResponseDTO } from "@/dto/response/UserResponseDTO";

interface AuthContextType {
  user: UserResponseDTO | null | undefined;
  setUser: (user: UserResponseDTO | null | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponseDTO | null | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
