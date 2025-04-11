"use client";

import { Box, Button, Card, Center, Divider, Group, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import useSignInForm from "@/features/auth/hooks/useSignInForm";
import { useDisclosure } from "@mantine/hooks";
import { At } from "@phosphor-icons/react";

export default function SignInPage() {
  const { form, onSubmit } = useSignInForm();
  const [visible, { toggle }] = useDisclosure(false);

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
          <Stack>
            <TextInput
              withAsterisk
              rightSection={
                <At color="white" />
              }
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              withAsterisk
              label="Password"
              visible={visible}
              onVisibilityChange={toggle}
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </Stack>

          <Group justify="flex-end" mt="md">
            <Button type="submit" radius="md" variant="filled">Login</Button>
          </Group>
        </form>
      </Card>
    </Center>
  );
}
