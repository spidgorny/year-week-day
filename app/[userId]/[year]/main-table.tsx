"use client";

import { Generator } from "@/model/generator";
import Table from "react-bootstrap/Table";
import { IEvent, TBodySelection } from "@/components/TBodySelection";
import React, { useContext } from "react";
import { useEvents } from "@/app/[userId]/[year]/use-events.tsx";
import {
  RectContext,
  RectContextProvider,
} from "@/app/[userId]/[year]/rect-context.tsx";
import { FloatingEvents } from "@/app/[userId]/[year]/floating-events.tsx";
import moment from "moment";

export function eventInRange(
  event: IEvent,
  min: moment.Moment,
  max: moment.Moment,
) {
  return (
    moment(event.endDate).isSameOrAfter(min) &&
    moment(event.startDate).isSameOrBefore(max)
  );
}

export default function MainTable(props: { userId: string; year: number }) {
  const generator = new Generator(props.year);
  const weeks = generator.getWeeksIn();
  // console.table(weeks);

  const { events } = useEvents(props.userId);
  // console.table(events, ["startDate", "endDate", "name"]);

  let yearStart = moment(`${props.year}-01-01`);
  let yearEnd = moment(`${props.year + 1}-01-01`);
  const eventsThisYear = events.filter((x) =>
    eventInRange(x, yearStart, yearEnd),
  );

  return (
    <RectContextProvider>
      <Table>
        <MainTableHead />
        <TBodySelection
          weeks={weeks}
          userId={props.userId}
          year={props.year}
          events={eventsThisYear}
        />
      </Table>
      <FloatingEvents events={eventsThisYear} />
    </RectContextProvider>
  );
}

function MainTableHead() {
  const { rectState } = useContext(RectContext);
  return (
    <thead>
      <tr>
        <td onClick={() => console.table(rectState)}>Week #</td>
        <td>Monday</td>
        <td>Tuesday</td>
        <td>Wednesday</td>
        <td>Thursday</td>
        <td>Friday</td>
        <td>Saturday</td>
        <td>Sunday</td>
      </tr>
    </thead>
  );
}
