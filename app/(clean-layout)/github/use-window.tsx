import { useEffect, useState } from "react";

export function useWindow() {
  const [currentWindow, setCurrentWindow] = useState<Window | null>(
    typeof window === "undefined" ? null : window,
  );
  useEffect(() => {
    setCurrentWindow(window);
  }, []);
  return currentWindow;
}
