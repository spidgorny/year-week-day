import { NextRequest } from "next/server";
import { User } from "@lib/db/user-model.ts";
import { Event } from "@lib/db/event-model.ts";
import { getPostgresConnection } from "@lib/pg/get-postgres-connection.ts";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;
  await getPostgresConnection();
  let user = await User.findByPk(userId);

  let events = [];
  if (user.id) {
    events = await Event.findAll({
      where: {
        $idUser$: user.id,
      },
    });
  }
  return Response.json({ user, events });
}
