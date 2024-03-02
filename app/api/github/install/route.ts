import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  redirect("/github/success");
}
