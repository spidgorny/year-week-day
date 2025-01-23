"use server";
import Container from "react-bootstrap/Container";
import React from "react";
import "@/css/App.scss";
import MainTable from "@/app/[userId]/[year]/main-table.tsx";
import { YearSelectorRow } from "@/app/[userId]/[year]/year-selector-row.tsx";

export default async function Home({
  params,
}: {
  params: Promise<{ userId: string; year: string }>;
}) {
  const { userId, year } = await params;
  const iYear = Number(year);

  return (
    <Container>
      <YearSelectorRow userId={userId} iYear={iYear} />
      <MainTable userId={userId} year={iYear} />
    </Container>
  );
}
