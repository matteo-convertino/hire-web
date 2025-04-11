import { JobPositionRequestDTO } from "@/dto/request/JobPositionRequestDTO";
import { UseFormReturnType } from "@mantine/form";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";

export default function JobPositionForm({ form, isEdit = false }: {
  form: UseFormReturnType<JobPositionRequestDTO>,
  isEdit?: boolean,
}) {
  return (
    <>
      <Stack>
        <TextInput
          radius="md"
          label="Title"
          withAsterisk
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <Textarea
          radius="md"
          label="Description"
          resize="vertical"
          withAsterisk
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <Textarea
          radius="md"
          label="End message"
          resize="vertical"
          key={form.key("lastMessage")}
          {...form.getInputProps("lastMessage")}
        />
        <Textarea
          radius="md"
          label="Evaluation criteria"
          resize="vertical"
          key={form.key("evaluationCriteria")}
          {...form.getInputProps("evaluationCriteria")}
        />
      </Stack>
      <Group justify="flex-end" mt="md">
        <Button type="submit" radius="md" variant="filled">{isEdit ? "Update" : "Create"}</Button>
      </Group>
    </>
  );

}
