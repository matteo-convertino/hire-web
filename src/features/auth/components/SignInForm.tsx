import { UseFormReturnType } from "@mantine/form";
import { Button, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { At } from "@phosphor-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { SignInRequestDTO } from "@/dto/request/SignInRequestDTO";

export default function SignInForm({ form }: { form: UseFormReturnType<SignInRequestDTO> }) {
  const [visible, { toggle }] = useDisclosure(false);

  return (
    <>
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
    </>
  );

}
