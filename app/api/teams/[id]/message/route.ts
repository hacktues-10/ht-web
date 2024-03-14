import { NextRequest, NextResponse } from "next/server";

import { getTeamById } from "~/app/(full-layout)/teams/service";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (params.id.includes(",")) {
    return batchSendMessages(params.id.split(","), req);
  }
  return sendSingleMessage(params.id);
}

async function batchSendMessages(teamIds: string[], req: NextRequest) {
  const teams = await Promise.all(teamIds.map(getTeamById));
  // send the same request to all team endpoints using fetch, but changing the url:
  const messagePromises = teams
    .map(async (team) => {
      if (!team) {
        throw new Error("Team not found");
      }
      return fetch(
        `https://discord.com/api/10/channels/${team.discordTextChannelId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bot ${req.headers.get("authorization")}`,
          },
          body: JSON.stringify(await req.clone().json()),
        },
      );
    })
    .map(async (r) => (await r).json());

  const messages = await Promise.all(messagePromises);
  return NextResponse.json(messages);
}

async function sendSingleMessage(teamId: string) {
  const team = await getTeamById(teamId);
  if (!team) {
    return;
  }
  return NextResponse.redirect(
    `https://discord.com/api/10/channels/${team.discordTextChannelId}/messages`,
    {
      status: 307,
    },
  );
}
