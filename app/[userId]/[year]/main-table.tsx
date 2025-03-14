"use client";

import { Generator } from "@lib/model/generator";
import Table from "react-bootstrap/Table";
import {
  IEvent,
  InsideTBody,
  TBodySelection,
} from "@/components/TBodySelection";
import React, { useContext } from "react";
import { useEvents } from "@/app/[userId]/[year]/use-events.tsx";
import {
  RectContext,
  RectContextProvider,
} from "@/app/[userId]/[year]/rect-context.tsx";
import { FloatingEvents } from "@/app/[userId]/[year]/floating-events.tsx";
import moment from "moment";
import { useMediaQuery } from "usehooks-ts";

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

  const isMobile = useMediaQuery("(max-width: 800px)");

  if (isMobile) {
    // no need to react on mouse drag
    return (
      <RectContextProvider>
        <Table className="table-fixed">
          <MainTableHead />
          <tbody>
            <InsideTBody
              weeks={weeks}
              minDate={null}
              maxDate={null}
              events={events}
            />
          </tbody>
        </Table>
        <FloatingEvents userId={props.userId} events={eventsThisYear} />
      </RectContextProvider>
    );
  }

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

  const isCurrentDayOfWeekClassName = (weekDay: number) => {
    if (moment().weekday() === weekDay) {
      return "bg-success";
    }
    return "";
  };

  return (
    <thead>
      <tr>
        <td onClick={() => console.table(rectState)}>Week #</td>
        <td style={weekDayStyle} className={isCurrentDayOfWeekClassName(0)}>
          Monday
        </td>
        <td style={weekDayStyle} className={isCurrentDayOfWeekClassName(1)}>
          Tuesday
        </td>
        <td style={weekDayStyle} className={isCurrentDayOfWeekClassName(2)}>
          Wednesday
        </td>
        <td style={weekDayStyle} className={isCurrentDayOfWeekClassName(3)}>
          Thursday
        </td>
        <td style={weekDayStyle} className={isCurrentDayOfWeekClassName(4)}>
          Friday
        </td>
        <td style={weekDayStyle} className={isCurrentDayOfWeekClassName(5)}>
          Saturday
        </td>
        <td style={weekDayStyle} className={isCurrentDayOfWeekClassName(6)}>
          Sunday
        </td>
      </tr>
    </thead>
  );
}
