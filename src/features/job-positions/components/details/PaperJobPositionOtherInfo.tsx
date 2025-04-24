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
import { JobPositionRequestDTO } from "@/dto/request/JobPositionRequestDTO";
import JobPositionForm from "@/features/job-positions/components/JobPositionForm";
import { HireButton } from "@/components/HireButton";

export default function PaperJobPositionOtherInfo(
  {
    jobPositionForm,
    isEditing,
    setIsEditing
  }: {
    jobPositionForm: UseFormReturnType<JobPositionRequestDTO>
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
  }) {

  return (
    <Paper mt="md" shadow="xs" radius="md" withBorder p="lg">
      <Group justify="space-between">
        <Title>Other Info</Title>
        {isEditing ?
          <Group>
            <HireButton
              label="Cancel"
              leftSection={<X />}
              type="submit"
              variant="default"
              onClick={() => {
                jobPositionForm.reset();
                setIsEditing(false);
              }}
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

      <JobPositionForm
        form={jobPositionForm}
        onlyOtherInfo={true}
        disabled={!isEditing}
      />
    </Paper>

  );
}
