import { SimpleGrid, Skeleton } from "@mantine/core";

export default function Loading() {
  return (
    <SimpleGrid cols={3}>
      {Array.from({ length: 6 }, (_, index) => (
        <Skeleton key={index} height={300} />
      ))}
    </SimpleGrid>
  );
}
