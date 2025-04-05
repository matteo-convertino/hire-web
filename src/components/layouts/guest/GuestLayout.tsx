"use client";

import { AppShell, Burger, Center, Group, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import classes from "../layouts.module.css";
import Link from "next/link";
import GuestMenu from "@/components/layouts/guest/GuestMenu";

const GuestLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text size="lg" fw="bold">HIRE | Human Intelligence Recruitment Engine</Text>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <GuestMenu />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <GuestMenu />
      </AppShell.Navbar>

      <AppShell.Main style={{ height: "calc(100vh - 60px)" }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default GuestLayout;
