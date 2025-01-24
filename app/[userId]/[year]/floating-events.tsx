import React, { useContext } from "react";
import { RectContext } from "@/app/[userId]/[year]/rect-context.tsx";
import { IEvent } from "@components/TBodySelection.tsx";

// https://stackoverflow.com/questions/13651022/square-brackets-with-css
export function FloatingEvents(props: { events: IEvent[] }) {
  const { rectState } = useContext(RectContext);
  const event1 = props.events[0];
  if (!event1) {
    return null;
  }
  let isoStart = new Date(event1.startDate).toISOString().substring(0, 10);
  const startRect = rectState[isoStart];
  let isoEnd = new Date(event1.endDate).toISOString().substring(0, 10);
  const endRect = rectState[isoEnd];
  console.log(isoStart, isoEnd, startRect, endRect);
  return (
    <div
      style={{
        position: "absolute",
        left: startRect?.left,
        top: startRect?.top,
        width: endRect?.left + endRect?.width,
        height: endRect?.top + endRect.height,
        backgroundImage: `linear-gradient(#ffb1bb, #ffb1bb),
          linear-gradient(#ffb1bb, #ffb1bb),
          linear-gradient(#ffb1bb, #ffb1bb),
          linear-gradient(#ffb1bb, #ffb1bb)`,

        backgroundRepeat: "no-repeat",
        backgroundSize: "8px 3px",
        // ^^^ This value should be equal to width of left OR right border.
        backgroundPosition: "top left, top right, bottom left, bottom right",

        border: "solid #ffb1bb",
        borderWidth: "0 3px",
      }}
      className="opacity-75 bg-success-subtle text-center d-flex justify-content-center align-items-center"
    >
      Event: {event1.name}
    </div>
  );
}
