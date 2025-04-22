import { Text } from "@mantine/core";
import { HireModal } from "@/components/HireModal";
import SignUpGuestForm from "@/features/auth/components/SignUpGuestForm";
import { UseFormReturnType } from "@mantine/form";
import { SignUpGuestRequestDTO } from "@/dto/request/SignUpGuestRequestDTO";

export default function ModalSignUpGuest({ form, stack }: {
  form: UseFormReturnType<SignUpGuestRequestDTO>,
  stack: any
}) {
  return (
    <HireModal {...stack.register("sign-up-guest")} title="Candidate Information">
      <Text size="sm" c="dimmed" mb="md">Before proceeding, please enter this information.</Text>

      <form onSubmit={form.onSubmit(() => stack.open("confirm-action"))}>
        <SignUpGuestForm form={form} />
      </form>
    </HireModal>
  );
}
