"use server";
import Container from "react-bootstrap/Container";
import React from "react";
import "@/css/App.scss";
import MainTable from "@/app/[userId]/[year]/main-table.tsx";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ userId: string; year: string }>;
}) {
  const { userId, year } = await params;
  const iYear = Number(year);

  return (
    <Container>
      <div className="my-2 p-3 bg-light d-flex gap-3">
        <div>
          <Link href={`/${userId}/${iYear - 1}`}>-1</Link>
        </div>
        <div>{iYear}</div>
        <div>
          <Link href={`/${userId}/${iYear + 1}`}>+1</Link>
        </div>
      </div>
      <MainTable userId={userId} year={iYear} />
    </Container>
  );
}
