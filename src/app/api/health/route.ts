import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Never cached — the response must reflect the live server, not build output.
export const dynamic = "force-dynamic";

// Deliberately touches no external service (Strapi, Brevo) so the container
// still reports healthy when a dependency is down.
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
