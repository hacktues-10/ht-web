// HACK: prevent Next.js redirects and other stuff from being caught as errors
export function isNextControlError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.toLowerCase().includes("next")
  );
}
