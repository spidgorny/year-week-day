"use client";

import React, { useState } from "react";
import moment from "moment";
import { WeekRow } from "./WeekRow";
import { SlidingPaneAutoWidth } from "@components/sliding-pane-auto-width.tsx";
import { EditEventForm } from "@/app/[userId]/[year]/new-event.tsx";
import { eventInRange } from "@/app/[userId]/[year]/main-table.tsx";

export interface IEvent {
  id?: string;
  name: string;
  startDate: string; // date from JSON
  endDate: string; // date from JSON
}

interface ITBodySelectionProps {
  userId: string;
  year: number;
  weeks: moment.Moment[];
  events: IEvent[];
}

interface ITBodySelectionState {
  minDate: moment.Moment | null;
  maxDate: moment.Moment | null;
}

export function TBodySelection(props: ITBodySelectionProps) {
  const [state, setState] = useState<ITBodySelectionState>({
    minDate: null,
    maxDate: null,
  });
  const [isOpenAddEvent, setIsOpen] = useState(false);

  const reportSelected = (date: moment.Moment) => {
    // console.log(date.format('YYYY-MM-DD'));
    if (!state || !state.minDate || !state.maxDate) {
      setState((state) => ({
        ...state,
        minDate: date.clone(),
        maxDate: date.clone(),
      }));
      return;
    }

    setState((state) => {
      if (date.isBefore(state.minDate)) {
        return {
          ...state,
          minDate: date.clone(),
        };
      } else {
        return {
          ...state,
          maxDate: date.clone(),
        };
      }
    });
  };

  const reportMouseUp = async (date: moment.Moment) => {
    if (!state.minDate || !state.maxDate) {
      return;
    }
    // let min = state.minDate as unknown as moment.Moment;
    // let max = state.maxDate as unknown as moment.Moment;
    // const name = prompt(
    //   `What happens between ${min.format("YYYY-MM-DD")} and ${max.format("YYYY-MM-DD")}?`,
    // );

    // @todo: store with POST
    // await db.table("events").put({
    //   name,
    //   startDate: min.format("YYYY-MM-DD"),
    //   endDate: max.format("YYYY-MM-DD"),
    // });
    // fetchData(); // update
    setIsOpen(true);
  };

  const resetSelection = () => {
    setState((state) => ({
      ...state,
      minDate: null,
      maxDate: null,
    }));
  };

  const onClose = () => {
    setIsOpen(false);
    resetSelection();
  };

  return (
    <tbody>
      <SlidingPaneAutoWidth
        isOpen={isOpenAddEvent}
        title="Add/Edit Event"
        onRequestClose={onClose}
      >
        <EditEventForm
          userId={props.userId}
          event={{
            startDate: state.minDate?.format("YYYY-MM-DD"),
            endDate: state.maxDate?.format("YYYY-MM-DD"),
            name: "",
          }}
          onClose={onClose}
        />
      </SlidingPaneAutoWidth>

      {props.weeks.map((monday: moment.Moment) => (
        <WeekRow
          key={monday.format("YYYY-MM-DD")}
          monday={monday}
          reportSelected={reportSelected}
          reportMouseUp={reportMouseUp}
          minSelected={state.minDate}
          maxSelected={state.maxDate}
          events={props.events.filter((x) =>
            eventInRange(x, monday, monday.clone().add(1, "weeks")),
          )}
        />
      ))}
    </tbody>
  );
}
