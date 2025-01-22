"use client";
import { Generator } from "@/model/generator";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { TBodySelection } from "@/components/TBodySelection";
import React, { useState } from "react";
import "@/css/App.scss";

const generator = new Generator(2020);

export default function Home() {
  const [state, setState] = useState({
    weeks: generator.weeks,
  });

  return (
    <Container>
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
        <TBodySelection weeks={state.weeks}></TBodySelection>
      </Table>
    </Container>
  );
}
