"use server";

import React from "react";
import LoggedLayout from "@/components/layouts/logged/LoggedLayout";
import PublicLayout from "@/components/layouts/public/PublicLayout";
import HireCookieService from "@/services/utils/HireCookieService";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {
        await HireCookieService.isLogged() ?
          <LoggedLayout>
            {children}
          </LoggedLayout> :
          <PublicLayout>
            {children}
          </PublicLayout>
      }
    </>
  );
};
