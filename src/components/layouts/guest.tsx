"use client";

import { AppShell, Burger, Center, Group, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import classes from "./layouts.module.css";
import Link from "next/link";

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
            <Text fw="bold">First Next.js Project</Text>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <Link href="/"><UnstyledButton className={classes.control}>
                Home
              </UnstyledButton></Link>
              <Link href="/sign-in"><UnstyledButton className={classes.control}>
                Login
              </UnstyledButton></Link>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Login</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main style={{ height: "calc(100vh - 60px)" }}>
          {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default GuestLayout;
