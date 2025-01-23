"use client";

import { Generator } from "@/model/generator";
import Table from "react-bootstrap/Table";
import { TBodySelection } from "@/components/TBodySelection";
import React from "react";
import useSWR from "swr";

export default function MainTable(props: { userId: string; year: number }) {
  const generator = new Generator(props.year);
  const weeks = generator.getWeeksIn();
  // console.table(weeks);

  const { events } = useEvents(props.userId);
  // console.table(events);

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

function useEvents(userId: string) {
  const { isLoading, error, data, mutate } = useSWR(`/api/${userId}`);
  return {
    isLoading,
    error,
    user: data?.user,
    events: data?.events ?? [],
    mutate,
  };
}
