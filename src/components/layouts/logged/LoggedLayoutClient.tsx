"use client";

import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect } from "react";
import { UserResponseDTO } from "@/dto/response/UserResponseDTO";
import LoggedMenu from "@/components/layouts/logged/LoggedMenu";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";

const LoggedLayoutClient = ({ userResponseDTO, children }: {
  userResponseDTO?: UserResponseDTO,
  children: React.ReactNode
}) => {
  const [opened, { toggle }] = useDisclosure();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user === null) window.location.replace("/");
  }, [user]);

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
              <LoggedMenu />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <LoggedMenu />
      </AppShell.Navbar>

      <AppShell.Main style={{ height: "calc(100vh - 60px)" }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default LoggedLayoutClient;
