"use client";

import { Box, Card, Center, Divider, Text } from "@mantine/core";
import useSignInForm from "@/features/auth/hooks/useSignInForm";
import SignInForm from "@/features/auth/components/SignInForm";

export default function SignInPage() {
  const { form, onSubmit } = useSignInForm();

  return (
    <Center h="100%">
      <Card w={500} shadow="xl" padding="lg" radius="lg" withBorder>
        <Box>
          <Text size="lg" fw={700} ta="center">
            Sign In
          </Text>
          <Divider my="sm" />
        </Box>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <SignInForm form={form} />
        </form>
      </Card>
    </Center>
  );
}
