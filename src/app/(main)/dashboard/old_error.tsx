"use client";

import { Center, Stack, Text } from "@mantine/core";
import { useEffect } from "react";

export default function Error(
  {
    error,
    reset
  }: {
    error: Error & { digest?: string }
    reset: () => void
  }) {
  useEffect(() => {
    // console.error(error);
  }, [error]);

  return (
    <Center h="100%">
      <Stack align="center">
        <Text fw={600}>Internal Server Error</Text>
      </Stack>
    </Center>
  );

}
