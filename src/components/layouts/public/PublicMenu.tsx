import React from "react";
import { HireMenuButton } from "@/components/HireMenuButton";

export default function PublicMenu() {
  return (
    <>
      <HireMenuButton label={"Home"} href={"/"} />
      <HireMenuButton label={"Explore"} href={"/job-positions"} />
      <HireMenuButton label={"Login"} href={"/sign-in"} />
    </>
  );
}
