import { Button, Text } from "@mantine/core";
import React from "react";
import Link from "next/link";

export const HireMenuButton = ({ label, href }: { label: string, href: string }) => {
  return (
    <Link href={href}>
      <Button variant="subtle" color="gray">
        <Text>{label}</Text>
      </Button>
    </Link>
  );
};
