import { Button, Group } from "@mantine/core";
import { HireModal } from "@/components/HireModal";
import { HireButton } from "@/components/HireButton";

export default function ModalConfirm({ stack, onConfirm }: {
  stack: any,
  onConfirm: () => void
}) {
  return (
    <HireModal {...stack.register("confirm-action")} title="Confirm action">
      Are you sure you want to perform this action? This action cannot be undone. If you are
      sure, press confirm button below.
      <Group mt="lg" justify="flex-end">
        <HireButton
          label="Cancel"
          onClick={() => stack.close("confirm-action")}
          variant="default"
        />
        <HireButton
          label="Confirm"
          onClick={() => {
            stack.close("confirm-action");
            onConfirm();
          }}
        />
      </Group>
    </HireModal>
  );
}
