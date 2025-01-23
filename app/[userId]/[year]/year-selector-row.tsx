"use client";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React from "react";
import { useEvents } from "@/app/[userId]/[year]/use-events.tsx";
import { Spinner } from "react-bootstrap";

export function YearSelectorRow({
  userId,
  iYear,
}: {
  userId: string;
  iYear: number;
}) {
  const { isValidating } = useEvents(userId);

  return (
    <div className="my-2 p-3 bg-light d-flex gap-3 justify-content-between align-items-center">
      <div></div>
      <div className="d-flex justify-content-center gap-3">
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
      <div>
        <Spinner
          animation="border"
          size="sm"
          className={isValidating ? "" : "invisible"}
        />
      </div>
    </div>
  );
}
