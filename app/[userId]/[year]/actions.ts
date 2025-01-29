"use server";

import {IEvent} from "@/components/TBodySelection.tsx";
import {User} from "@lib/db/user-model.ts";
import {Event} from "@lib/db/event-model";
import {getPostgresConnection} from "@lib/pg/get-postgres-connection.ts";
import {Repository} from "@lib/pg/repository.ts";

export async function saveEvent(userId: string, eventPayload: IEvent & {idUser?: string}) {
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

  const repo = await Repository.init(userId);
  if (eventPayload.id) {
    // UPDATE
    const event = await repo.findEventById(eventPayload.id);
    delete eventPayload.idUser;
    await event.update({
      ...eventPayload,
      startDate: new Date(eventPayload.startDate),
      endDate: new Date(eventPayload.endDate),
    });
    return event.toJSON();
  }

  // CREATE
  const event = await Event.create({
    idUser: user.id,
    ...eventPayload,
    id: undefined,
    startDate: new Date(eventPayload.startDate),
    endDate: new Date(eventPayload.endDate),
  });

  return event.toJSON();
}

export async function deleteEvent(eventId: string) {
  await getPostgresConnection();
  const event = await Event.findByPk(eventId);
  await event.destroy();
}
