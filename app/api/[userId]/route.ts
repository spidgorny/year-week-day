import { NextRequest } from "next/server";
import { Repository } from "@lib/pg/repository.ts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  const repo = await Repository.init(userId);
  const user = await repo.getUser();

  let events = [];
  if (user?.id) {
    events = await repo.fetchEvents();
  }
  return Response.json({ user, events });
}
