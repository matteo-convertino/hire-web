import { UseFormReturnType } from "@mantine/form";
import { Button, Group, Stack, TextInput } from "@mantine/core";
import { At } from "@phosphor-icons/react";
import { SignUpGuestRequestDTO } from "@/dto/request/SignUpGuestRequestDTO";
import { HireButton } from "@/components/HireButton";

export default function SignUpGuestForm({ form }: { form: UseFormReturnType<SignUpGuestRequestDTO> }) {

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

        <TextInput
          withAsterisk
          label="Name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Surname"
          key={form.key("surname")}
          {...form.getInputProps("surname")}
        />
      </Stack>

      <Group justify="flex-end" mt="md">
        <HireButton label="Apply now" type="submit" />
      </Group>
    </>
  );

}
