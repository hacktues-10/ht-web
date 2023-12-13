import { NextRequest } from "next/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prevent open redirects by resolving the callback URL from the query string
 * and allowing only redirects to the same origin.
 *
 * @param untrustedCallbackUrl The user-provided callback URL
 */
export function resolveCallbackUrl(
  untrustedCallbackUrl: string,
  req: NextRequest,
) {
  const baseUrl = new URL(req.url).origin;
  // Allows relative callback URLs
  if (untrustedCallbackUrl.startsWith("/"))
    return `${baseUrl}${untrustedCallbackUrl}`;
  // Allows callback URLs on the same origin
  else if (new URL(untrustedCallbackUrl).origin === baseUrl)
    return untrustedCallbackUrl;
  return baseUrl;
}
