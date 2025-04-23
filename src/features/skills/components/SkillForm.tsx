import { UseFormReturnType } from "@mantine/form";
import { ActionIcon, Group, Textarea, Tooltip } from "@mantine/core";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import { AddSkillsFormTransformFunction, AddSkillsFormValues } from "@/features/skills/hooks/useSkillsAdd";
import { UpdateSkillsFormTransformFunction, UpdateSkillsFormValues } from "@/features/skills/hooks/useSkillUpdate";

export default function SkillForm({ form, index, disabled = false, onDelete, onEdit, canBeEmpty = false }: {
  form: UseFormReturnType<AddSkillsFormValues, AddSkillsFormTransformFunction> | UseFormReturnType<UpdateSkillsFormValues, UpdateSkillsFormTransformFunction>,
  index: number,
  disabled?: boolean,
  onDelete?: () => void,
  onEdit?: () => void,
  canBeEmpty?: boolean,
}) {
  return (
    <Group>
      <Textarea
        className="flex-1"
        placeholder="Enter here a description of the skill you want to assess during the interview"
        resize="vertical"
        key={form.key(`skills.${index}.description`)}
        disabled={disabled}
        {...form.getInputProps(`skills.${index}.description`)}
      />
      {
        !disabled && onEdit !== undefined &&
        <ActionIcon size="lg" onClick={onEdit}>
          <PencilSimple />
        </ActionIcon>
      }
      {
        !disabled &&
        <Tooltip label="There must be at least one skill" disabled={canBeEmpty || form.values.skills.length != 1}>
          <ActionIcon
            size="lg"
            color="red"
            disabled={!canBeEmpty && form.values.skills.length == 1}
            onClick={() => {
              form.removeListItem("skills", index);
              onDelete?.();
            }}>
            <Trash />
          </ActionIcon>
        </Tooltip>
      }
    </Group>
  );
}
