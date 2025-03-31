"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Center, Text } from "@mantine/core";
import { useAuth } from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";

export default function Logout() {
  const router = useRouter();
  const { user } = useAuth();
  const { logout } = useLogout();

  useEffect(() => {
    if(user !== null) logout();
  }, []);

  useEffect(() => {
    if (user === null) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [user]);

  return user !== null ? <Center>
      <Text>Logging out...</Text>
    </Center> :
    <Box>
      <Text fw={600} ta="center">Logout successfully completed.</Text>
      <Text>You will be redirected to the home page automatically in a few seconds</Text>
    </Box>;
}
