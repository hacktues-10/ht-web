import { z } from "zod";

import { app } from "~/app/_integrations/github/app";
import { webhookEventNames } from "~/app/_integrations/github/webhook-event-names";

export async function POST(request: Request) {
  const payload = z
    .object({
      id: z.string(),
      name: z.enum(webhookEventNames),
      signature: z.string(),
      payload: z.string(),
    })
    .safeParse({
      id: request.headers.get("x-github-delivery"),
      name: request.headers.get("x-github-event"),
      signature: request.headers.get("x-hub-signature"),
      payload: await request.text(),
    });
  if (!payload.success) {
    return new Response(null, { status: 400 });
  }
  await app.webhooks.verifyAndReceive(payload.data);
  return new Response(null, { status: 200 });
}
