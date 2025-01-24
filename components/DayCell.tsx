import React, {
  MouseEvent,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import moment from "moment";
import { IEvent } from "./TBodySelection";
import { useRect } from "@components/use-rect.tsx";
import { RectContext } from "@/app/[userId]/[year]/main-table.tsx";

interface IDayCellProps {
  className: string;
  date: moment.Moment;
  reportSelected: (date: moment.Moment) => void;
  reportMouseUp: (date: moment.Moment) => void;
  isSelected?: boolean;
  events: IEvent[];
}

export const DayCell: React.FC<PropsWithChildren<IDayCellProps>> = ({
  className,
  date,
  reportSelected,
  reportMouseUp,
  isSelected = false,
  events,
  children,
}) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const { setRectState } = useContext(RectContext);
  const rect = useRect(ref);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  useLayoutEffect(() => {
    setRectState(date, rect);
  }, [rect.left, rect.top]);

  const classes: string[] = [];
  const eventNames: string[] = [];
  // Compute classNames

  classes.push(className);
  if (isSelected) {
    classes.push("selected");
  }

  events.forEach((event: IEvent) => {
    const start = moment(event.startDate);
    const end = moment(event.endDate);
    if (date.isSame(start) || date.isBetween(start, end) || date.isSame(end)) {
      classes.push("event-" + event.id);
      eventNames.push(event.name);
    }
  });

  // Mouse event handlers
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setMouseDown(true);
    reportSelected(date);
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    setMouseDown(false);
    reportMouseUp(date);
  };

  const handleMouseEnter = (e: MouseEvent) => {
    e.preventDefault();
    if (e.buttons !== 1) return;
    reportSelected(date);
  };

  return (
    <td
      className={classes.join(" ")}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      ref={ref}
    >
      <span
        className="border border-secondary rounded-full text-body d-inline-block text-center"
        style={{ width: "1.5em", height: "1.5em" }}
      >
        {children}
      </span>
      &nbsp; {eventNames.join(" ")}
    </td>
  );
};
