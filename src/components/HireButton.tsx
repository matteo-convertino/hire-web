import { BoxProps, Button, ButtonProps, createPolymorphicComponent } from "@mantine/core";
import React, { forwardRef } from "react";

interface HireButtonProps extends ButtonProps {
  label: string;
}

export const HireButton = createPolymorphicComponent<"button", HireButtonProps>(
  forwardRef<HTMLButtonElement, HireButtonProps>(({ label, ...others }, ref) => (
    <Button radius="md" {...others} ref={ref}>
      {label}
    </Button>
  ))
);


