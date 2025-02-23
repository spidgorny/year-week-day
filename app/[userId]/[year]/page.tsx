"use server";
import React from "react";
import MainTable from "@/app/[userId]/[year]/main-table.tsx";
import { YearSelectorRow } from "@/app/[userId]/[year]/year-selector-row.tsx";
import { ContainerMaybeFluid } from "@/app/[userId]/[year]/container-maybe-fluid.tsx";

export default async function Home({
  params,
}: {
  params: Promise<{ userId: string; year: string }>;
}) {
  const { userId, year } = await params;
  const iYear = Number(year);

  return (
    <ContainerMaybeFluid>
      <div className="fs-6 fs-md-5">
        <YearSelectorRow userId={userId} iYear={iYear} />
        <MainTable userId={userId} year={iYear} />
      </div>
    </ContainerMaybeFluid>
  );
}
