"use server";

import { UserResponseDTO } from "@/dto/response/UserResponseDTO";
import { callApiAsync } from "@/utils/callApi";
import AuthService from "@/services/AuthService";
import LoggedClient from "@/components/layouts/loggedClient";
import React from "react";

export async function getAuthUser(): Promise<UserResponseDTO | null> {
  let user: UserResponseDTO | null = null;

  await callApiAsync({
    api: () => AuthService.getInstance().getUser(),
    onComplete: (userResponseDTO) => {
      user = userResponseDTO;
    }
  });

  return user;
}

export default async function LoggedLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser();

  return <LoggedClient userResponseDTO={user}>{children}</LoggedClient>;
}
