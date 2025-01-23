"use server";

import { IEvent } from "@/components/TBodySelection.tsx";
import { User } from "@lib/db/user-model.ts";
import { Event } from "@lib/db/event-model";
import { getPostgresConnection } from "@lib/pg/get-postgres-connection.ts";

export async function saveEvent(userId: string, eventPayload: IEvent) {
  console.log("saving", eventPayload);
  await getPostgresConnection();
  const [user] = await User.findOrCreate({
    where: {
      id: userId,
    },
    defaults: {
      id: userId,
    },
  });

  const event = await Event.create({
    idUser: user.id,
    ...eventPayload,
    startDate: new Date(eventPayload.startDate),
    endDate: new Date(eventPayload.endDate),
  });

  return event.toJSON();
}
