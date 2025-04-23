import { ActionIcon, Box, Button, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { SkillResponseDTO } from "@/dto/response/SkillResponseDTO";
import { Check, PencilSimple, Plus, X } from "@phosphor-icons/react";
import SkillForm from "@/features/skills/components/SkillForm";
import { UseFormReturnType } from "@mantine/form";
import { Dispatch, SetStateAction, useState } from "react";
import { randomId } from "@mantine/hooks";
import { AddSkillsFormTransformFunction, AddSkillsFormValues } from "@/features/skills/hooks/useSkillsAdd";
import { UpdateSkillsFormTransformFunction, UpdateSkillsFormValues } from "@/features/skills/hooks/useSkillUpdate";
import { SkillUpdateRequestDTO } from "@/dto/request/SkillUpdateRequestDTO";

export default function PaperJobPositionSkills(
  {
    updateSkillsForm,
    addSkillsForm,
    isEditing,
    setIsEditing,
    onDelete,
    onEdit
  }: {
    addSkillsForm: UseFormReturnType<AddSkillsFormValues, AddSkillsFormTransformFunction>,
    updateSkillsForm: UseFormReturnType<UpdateSkillsFormValues, UpdateSkillsFormTransformFunction>
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    onDelete: (id: number) => void;
    onEdit: (index: number) => void;
  }) {

  const updatedSkillsMapped = updateSkillsForm.getValues()
    .skills
    .map(
      (skill, index) => <SkillForm
        key={skill.key}
        form={updateSkillsForm}
        index={index}
        disabled={!isEditing}
        onDelete={() => onDelete(skill.id)}
        onEdit={() => onEdit(index)}
      />
    );

  const addedSkillsMapped = addSkillsForm.getValues()
    .skills
    .map(
      (skill, index) => <SkillForm
        key={skill.key}
        form={addSkillsForm}
        index={index}
        canBeEmpty={true}
      />
    );

  return (
    <Paper mt="md" shadow="xs" radius="md" withBorder p="lg">
      <Group justify="space-between">
        <Title>Skills</Title>
        {isEditing ?
          <Group>
            <Button type="submit" radius="md" variant="default" onClick={() => {
              addSkillsForm.reset();
              updateSkillsForm.reset();
              setIsEditing(false);
            }}>
              <X />
              <Text size="sm" ml="xs">Cancel</Text>
            </Button>
            <Button
              variant="light"
              radius="md"
              onClick={() => addSkillsForm.insertListItem("skills", { description: "", key: randomId() })}
            >
              <Plus />
              <Text size="sm" ml="xs">Add skill</Text>
            </Button>

            <Button type="submit" radius="md" variant="filled">
              <Check />
              <Text size="sm" ml="xs">Done</Text>
            </Button>
          </Group>
          :
          <Button onClick={() => setIsEditing(true)} radius="md">
            <PencilSimple />
            <Text size="sm" ml="xs">Update</Text>
          </Button>
        }

      </Group>
      <Divider my="md" />
      <Stack>
        {updatedSkillsMapped}
        {addedSkillsMapped}
      </Stack>
    </Paper>

  );
}
