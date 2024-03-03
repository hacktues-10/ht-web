"use client";

import { XIcon } from "lucide-react";

import { Button } from "~/app/components/ui/button";
import { closePopup } from "~/app/popups";
import { useWindow } from "../../use-window";

export function CloseButton() {
  const window = useWindow();
  const canClose = !!window?.opener;

  if (!canClose) {
    return null;
  }

  function handleClose() {
    if (canClose) {
      closePopup();
    }
  }

  return (
    <Button variant="destructive" onClick={handleClose}>
      <XIcon className="mr-2 h-5 w-5" /> Затвори
    </Button>
  );
}
