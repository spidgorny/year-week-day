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

  let yearStart = moment.utc(`${props.year}-01-01`);
  let yearEnd = moment.utc(`${props.year + 1}-01-01`);
  const eventsThisYear = events.filter((x) =>
    eventInRange(x, yearStart, yearEnd),
  );

  return (
    <RectContextProvider>
      <Table className="table-fixed">
        <MainTableHead />
        <TBodySelection
          weeks={weeks}
          userId={props.userId}
          year={props.year}
          events={eventsThisYear}
        />
      </Table>
      <FloatingEvents userId={props.userId} events={eventsThisYear} />
    </RectContextProvider>
  );
}

function MainTableHead() {
  const { rectState } = useContext(RectContext);
  let weekDayStyle = { width: (1 / 8) * 100 + "%", overflow: "hidden" };
  return (
    <thead>
      <tr>
        <td onClick={() => console.table(rectState)}>Week #</td>
        <td style={weekDayStyle}>Monday</td>
        <td style={weekDayStyle}>Tuesday</td>
        <td style={weekDayStyle}>Wednesday</td>
        <td style={weekDayStyle}>Thursday</td>
        <td style={weekDayStyle}>Friday</td>
        <td style={weekDayStyle}>Saturday</td>
        <td style={weekDayStyle}>Sunday</td>
      </tr>
    </thead>
  );
}
