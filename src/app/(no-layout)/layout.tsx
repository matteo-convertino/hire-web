import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import theme from "@/app/theme";
import { Notifications } from "@mantine/notifications";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import PublicLayout from "@/components/layouts/public/PublicLayout";

export const metadata: Metadata = {
  title: "Hire",
  description: "Human Intelligence Recruitment Engine"
};

const roboto = Roboto({
  weight: "500",
  subsets: ["latin"]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html className={roboto.className} {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
      <title>First Next.js</title>
    </head>
    <body>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <AuthProvider>
        <PublicLayout>
          {children}
        </PublicLayout>
      </AuthProvider>
    </MantineProvider>
    </body>
    </html>
  );
}
