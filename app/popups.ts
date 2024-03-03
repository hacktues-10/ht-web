const CLOSE_MESSAGE = "github-installation:close";

export function openPopup(url: string, width: number, height: number) {
  return new Promise<void>((resolve) => {
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
    function handleMessage(event: MessageEvent) {
      if (event.origin === window.location.origin && event.source === child) {
        if (event.data === CLOSE_MESSAGE) {
          window.removeEventListener("message", handleMessage);
          resolve();
        }
      }
    }
    window.addEventListener("message", handleMessage);
  });
}

export function closePopup() {
  window.close();
  window.opener.postMessage(CLOSE_MESSAGE, window.location.origin);
}
