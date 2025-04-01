import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/layouts/layout";
import theme from "@/app/theme";
import { Notifications } from "@mantine/notifications";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire",
  description: "Human Intelligence Recruitment Engine"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
      <title>First Next.js</title>
    </head>
    <body>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <AuthProvider>
        <Layout>
          {children}
        </Layout>
      </AuthProvider>
    </MantineProvider>
    </body>
    </html>
  );
}
