import { JobPositionRequestDTO } from "@/dto/request/JobPositionRequestDTO";
import { UseFormReturnType } from "@mantine/form";
import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { HireButton } from "@/components/HireButton";

export default function JobPositionForm({ form, isEdit = false, onlyOtherInfo = false, disabled = false }: {
  form: UseFormReturnType<JobPositionRequestDTO>,
  isEdit?: boolean,
  onlyOtherInfo?: boolean,
  disabled?: boolean
}) {
  return (
    <>
      <Stack>
        {
          !onlyOtherInfo &&
          <>
            <TextInput
              disabled={disabled}
              radius="md"
              label="Title"
              withAsterisk
              key={form.key("title")}
              {...form.getInputProps("title")}
            />
            <Textarea
              disabled={disabled}
              radius="md"
              label="Description"
              resize="vertical"
              withAsterisk
              key={form.key("description")}
              {...form.getInputProps("description")}
            />
          </>
        }
        <Textarea
          disabled={disabled}
          radius="md"
          label="End message"
          resize="vertical"
          key={form.key("lastMessage")}
          {...form.getInputProps("lastMessage")}
        />
        <Textarea
          disabled={disabled}
          radius="md"
          label="Evaluation criteria"
          resize="vertical"
          key={form.key("evaluationCriteria")}
          {...form.getInputProps("evaluationCriteria")}
        />
      </Stack>
      {
        !onlyOtherInfo &&
        <Group justify="flex-end" mt="md">
          <HireButton
            label={isEdit ? "Update" : "Create"}
            type="submit"
            disabled={disabled}
          />
        </Group>
      }
    </>
  );

}
