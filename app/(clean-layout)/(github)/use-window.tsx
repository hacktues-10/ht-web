import { useEffect, useState } from "react";

export function useWindow() {
  const [currentWindow, setCurrentWindow] = useState<Window | null>(null);
  useEffect(() => {
    setCurrentWindow(window);
  }, []);
  return currentWindow;
}
