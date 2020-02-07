import moment from "moment";

export class Generator {

	year: number;

	constructor(year: number) {
		this.year = year;
	}

	get weeks() {
		const weeks: moment.Moment[] = [];
		const nextYear = moment().startOf('year').add(1, 'y');
		// console.log(nextYear.format('YYYY-MM-DD'));

		let day1 = moment().startOf('year');
		do {
			weeks.push(day1.clone());
			day1 = day1.add('1', 'w');
		} while (day1.isBefore(nextYear));
		return weeks;
	}

}
