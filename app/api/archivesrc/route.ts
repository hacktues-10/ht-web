import { NextResponse } from "next/server";

import { HACKATHONS } from "~/app/_configs/archive";

export const GET = () => {
  return NextResponse.json(HACKATHONS);
};
