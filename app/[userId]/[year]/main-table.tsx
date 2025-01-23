"use client";

import { Generator } from "@/model/generator";
import Table from "react-bootstrap/Table";
import { TBodySelection } from "@/components/TBodySelection";
import React from "react";
import { useEvents } from "@/app/[userId]/[year]/use-events.tsx";

export default function MainTable(props: { userId: string; year: number }) {
  const generator = new Generator(props.year);
  const weeks = generator.getWeeksIn();
  // console.table(weeks);

  const { events } = useEvents(props.userId);
  console.table(events, ["startDate", "endDate", "name"]);

  return (
    <Table>
      <thead>
        <tr>
          <td>Week #</td>
          <td>Monday</td>
          <td>Tuesday</td>
          <td>Wednesday</td>
          <td>Thursday</td>
          <td>Friday</td>
          <td>Saturday</td>
          <td>Sunday</td>
        </tr>
      </thead>
      <TBodySelection
        weeks={weeks}
        userId={props.userId}
        year={props.year}
        events={events}
      />
    </Table>
  );
}
