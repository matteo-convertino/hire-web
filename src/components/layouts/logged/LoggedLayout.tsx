"use server";

import { UserResponseDTO } from "@/dto/response/UserResponseDTO";
import { callApiAsync } from "@/utils/callApi";
import AuthService from "@/services/AuthService";
import React from "react";
import LoggedLayoutClient from "@/components/layouts/logged/LoggedLayoutClient";

export async function getAuthUser(): Promise<UserResponseDTO | null> {
  let user: UserResponseDTO | null = null;

  await callApiAsync({
    api: () => AuthService.getInstance().getUser(),
    onComplete: (userResponseDTO) => user = userResponseDTO
  });

  return user;
}

export default async function LoggedLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser();

  return <LoggedLayoutClient userResponseDTO={user}>{children}</LoggedLayoutClient>;
}
