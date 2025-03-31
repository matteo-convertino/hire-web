"use client";

import React, { createContext, useEffect, useState } from "react";
import useHireApi from "@/hooks/useHireApi";
import AuthService from "@/services/AuthService";
import { UserResponseDTO } from "@/dto/response/UserResponseDTO";

interface AuthContextType {
  user: UserResponseDTO | null | undefined;
  setUser: (user: UserResponseDTO | null | undefined) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponseDTO | null | undefined>(undefined);
  // const hireApi = useHireApi();

  /*useEffect(() => {
    hireApi<UserResponseDTO>(
      {
        api: () => AuthService.getInstance().getUser(),
        onComplete: (userResponseDTO: UserResponseDTO) => setUser(userResponseDTO),
        onError: () => setUser(null),
        onGenericError: () => setUser(null)
      }
    );
  }, []);*/

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
