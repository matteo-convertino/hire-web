"use server";

import React from "react";
import GuestLayout from "@/components/layouts/guest";
import LoggedLayout from "@/components/layouts/logged";
import { cookies } from "next/headers";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token");
  const isLoggedIn = !!token;

  return (
    <>
      {
        isLoggedIn ?
          <LoggedLayout>
            {children}
          </LoggedLayout> :
          <GuestLayout>
            {children}
          </GuestLayout>
      }
    </>
  );
};
