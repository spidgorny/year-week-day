"use client";

import { FormEvent, useState } from "react";
import { SlidingPaneAutoWidth } from "@components/sliding-pane-auto-width.tsx";
import { IEvent } from "@/components/TBodySelection.tsx";
import { saveEvent } from "@/app/[userId]/[year]/actions.ts";
import { useAsyncWorking } from "spidgorny-react-helpers/use-async-working.ts";
import { SaveButton } from "@components/save-button.tsx";

export function EditEventPane(props: { event: IEvent }) {
  const [state, setState] = useState(false);

  return (
    <div>
      <SaveButton onClick={() => setState(true)}>Edit Event</SaveButton>
      <SlidingPaneAutoWidth
        isOpen={state}
        title="Add/Edit Event"
        onRequestClose={() => setState(false)}
      >
        <EditEventForm event={props.event} onClose={() => setState(false)} />
      </SlidingPaneAutoWidth>
    </div>
  );
}

export function EditEventForm(props: { event: IEvent; onClose: () => void }) {
  const { isWorking, error, run } = useAsyncWorking(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const eventData = Object.fromEntries(
        formData.entries(),
      ) as unknown as IEvent;
      await saveEvent(eventData);
      props.onClose();
    },
  );

  return (
    <form onSubmit={run}>
      <label className="form-label d-block mb-3">
        Start Date
        <input
          name="startDate"
          type="date"
          className="form-control"
          defaultValue={props.event.startDate}
        />
      </label>
      <label className="form-label d-block mb-3">
        End Date
        <input
          name="endDate"
          type="date"
          className="form-control"
          defaultValue={props.event.endDate}
        />
      </label>
      <label className="form-label d-block mb-3">
        Event name
        <input
          name="name"
          className="form-control"
          defaultValue={props.event.name}
        />
      </label>
      <SaveButton type="submit" disabled={isWorking}>
        Submit
      </SaveButton>
    </form>
  );
}
