"use server";

import { callApiAsync } from "@/utils/callApi";
import AuthService from "@/services/AuthService";
import React from "react";
import LoggedLayoutClient from "@/components/layouts/logged/LoggedLayoutClient";
import { redirect } from "next/navigation";

export async function getAuthUser() {
  return callApiAsync({
    api: () => AuthService.getInstance().getUser(),
    onError: () => redirect("/")
  });
}

export default async function LoggedLayout({ children }: { children: React.ReactNode }) {
  const { response } = await getAuthUser();

  return <LoggedLayoutClient userResponseDTO={response}>{children}</LoggedLayoutClient>;
}
