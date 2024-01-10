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

// how time works:

export const JANUARY = 0;
export const FEBRUARY = 1;
export const MARCH = 2;
export const APRIL = 3;
export const MAY = 4;
export const JUNE = 5;
export const JULY = 6;
export const AUGUST = 7;
export const SEPTEMBER = 8;
export const OCTOBER = 9;
export const NOVEMBER = 10;
export const DECEMBER = 11;

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
