"use server";
import Container from "react-bootstrap/Container";
import React from "react";
import "@/css/App.scss";
import MainTable from "@/app/[userId]/[year]/main-table.tsx";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default async function Home({
  params,
}: {
  params: Promise<{ userId: string; year: string }>;
}) {
  const { userId, year } = await params;
  const iYear = Number(year);

  return (
    <Container>
      <div className="my-2 p-3 bg-light d-flex gap-3 justify-content-center align-items-center">
        <div>
          <Link
            href={`/${userId}/${iYear - 1}`}
            className="btn btn-outline-secondary"
          >
            <FaChevronLeft />
          </Link>
        </div>
        <div>{iYear}</div>
        <div>
          <Link
            href={`/${userId}/${iYear + 1}`}
            className="btn btn-outline-secondary"
          >
            <FaChevronRight />
          </Link>
        </div>
      </div>
      <MainTable userId={userId} year={iYear} />
    </Container>
  );
}
