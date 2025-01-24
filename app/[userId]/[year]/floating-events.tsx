import React, { useContext } from "react";
import { RectContext } from "@/app/[userId]/[year]/rect-context.tsx";
import { IEvent } from "@components/TBodySelection.tsx";
import moment from "moment";
import "@/css/App.scss";

// https://stackoverflow.com/questions/13651022/square-brackets-with-css
export function FloatingEvents(props: { events: IEvent[] }) {
  return (
    <div>
      {props.events.map((event, index) => (
        <OneFloatingEvent key={event.id} event1={event} index={index} />
      ))}
    </div>
  );
}

function OneFloatingEvent({
  event1,
  index,
}: {
  event1: IEvent;
  index: number;
}) {
  const { rectState } = useContext(RectContext);
  let mStart = moment.utc(event1.startDate);
  let mEnd = moment.utc(event1.endDate);

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
        top: startRect.top,
        left: startRect.left,
        width: endRect.left - startRect.left + endRect.width,
        height: endRect.top - startRect.top + endRect.height,
      };
    })
    .filter(Boolean);
  // console.table(weeks);

  const eventColorNumber = (index % 11) + 1;

  return (
    <div>
      {weeks.map((week) => (
        <div
          key={week.weekNumber}
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
            backgroundPosition:
              "top left, top right, bottom left, bottom right",

            borderStyle: "solid",
            borderColor: "black",
            borderWidth: "0 3px",
          }}
          className={
            "opacity-75 text-center d-flex justify-content-center align-items-center " +
            "event-" +
            eventColorNumber
          }
        >
          {event1.name}
        </div>
      ))}
    </div>
  );
}
