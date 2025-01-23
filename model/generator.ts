import moment from "moment";
import "moment/locale/de";

export class Generator {
  year: number;

  constructor(year: number) {
    this.year = year;
    moment.locale("de");
  }

  getWeeksIn() {
    const weeks: moment.Moment[] = [];
    let day1 = moment(this.year).startOf("year").startOf("week");
    const nextYear = day1.clone().add(1, "y");

    do {
      weeks.push(day1.clone());
      day1 = day1.add("1", "w");
    } while (day1.isBefore(nextYear));
    return weeks;
  }
}
