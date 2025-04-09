import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";
import React from "react";
import { Box } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <Box h="100vh">
      {children}
    </Box>
  );
}
