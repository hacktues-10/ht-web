"use client";

import { useEffect, useState } from "react";

import { HTXLogoDuotone } from "~/app/components/logos";
import { Card } from "~/app/components/ui/card";
import { Separator } from "~/app/components/ui/separator";
import { SECOND } from "~/app/utils";

function useWindow() {
  const [currentWindow, setCurrentWindow] = useState<Window | null>(
    window || null,
  );
  useEffect(() => {
    setCurrentWindow(window);
    const timeout = setTimeout(() => {
      window.close();
    }, 3 * SECOND);
    return () => clearTimeout(timeout);
  }, []);
  return currentWindow;
}

export default function GitHubSuccessPage() {
  const window = useWindow();
  const willClose = !!window?.opener;
  return (
    <>
      <h1 className="text-3xl font-extrabold">
        Успешно свързахте Вашия GitHub!
      </h1>
      {willClose
        ? "Този прозорец ще се затвори автоматично."
        : "Можете да затворите този прозорец."}
    </>
  );
}
