import { UseFormReturnType } from "@mantine/form";
import { Button, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { Plus } from "@phosphor-icons/react";
import { randomId } from "@mantine/hooks";
import SkillForm from "@/features/skills/components/SkillForm";
import { AddSkillsFormTransformFunction, AddSkillsFormValues } from "@/features/skills/hooks/useSkillsAdd";

export default function SkillsForm({ form }: {
  form: UseFormReturnType<AddSkillsFormValues, AddSkillsFormTransformFunction>,
}) {

  const skills = form.getValues()
    .skills
    .map(
      (item, index) => <SkillForm key={item.key} form={form} index={index} />
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
        <Button type="submit" radius="md" variant="filled">Create</Button>
      </Group>
    </>
  );

}
