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
import { HireButton } from "@/components/HireButton";

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
            <HireButton
              label="Cancel"
              leftSection={<X />}
              type="submit"
              variant="default"
              onClick={() => {
                addSkillsForm.reset();
                updateSkillsForm.reset();
                setIsEditing(false);
              }}
            />

            <HireButton
              label="Add Skill"
              leftSection={<Plus />}
              variant="light"
              onClick={() => addSkillsForm.insertListItem("skills", { description: "", key: randomId() })}
            />

            <HireButton
              label="Done"
              leftSection={<Check />}
              type="submit"
            />
          </Group>
          :
          <HireButton
            label="Update"
            leftSection={<PencilSimple />}
            onClick={() => setIsEditing(true)}
          />
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
