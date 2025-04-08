import { HireModal } from "@/components/hire/HireModal";
import { Button, Group, Text } from "@mantine/core";

export const Delete = (
  {
    isFirstPage = false
  }: {
    isFirstPage?: boolean
  }) => {

  return (
    <HireModal title="Delete Confirmation" isFirstPage={isFirstPage}>
      <Text>
        Are you sure you want to delete this item?
        This action cannot be undone.
      </Text>
      <Group justify="flex-end" mt="md">
        <Button variant="outline" color="red">Cancel</Button>
        <Button variant="filled" color="red">Delete</Button>
      </Group>
    </HireModal>
  );

};
