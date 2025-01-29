import React, { useContext, useState } from "react";
import { RectContext } from "@/app/[userId]/[year]/rect-context.tsx";
import { IEvent } from "@components/TBodySelection.tsx";
import moment from "moment";
import "@/css/App.scss";
import { EditEventForm } from "@/app/[userId]/[year]/new-event.tsx";
import { SlidingPaneAutoWidth } from "@components/sliding-pane-auto-width.tsx";
import { useIsOpen } from "@components/use-is-open.tsx";

// https://stackoverflow.com/questions/13651022/square-brackets-with-css
export function FloatingEvents(props: { userId: string; events: IEvent[] }) {
  return (
    <div>
      {props.events.map((event, index) => (
        <OneFloatingEvent
          key={event.id}
          userId={props.userId}
          event1={event}
          index={index}
        />
      ))}
    </div>
  );
}

interface WeekInfo {
  weekNumber: number;
  isStart: boolean;
  isEnd: boolean;
  currentWeek: string;
  isoStart: string;
  isoEnd: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

function OneFloatingEvent({
  userId,
  event1,
  index,
}: {
  userId: string;
  event1: IEvent;
  index: number;
}) {
  const { rectState } = useContext(RectContext);
  let mStart = moment.utc(event1.startDate);
  let mEnd = moment.utc(event1.endDate);
  let [initialWindowTop] = useState(window.scrollY);

  const startWeek = mStart.isoWeeks();
  const endWeek = mEnd.isoWeek();
  const weeks = new Array(endWeek - startWeek + 1)
    .fill(null)
    .map((x, index) => {
      let isStart = index === 0;
      let weekNumber = startWeek + index;
      let isEnd = index === endWeek - startWeek;

      let currentWeek = mStart.clone().add(index, "weeks");
      let weekStart = currentWeek.clone().startOf("isoWeek");
      let weekEnd = currentWeek.clone().endOf("isoWeek");
      let isoStart = (isStart ? mStart : weekStart)
        .toISOString()
        .substring(0, 10);
      let isoEnd = (isEnd ? mEnd : weekEnd).toISOString().substring(0, 10);
      const startRect = rectState[isoStart];
      const endRect = rectState[isoEnd];
      // console.log(isoStart, isoEnd, startRect, endRect);
      if (!startRect || !endRect) {
        return null;
      }

      return {
        weekNumber,
        isStart,
        isEnd,
        currentWeek: currentWeek.toISOString(),
        isoStart,
        isoEnd,
        top: startRect.top + initialWindowTop,
        left: startRect.left,
        width: endRect.left - startRect.left + endRect.width,
        height: endRect.top - startRect.top + endRect.height,
      } as WeekInfo;
    })
    .filter(Boolean);
  // console.table(weeks);

  const eventColorNumber = (index % 11) + 1;

  return (
    <div>
      {weeks.map((week) => (
        <FloatingWeek
          key={week.weekNumber}
          userId={userId}
          event={event1}
          week={week}
          eventColorNumber={eventColorNumber}
        />
      ))}
    </div>
  );
}

function FloatingWeek(props: {
  userId: string;

  event: IEvent;
  week: WeekInfo;
  eventColorNumber: number;
}) {
  const { week } = props;
  const { isOpen, onOpen, onClose } = useIsOpen();

  return (
    <>
      <SlidingPaneAutoWidth
        isOpen={isOpen}
        title="Edit Event"
        onRequestClose={onClose}
      >
        <EditEventForm
          userId={props.userId}
          event={props.event}
          onClose={onClose}
        />
      </SlidingPaneAutoWidth>
      <div
        style={{
          position: "absolute",
          left: week?.left,
          top: week?.top,
          width: week?.width,
          height: week?.height,
          backgroundImage: `linear-gradient(black, black),
          linear-gradient(black, black),          
          linear-gradient(black, black),
          linear-gradient(black, black)
          `,

          backgroundRepeat: "no-repeat",
          backgroundSize: "8px 3px",
          // ^^^ This value should be equal to width of left OR right border.
          backgroundPosition: "top left, top right, bottom left, bottom right",

          borderStyle: "solid",
          borderColor: "black",
          borderWidth: "0 3px",
        }}
        className={
          "opacity-75 text-center d-flex justify-content-center align-items-center " +
          "event-" +
          props.eventColorNumber
        }
        onClick={onOpen}
      >
        {props.event.name}
      </div>
    </>
  );
}
