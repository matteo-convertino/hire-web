import { UseFormReturnType } from "@mantine/form";
import { ActionIcon, Group, Textarea } from "@mantine/core";
import { Trash } from "@phosphor-icons/react";

export default function JobPositionSkillForm({ form, index }: {
  form: UseFormReturnType<{ skills: { description: string, key: string }[] }>,
  index: number,
}) {
  return (
    <Group>
      <Textarea
        className="flex-1"
        placeholder="Enter here a description of the skill you want to assess during the interview"
        resize="vertical"
        key={form.key(`skills.${index}.description`)}
        {...form.getInputProps(`skills.${index}.description`)}
      />
      {
        index > 0 &&
        <ActionIcon size="lg" color="red" onClick={() => form.removeListItem("skills", index)}>
          <Trash />
        </ActionIcon>
      }
    </Group>
  );
}
