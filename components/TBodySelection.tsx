"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { WeekRow } from "./WeekRow";
import { SlidingPaneAutoWidth } from "@components/sliding-pane-auto-width.tsx";
import { EditEventForm } from "@/app/[userId]/[year]/new-event.tsx";
import { eventInRange } from "@/app/[userId]/[year]/main-table.tsx";
import { useIsOpen } from "@components/use-is-open.tsx";

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
  const { isOpen, onOpen, onClose } = useIsOpen();

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

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetSelection();
      }
    };
    document.addEventListener("keypress", onKeyPress);
  }, []);

  const reportMouseUp = () => {
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
    onOpen();
  };

  const resetSelection = () => {
    setState((state) => ({
      ...state,
      minDate: null,
      maxDate: null,
    }));
  };

  const onCloseHere = () => {
    onClose();
    resetSelection();
  };

  const handleTouchDown = (e: React.TouchEvent<HTMLTableSectionElement>) => {
    if (isOpen) {
      return;
    }
    // e.preventDefault();
    const target = e.target as HTMLElement;
    let td = target.closest("td");
    if (!td) {
      return;
    }
    const strDate = td.getAttribute("data-date");
    // console.log("touch down", td, strDate);
    reportSelected(moment.utc(strDate));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLTableSectionElement>) => {
    if (isOpen) {
      return;
    }
    if (state.minDate || state.maxDate) {
      // already dragging
      e.preventDefault(); // Will throw an error if passive
    }
    const touches = Array.from(e.targetTouches);
    touches.map((touch) => {
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const td = element.closest("td");
      const strDate = td.getAttribute("data-date");
      reportSelected(moment.utc(strDate));
    });
    // reportSelected(date);
  };

  const handleTouchUp = (e: React.TouchEvent<HTMLTableSectionElement>) => {
    if (isOpen) {
      return;
    }
    e.preventDefault();
    reportMouseUp();
  };

  return (
    <tbody
      onTouchStart={handleTouchDown}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchUp}
    >
      <SlidingPaneAutoWidth
        isOpen={isOpen}
        title="Add Event"
        onRequestClose={onCloseHere}
      >
        <EditEventForm
          userId={props.userId}
          event={{
            startDate: state.minDate?.format("YYYY-MM-DD"),
            endDate: state.maxDate?.format("YYYY-MM-DD"),
            name: "",
          }}
          onClose={onCloseHere}
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
