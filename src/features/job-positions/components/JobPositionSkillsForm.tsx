import { UseFormReturnType } from "@mantine/form";
import { Button, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { Plus } from "@phosphor-icons/react";
import { randomId } from "@mantine/hooks";
import JobPositionSkillForm from "@/features/job-positions/components/JobPositionSkillForm";

export default function JobPositionSkillsForm({ form, isEdit = false }: {
  form: UseFormReturnType<{ skills: { description: string, key: string }[] }>,
  isEdit?: boolean,
}) {

  const skills = form.getValues()
    .skills
    .map(
      (item, index) => <JobPositionSkillForm key={item.key} skill={item} form={form} index={index} />
    );

  return (
    <>
      <Stack>
        {skills}
      </Stack>

      <Group justify="space-between" mt="md">
        <Button
          variant="default"
          radius="md"
          onClick={() => form.insertListItem("skills", { description: "", key: randomId() })}
        >
          <Plus />
          <Text size="sm" ml="xs">Add skill</Text>
        </Button>
        <Button type="submit" radius="md" variant="filled">{isEdit ? "Update" : "Create"}</Button>
      </Group>
    </>
  );

}
