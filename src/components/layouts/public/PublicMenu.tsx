import React from "react";
import { HireMenuButton } from "@/components/hire/HireMenuButton";

export default function PublicMenu() {
  return (
    <>
      <HireMenuButton label={"Home"} href={"/"} />
      <HireMenuButton label={"Explore"} href={"/job-positions"} />
      <HireMenuButton label={"Login"} href={"/sign-in"} />
    </>
  );
}
