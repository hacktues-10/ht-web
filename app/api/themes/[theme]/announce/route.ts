import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getDynamicThemeFeature } from "~/app/(full-layout)/themes/_features/lib";

export const runtime = "edge";

export async function POST(
  req: NextRequest,
  { params }: { params: { theme: string } },
) {
  const theme = await getDynamicThemeFeature(params.theme);
  if (!theme) {
    return NextResponse.json({ error: "Theme not found" }, { status: 404 });
  }

  const requestBodyRes = await z
    .object({
      botToken: z.string(),
      channelId: z.string(),
    })
    .safeParseAsync(await req.json());
  if (!requestBodyRes.success) {
    return NextResponse.json({ error: requestBodyRes.error }, { status: 400 });
  }

  const { botToken, channelId } = requestBodyRes.data;

  const imageUrl = new URL(theme.image.url, req.nextUrl);

  console.log(imageUrl);

  const imageResonse = await fetch(imageUrl);
  if (!imageResonse.ok) {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
  const imageBuffer = await imageResonse.arrayBuffer();
  const image = new File([imageBuffer], "theme-image.png", {
    type: imageResonse.headers.get("content-type") || "image/png",
  });

  const imageMessage = await sendImageMessage(botToken, channelId, image);
  const textMessage = await sendTextMessage(
    botToken,
    channelId,
    theme.theme,
    theme.description,
  );
  return NextResponse.json([imageMessage, textMessage]);
}

async function sendImageMessage(
  botToken: string,
  channelId: string,
  image: File,
) {
  const formData = new FormData();
  formData.append("files[0]", image, "theme-image.png");

  const res = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${botToken}`,
      },
      body: formData,
    },
  );
  if (!res.ok) {
    throw new Error(
      JSON.stringify({
        message: "Failed to send image",
        error: await res.json(),
      }),
    );
  }
  return res.json();
}

async function sendTextMessage(
  botToken: string,
  channelId: string,
  theme: string,
  description: string,
) {
  const res = await fetch(
    `https://discord.com/api/v10/channels/${channelId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bot ${botToken}`,
      },
      body: JSON.stringify({
        content: `# ${theme}\n\n${description}`,
      }),
    },
  );
  if (!res.ok) {
    throw new Error(
      JSON.stringify({
        message: "Failed to send text message",
        error: await res.json(),
      }),
    );
  }

  return res.json();
}
