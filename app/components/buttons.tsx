"use client";

import { forwardRef } from "react";
import { signIn, signOut } from "next-auth/react";

export const SignInButton = forwardRef<
  HTMLButtonElement,
  Exclude<React.ComponentProps<"button">, "onClick">
>(({ children, ...props }, ref) => {
  return (
    <button {...props} ref={ref} onClick={() => void signIn()}>
      {children}
    </button>
  );
});
SignInButton.displayName = "SignInButton";

export const SignOutButton = forwardRef<
  HTMLButtonElement,
  Exclude<React.ComponentProps<"button">, "onClick">
>(({ children, ...props }, ref) => {
  return (
    <button {...props} ref={ref} onClick={() => void signOut()}>
      {children}
    </button>
  );
});
SignOutButton.displayName = "SignOutButton";
