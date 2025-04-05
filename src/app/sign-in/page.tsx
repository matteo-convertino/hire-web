"use client";

import { Box, Button, Card, Center, Divider, Flex, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import useSignInForm from "@/hooks/useSignInForm";
import { useDisclosure } from "@mantine/hooks";
import { At } from "@phosphor-icons/react";

export default function Page() {
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

        <form id="sign-in-form" onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Stack>
            <TextInput
              required
              withAsterisk
              rightSection={
                <At color="white"/>
              }
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              required
              withAsterisk
              /*leftSection={
                  <IconKey className={classes.iconTextInput}/>
              }*/
              label="Password"
              visible={visible}
              onVisibilityChange={toggle}
              //placeholder="your@email.com"
              {...form.getInputProps("password")}
            />
          </Stack>
        </form>

        <Box>
          <Flex className={"mt-6"} justify="space-between" align="center">
            <Box></Box>

            <Button type="submit" form="sign-in-form">
              Login
            </Button>
          </Flex>
        </Box>
      </Card>
    </Center>
  );
}
