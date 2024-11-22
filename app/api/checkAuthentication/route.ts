import { NextRequest, NextResponse } from "next/server";

import { getUserAuthorization } from "../auth/session";

export async function GET(req: NextRequest) {
  return NextResponse.json(await checkAuthentication(), { status: 200 });
}

async function checkAuthentication() {
  const authorization = await getUserAuthorization();
  return {
    isParticipant:
      authorization.isAdmin ||
      authorization.isParticipant,
    hasConnectedDiscord:
      authorization.isAdmin || authorization.hasConnectedDiscord,
    hasSession: authorization.hasSession,
  };
}

export type CheckAuthenticationResponse = Awaited<
  ReturnType<typeof checkAuthentication>
>;
