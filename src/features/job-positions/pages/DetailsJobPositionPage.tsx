"use client";

import { JobPositionResponseDTO } from "@/dto/response/JobPositionResponseDTO";
import { ErrorDTO } from "@/dto/ErrorDTO";
import { useHireClientErrorHandler } from "@/hooks/useHireClientErrorHandler";
import { Group, Modal, useModalsStack } from "@mantine/core";
import PaperJobPosition from "@/features/job-positions/components/details/PaperJobPosition";
import PaperInfo from "@/features/job-positions/components/details/PaperInfo";
import useSignUpGuestForm from "@/features/auth/hooks/useSignUpGuestForm";
import ModalSignUpGuest from "@/features/job-positions/components/details/modal/ModalSignUpGuest";
import ModalConfirm from "@/features/job-positions/components/details/modal/ModalConfirm";

export default function DetailsJobPositionPage({ jobPosition, error, isOwner }: {
  jobPosition: JobPositionResponseDTO | null,
  error: ErrorDTO | null,
  isOwner: boolean,
}) {
  const { form, onSubmit } = useSignUpGuestForm();
  const stack = useModalsStack(["sign-up-guest", "confirm-action"]);

  useHireClientErrorHandler(error);

  return (
    <>
      <Modal.Stack>
        <ModalSignUpGuest stack={stack} form={form} />
        <ModalConfirm stack={stack} onConfirm={() =>
          onSubmit({
            data: form.values,
            onComplete: () => {
              stack.closeAll();
              form.reset();
              console.log("CAN INTERVIEW");
            }
          })
        } />
      </Modal.Stack>

      <Group align="start">
        <PaperJobPosition jobPosition={jobPosition} onApply={() => stack.open("sign-up-guest")} />
        <PaperInfo />
      </Group>
    </>
  );

}
