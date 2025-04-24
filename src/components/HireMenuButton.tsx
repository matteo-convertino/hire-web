import React from "react";
import Link from "next/link";
import { HireButton } from "@/components/HireButton";

export const HireMenuButton = ({ label, href }: { label: string, href: string }) => {
  return (
    <Link href={href}>
      <HireButton label={label} variant="subtle" color="gray" />
    </Link>
  );
};
