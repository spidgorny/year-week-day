"use server";

import { IEvent } from "@/components/TBodySelection.tsx";

export async function saveEvent(event: IEvent) {
  console.log("saving", event);
}
