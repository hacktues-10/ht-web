import { NextRequest, NextResponse } from "next/server";

import { env } from "~/app/env.mjs";

const secret = crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(env.NEXTAUTH_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["verify"],
);

function hexToStr(hex: string) {
  return (hex.replace(/[^0-9A-F]/gi, "").match(/.{2}/g) ?? [])
    .map((x) => String.fromCharCode(parseInt(x, 16)))
    .join("");
}

function hexToUint8Array(hex: string) {
  return new Uint8Array((hex.match(/.{2}/g) ?? []).map((x) => parseInt(x, 16)));
}

export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: { id: string; key: string };
  },
) {
  const id = hexToStr(params.id);
  const key = hexToUint8Array(params.key);

  const data = new TextEncoder().encode(id);
  const isValid = await crypto.subtle.verify("HMAC", await secret, key, data);
  if (!isValid) {
    return new NextResponse("404 not found", { status: 404 });
  }

  const driveUrl = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(
    id,
  )}&export=download`;

  const res = await fetch(driveUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.3",
    },
    redirect: "follow",
    cache: "no-store",
  });
  if (!res.ok) {
    return new NextResponse("404 not found", { status: 404 });
  }
  const contentType = res.headers.get("content-type");
  if (!contentType?.startsWith("image")) {
    return new NextResponse("404 not found", { status: 404 });
  }

  return new NextResponse(await res.blob(), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
