"use client";

import { FormEvent } from "react";
import { SlidingPaneAutoWidth } from "@components/sliding-pane-auto-width.tsx";
import { IEvent } from "@/components/TBodySelection.tsx";
import { deleteEvent, saveEvent } from "@/app/[userId]/[year]/actions.ts";
import { useAsyncWorking } from "spidgorny-react-helpers/use-async-working.ts";
import { SaveButton } from "@components/save-button.tsx";
import { useFormData } from "spidgorny-react-helpers/use-form-data.tsx";
import moment from "moment";
import { useEvents } from "@/app/[userId]/[year]/use-events.tsx";
import { revalidatePath } from "next/cache";
import { ErrorAlert } from "@components/error-alert.tsx";
import { useIsOpen } from "@components/use-is-open.tsx";

export function EditEventPane(props: { userId: string; event: IEvent }) {
  const { isOpen, onOpen, onClose } = useIsOpen();

  const onCloseHere = () => {
    onClose();
    revalidatePath(`/${props.userId}/events`);
  };

  return (
    <div>
      <SaveButton onClick={onOpen}>Edit Event</SaveButton>
      <SlidingPaneAutoWidth
        isOpen={isOpen}
        title="Add/Edit Event"
        onRequestClose={onCloseHere}
      >
        <EditEventForm
          userId={props.userId}
          event={props.event}
          onClose={onCloseHere}
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

  let duration =
    moment(formData.endDate).diff(moment(formData.startDate), "days") + 1;
  return (
    <div className="h-100 d-flex flex-column justify-content-between">
      <form onSubmit={run}>
        <input type="hidden" name="id" value={formData.id} />
        <label className="form-label d-block mb-3">
          <span onClick={() => console.log(formData)}>Start Date</span>
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
          <span className={duration < 0 ? "text-danger" : ""}>
            {" "}
            {duration} days
          </span>
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
        <SaveButton
          type="submit"
          disabled={isWorking || duration < 0 || formData.name === ""}
          isWorking={isWorking}
        >
          Submit
        </SaveButton>
        <div className="mb-3"></div>
        <ErrorAlert error={error} />
      </form>
      <div className="d-flex justify-content-end">
        {props.event.id && (
          <DeleteEventButton
            userId={props.userId}
            event={props.event}
            onClose={props.onClose}
          />
        )}
      </div>
    </div>
  );
}

function DeleteEventButton(props: {
  userId: string;
  event: IEvent;
  onClose: () => void;
}) {
  const { mutate } = useEvents(props.userId);
  const { isWorking, error, run } = useAsyncWorking(
    async (event: MouseEvent) => {
      event.preventDefault();
      await deleteEvent(props.event.id);
      await mutate();
      props.onClose();
    },
  );
  return (
    <div>
      <SaveButton
        disabled={isWorking}
        isWorking={isWorking}
        onClick={run}
        className="btn-danger"
      >
        Delete Event
      </SaveButton>
      <ErrorAlert error={error} />
    </div>
  );
}
