"use client";
import { Generator } from "@/model/generator";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { TBodySelection } from "@/components/TBodySelection";
import React from "react";
import "@/css/App.scss";

export default function Home() {
  const year = 2025;
  const generator = new Generator(year);
  const weeks = generator.getWeeksIn();

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
        <TBodySelection weeks={weeks}></TBodySelection>
      </Table>
    </Container>
  );
}
