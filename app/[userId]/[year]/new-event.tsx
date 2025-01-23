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
import { revalidatePath } from "next/cache";
import { Alert } from "react-bootstrap";

export function EditEventPane(props: { userId: string; event: IEvent }) {
  const [state, setState] = useState(false);

  const onClose = () => {
    setState(false);
    revalidatePath(`/${props.userId}/events`);
  };

  return (
    <div>
      <SaveButton onClick={() => setState(true)}>Edit Event</SaveButton>
      <SlidingPaneAutoWidth
        isOpen={state}
        title="Add/Edit Event"
        onRequestClose={onClose}
      >
        <EditEventForm
          userId={props.userId}
          event={props.event}
          onClose={onClose}
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
      <input type="hidden" name="id" value={formData.id} />
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
          autoFocus
        />
      </label>
      <SaveButton type="submit" disabled={isWorking} isWorking={isWorking}>
        Submit
      </SaveButton>
      <ErrorAlert error={error} />
    </form>
  );
}

export function ErrorAlert(props: { error?: Error }) {
  if (!props.error) {
    return null;
  }
  return <Alert variant="danger">{props.error.message}</Alert>;
}
