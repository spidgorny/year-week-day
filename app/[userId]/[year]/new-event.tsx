"use client";

import { FormEvent, useState } from "react";
import { SlidingPaneAutoWidth } from "@components/sliding-pane-auto-width.tsx";
import { IEvent } from "@/components/TBodySelection.tsx";
import { saveEvent } from "@/app/[userId]/[year]/actions.ts";
import { useAsyncWorking } from "spidgorny-react-helpers/use-async-working.ts";
import { SaveButton } from "@components/save-button.tsx";
import { useFormData } from "spidgorny-react-helpers/use-form-data.tsx";
import moment from "moment";
import { useEvents } from "@/app/[userId]/[year]/use-events.tsx";

export function EditEventPane(props: { userId: string; event: IEvent }) {
  const [state, setState] = useState(false);

  return (
    <div>
      <SaveButton onClick={() => setState(true)}>Edit Event</SaveButton>
      <SlidingPaneAutoWidth
        isOpen={state}
        title="Add/Edit Event"
        onRequestClose={() => setState(false)}
      >
        <EditEventForm
          userId={props.userId}
          event={props.event}
          onClose={() => setState(false)}
        />
      </SlidingPaneAutoWidth>
    </div>
  );
}

export function EditEventForm(props: {
  userId: string;
  event: IEvent;
  onClose: () => void;
}) {
  const { formData, onChange } = useFormData(props.event);
  const { mutate } = useEvents(props.userId);

  const { isWorking, error, run } = useAsyncWorking(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const eventData = Object.fromEntries(
        formData.entries(),
      ) as unknown as IEvent;
      const newEvent = await saveEvent(props.userId, eventData);
      await mutate();
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
          value={formData.startDate}
          onChange={onChange}
        />
      </label>
      <label className="form-label d-block mb-3">
        End Date
        <input
          name="endDate"
          type="date"
          className="form-control"
          value={formData.endDate}
          onChange={onChange}
        />
      </label>
      <p className="my-3">
        Duration:{" "}
        {moment(formData.endDate).diff(moment(formData.startDate), "days")} days
      </p>
      <label className="form-label d-block mb-3">
        Event name
        <input
          name="name"
          className="form-control"
          value={formData.name}
          onChange={onChange}
        />
      </label>
      <SaveButton type="submit" disabled={isWorking} isWorking={isWorking}>
        Submit
      </SaveButton>
    </form>
  );
}
