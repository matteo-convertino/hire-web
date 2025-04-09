import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/layouts/Layout";

export default function MainLayout({ children, modal }: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {

  return (
    <AuthProvider>
      <Layout>
        {modal}
        {children}
      </Layout>
    </AuthProvider>
  );
}
