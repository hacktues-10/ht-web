"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "~/app/components/ui/button";
import { env } from "~/app/env.mjs";

function openPopup(url: string, width: number, height: number) {
  const left = window.screenX + window.outerWidth / 2 - width / 2;
  const top = window.screenY + window.outerHeight / 2 - height / 2;
  const child = window.open(
    url,
    "_blank",
    `width=${width},height=${height},left=${left},top=${top}`,
  );
  if (!child) {
    const anchor = document.createElement("a");
    anchor.target = "_blank";
    anchor.href = url;
    anchor.click();
  }
}

function closePopup() {
  if (window.opener) {
    window.close();
  }
}

export default function TestPageDeletePls() {
  useEffect(() => {
    closePopup();
  });

  function handleOpen() {
    openPopup(
      `https://github.com/apps/${env.NEXT_PUBLIC_GITHUB_APP_SLUG}/installations/new`,
      800,
      600,
    );
  }
  return <Button onClick={handleOpen}>Install</Button>;
}
