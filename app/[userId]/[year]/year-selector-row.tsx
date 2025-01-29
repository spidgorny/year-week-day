"use client";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaPlusCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useEvents } from "@/app/[userId]/[year]/use-events.tsx";
import { Button, Spinner } from "react-bootstrap";
import { SlidingPaneAutoWidth } from "@components/sliding-pane-auto-width.tsx";
import { EditEventForm } from "@/app/[userId]/[year]/new-event.tsx";
import moment from "moment";

export function YearSelectorRow(props: { userId: string; iYear: number }) {
  const { isValidating } = useEvents(props.userId);
  const [isOpenAddEvent, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="my-2 p-3 bg-light d-flex gap-3 justify-content-between align-items-center">
      <div>
        Drag over days or{" "}
        <Button
          onClick={() => setIsOpen(true)}
          className="d-inline-flex gap-2 align-items-center btn-sm"
        >
          <FaPlusCircle /> Add Event
        </Button>
        <SlidingPaneAutoWidth
          isOpen={isOpenAddEvent}
          title="Add/Edit Event"
          onRequestClose={onClose}
        >
          <EditEventForm
            userId={props.userId}
            event={{
              startDate: moment()
                .add(1, "month")
                .toISOString()
                .substring(0, 10),
              endDate: moment()
                .add(1, "month")
                .add(1, "day")
                .toISOString()
                .substring(0, 10),
              name: "",
            }}
            onClose={onClose}
          />
        </SlidingPaneAutoWidth>
      </div>
      <div className="d-flex justify-content-center gap-3">
        <div>
          <Link
            href={`/${props.userId}/${props.iYear - 1}`}
            className="btn btn-outline-secondary"
          >
            <FaChevronLeft />
          </Link>
        </div>
        <div>{props.iYear}</div>
        <div>
          <Link
            href={`/${props.userId}/${props.iYear + 1}`}
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
