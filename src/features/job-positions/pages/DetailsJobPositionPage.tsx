"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useHireClientSideErrorHandler } from "@/hooks/useHireClientSideErrorHandler";
import { Box, Group, Modal, useModalsStack } from "@mantine/core";
import PaperJobPosition from "@/features/job-positions/components/details/PaperJobPosition";
import PaperInfo from "@/features/job-positions/components/details/PaperInfo";
import useSignUpGuestForm from "@/features/auth/hooks/useSignUpGuestForm";
import ModalSignUpGuest from "@/features/job-positions/components/details/modal/ModalSignUpGuest";
import ModalConfirm from "@/features/job-positions/components/details/modal/ModalConfirm";
import useSkillsAdd from "@/features/skills/hooks/useSkillsAdd";
import PaperJobPositionSkills from "@/features/job-positions/components/details/PaperJobPositionSkills";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import useSkillDelete from "@/features/skills/hooks/useSkillDelete";
import useSkillUpdate from "@/features/skills/hooks/useSkillUpdate";
import { randomId } from "@mantine/hooks";
import useJobPositionForm from "@/features/job-positions/hooks/useJobPositionForm";
import PaperJobPositionOtherInfo from "@/features/job-positions/components/details/PaperJobPositionOtherInfo";

export default function DetailsJobPositionPage({ jobPosition, error, isOwner }: {
  jobPosition: JobPositionResponseDTO | null,
  error: ErrorDTO | null,
  isOwner: boolean,
}) {
  if (jobPosition === null) notFound();

  const { form: signUpGuestForm, onSubmit: onSignUpGuestSubmit } = useSignUpGuestForm();
  const { form: addSkillsForm, onSubmit: onSkillsSubmit } = useSkillsAdd({
    jobPositionId: jobPosition.id,
    defaultItem: false
  });
  const { form: updateSkillsForm, updateSkill } = useSkillUpdate({ initialSkills: jobPosition.skills });
  const {
    form: jobPositionForm,
    onSubmit: onJobPositionFormSubmit
  } = useJobPositionForm({ initialJobPosition: jobPosition });
  const { deleteSkill } = useSkillDelete();
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingOtherInfo, setIsEditingOtherInfo] = useState(false);
  const stack = useModalsStack(["sign-up-guest", "confirm-action"]);

  useHireClientSideErrorHandler(error);

  return (
    <>
      <Modal.Stack>
        <ModalSignUpGuest stack={stack} form={signUpGuestForm} />
        <ModalConfirm stack={stack} onConfirm={() =>
          onSignUpGuestSubmit({
            data: signUpGuestForm.values,
            onComplete: () => {
              stack.closeAll();
              signUpGuestForm.reset();
              console.log("CAN INTERVIEW");
            }
          })
        } />
      </Modal.Stack>

      <Group align="start">
        <Box className="flex-1">
          <PaperJobPosition
            jobPosition={jobPosition}
            onApply={isOwner ? undefined : () => stack.open("sign-up-guest")}
          />
          {
            isOwner && <>
              <form onSubmit={
                addSkillsForm.onSubmit((values) => {
                    if (values.skills.length > 0) {
                      onSkillsSubmit({
                        data: values.skills,
                        onComplete: (skillsResponseDTO) => {
                          updateSkillsForm.setInitialValues({
                            skills: [
                              ...updateSkillsForm.getValues().skills,
                              ...skillsResponseDTO.map((skill) => ({
                                id: skill.id,
                                description: skill.description,
                                key: randomId()
                              }))
                            ]
                          });
                          updateSkillsForm.reset();
                          addSkillsForm.reset();
                          setIsEditingSkills(false);
                        }
                      });
                    } else {
                      updateSkillsForm.reset();
                      setIsEditingSkills(false);
                    }
                  }
                )
              }>
                <PaperJobPositionSkills
                  updateSkillsForm={updateSkillsForm}
                  addSkillsForm={addSkillsForm}
                  isEditing={isEditingSkills}
                  setIsEditing={setIsEditingSkills}
                  onDelete={
                    (id) => deleteSkill({
                      id: id, onComplete: () => {
                        updateSkillsForm.setInitialValues({ skills: updateSkillsForm.getValues().skills });
                        updateSkillsForm.reset();
                      }
                    })
                  }
                  onEdit={
                    (index) => updateSkill({
                      index: index,
                      onComplete: () => {
                        updateSkillsForm.setInitialValues({ skills: updateSkillsForm.getValues().skills });
                        updateSkillsForm.reset();
                      }
                    })
                  }
                />
              </form>
              <form onSubmit={
                jobPositionForm.onSubmit((values) => onJobPositionFormSubmit({
                    jobPositionId: jobPosition!.id,
                    data: values,
                    onComplete: () => {
                      jobPositionForm.setInitialValues(jobPositionForm.getValues());
                      setIsEditingOtherInfo(false);
                    }
                  })
                )}>
                <PaperJobPositionOtherInfo
                  jobPositionForm={jobPositionForm}
                  isEditing={isEditingOtherInfo}
                  setIsEditing={setIsEditingOtherInfo}
                />
              </form>
            </>
          }
        </Box>
        <PaperInfo />
      </Group>
    </>
  );

}
