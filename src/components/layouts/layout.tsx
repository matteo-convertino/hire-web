"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import GuestLayout from "@/components/layouts/guest";
import LoggedLayout from "@/components/layouts/logged";
import { Loader } from "@mantine/core";
import useHireApi from "@/hooks/useHireApi";
import { UserResponseDTO } from "@/dto/response/UserResponseDTO";
import AuthService from "@/services/AuthService";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser } = useAuth();
  const hireApi = useHireApi();

  useEffect(() => {
    if (user !== undefined) return;

    hireApi<UserResponseDTO>({
      api: () => AuthService.getInstance().getUser(),
      onComplete: (userResponseDTO: UserResponseDTO) => setUser(userResponseDTO),
      onError: () => setUser(null),
      onGenericError: () => setUser(null)
    });

  }, [user]);

  return (
    <>
      {
        user === undefined ?
          <>
            <Loader />
          </>
          : user === null ?
            <GuestLayout>
              {children}
            </GuestLayout> :
            <LoggedLayout>
              {children}
            </LoggedLayout>

      }
    </>
  );
};

export default Layout;
