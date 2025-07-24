import React from "react";
import Link from "next/link";
import { ActionIcon, Tooltip } from "@mantine/core";
import { Plus } from "@phosphor-icons/react";
import { HireMenuButton } from "@/components/HireMenuButton";

export default function LoggedMenu() {
  return (
    <>
      <Link href="/job-positions/add">
        <Tooltip label="Create new job position">
          <ActionIcon variant="subtle" color="gray" size="lg">
            <Plus />
          </ActionIcon>
        </Tooltip>
      </Link>
      <HireMenuButton label={"Dashboard"} href={"/dashboard"} />
      <HireMenuButton label={"Reports"} href={"/reports"} />
      <HireMenuButton label={"Explore"} href={"/job-positions"} />
      <HireMenuButton label={"Logout"} href={"/logout"} />
    </>
  );
}
