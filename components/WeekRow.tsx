import React from "react";
import moment from "moment";
import { DayCell } from "./DayCell";
import { IEvent } from "./TBodySelection";

interface IWeekRowProps {
  monday: moment.Moment;
  reportSelected: (date: moment.Moment) => void;
  reportMouseUp: (date: moment.Moment) => void;
  minSelected: moment.Moment | null;
  maxSelected: moment.Moment | null;
  events: IEvent[];
}

export class WeekRow extends React.Component<IWeekRowProps> {
  isToday(plus: number) {
    const classes: string[] = [];
    const today = moment();
    let dayOfTheWeek = this.props.monday.clone().add(plus, "d");
    if (dayOfTheWeek.isSame(today, "day")) {
      classes.push("bg-success");
      return classes.join(" "); // prevent double background-color
    }

    if (plus >= 5) {
      classes.push("weekend");
      return classes.join(" ");
    }

    // month, Jan, Feb
    const month = dayOfTheWeek.locale("en").format("MMM");
    classes.push("month-" + month);

    return classes.join(" ");
  }

  get isCurrentWeekClassName() {
    const today = moment();
    if (this.props.monday.isSame(today, "week")) {
      return "bg-success";
    }
    return "";
  }

  day(plus: number) {
    let dayOfTheWeek = this.props.monday.clone().add(plus, "d");
    return dayOfTheWeek.format("DD");
  }

  date(plus: number) {
    return this.props.monday.clone().add(plus, "d");
  }

  isSelected(plus: number) {
    if (!this.props.minSelected || !this.props.maxSelected) {
      return false;
    }
    let dayOfTheWeek = this.props.monday.clone().add(plus, "d");
    let between = dayOfTheWeek.isBetween(
      this.props.minSelected,
      this.props.maxSelected,
      "day",
    );
    return (
      dayOfTheWeek.isSame(this.props.minSelected) ||
      between ||
      dayOfTheWeek.isSame(this.props.maxSelected)
    );
  }

  render() {
    return (
      <tr>
        <td
          className={"weekNumber " + this.isCurrentWeekClassName}
          title={this.props.monday.format("YYYY-MM-DD")}
        >
          #{this.props.monday.format("ww")}
        </td>
        <DayCell
          className={this.isToday(0)}
          date={this.date(0)}
          reportSelected={this.props.reportSelected}
          reportMouseUp={this.props.reportMouseUp}
          isSelected={this.isSelected(0)}
          events={this.props.events}
        >
          {this.day(0)}
        </DayCell>
        <DayCell
          className={this.isToday(1)}
          date={this.date(1)}
          reportSelected={this.props.reportSelected}
          reportMouseUp={this.props.reportMouseUp}
          isSelected={this.isSelected(1)}
          events={this.props.events}
        >
          {this.day(1)}
        </DayCell>
        <DayCell
          className={this.isToday(2)}
          date={this.date(2)}
          reportSelected={this.props.reportSelected}
          reportMouseUp={this.props.reportMouseUp}
          isSelected={this.isSelected(2)}
          events={this.props.events}
        >
          {this.day(2)}
        </DayCell>
        <DayCell
          className={this.isToday(3)}
          date={this.date(3)}
          reportSelected={this.props.reportSelected}
          reportMouseUp={this.props.reportMouseUp}
          isSelected={this.isSelected(3)}
          events={this.props.events}
        >
          {this.day(3)}
        </DayCell>
        <DayCell
          className={this.isToday(4)}
          date={this.date(4)}
          reportSelected={this.props.reportSelected}
          reportMouseUp={this.props.reportMouseUp}
          isSelected={this.isSelected(4)}
          events={this.props.events}
        >
          {this.day(4)}
        </DayCell>
        <DayCell
          className={this.isToday(5)}
          date={this.date(5)}
          reportSelected={this.props.reportSelected}
          reportMouseUp={this.props.reportMouseUp}
          isSelected={this.isSelected(5)}
          events={this.props.events}
        >
          {this.day(5)}
        </DayCell>
        <DayCell
          className={this.isToday(6)}
          date={this.date(6)}
          reportSelected={this.props.reportSelected}
          reportMouseUp={this.props.reportMouseUp}
          isSelected={this.isSelected(6)}
          events={this.props.events}
        >
          {this.day(6)}
        </DayCell>
      </tr>
    );
  }
}
