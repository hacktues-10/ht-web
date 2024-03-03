"use client";

import { useEffect } from "react";

import { SECOND } from "~/app/utils";
import { useWindow } from "../use-window";

export default function GitHubSuccessPage() {
  const window = useWindow();
  const willClose = !!window?.opener;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (willClose) {
        window?.close();
      }
    }, 3 * SECOND);
    return () => clearTimeout(timeout);
  }, [willClose, window]);

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
