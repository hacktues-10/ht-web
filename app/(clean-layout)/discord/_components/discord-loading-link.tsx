"use client";

import { PropsWithChildren, useState } from "react";

import { Button, ButtonProps } from "~/app/components/ui/button";

export const DiscordLoadingLink = ({
  href,
  ...rest
}: {
  href: string;
} & ButtonProps) => {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    window.location.href = href;
  }

  return <Button disabled={loading} onClick={handleClick} {...rest} />;
};
