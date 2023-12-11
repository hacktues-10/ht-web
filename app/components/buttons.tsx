"use client";

import { forwardRef } from "react";
import { signIn, signOut } from "next-auth/react";

import { Button, ButtonProps } from "./ui/button";

export const SignInButton = forwardRef<
  React.ComponentRef<typeof Button>,
  Exclude<ButtonProps, "onClick">
>(({ children, ...props }, ref) => {
  return (
    <Button {...props} ref={ref} onClick={() => void signIn()}>
      {children}
    </Button>
  );
});
SignInButton.displayName = "SignInButton";

export const SignOutButton = forwardRef<
  React.ComponentRef<typeof Button>,
  Exclude<ButtonProps, "onClick">
>(({ children, ...props }, ref) => {
  return (
    <Button {...props} ref={ref} onClick={() => void signOut()}>
      {children}
    </Button>
  );
});
SignOutButton.displayName = "SignOutButton";
