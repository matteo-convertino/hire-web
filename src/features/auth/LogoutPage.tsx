import useLogout from "@/features/auth/hooks/useLogout";
import { useEffect } from "react";
import { Box, Center, Text } from "@mantine/core";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";

export default function LogoutPage() {
  const { user, setUser } = useAuthStore();
  const { logout } = useLogout();

  useEffect(() => {
    if (user !== null) logout();
  }, []);

  useEffect(() => {
    if (user === undefined) setTimeout(() => setUser(null), 2000);
  }, [user]);

  return (
    <Center h="100%">
      <Box>
        <Text fw={600} ta="center">Logout successfully completed.</Text>
        <Text>You will be redirected to the home page automatically in a few seconds</Text>
      </Box>
    </Center>
  );
}
