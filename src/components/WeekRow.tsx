import React from "react";
import moment from "moment";

interface IWeekRowProps {
	monday: moment.Moment;
}

export class WeekRow extends React.Component<IWeekRowProps, {}> {

	isToday(plus: number) {
		const classes: string[] = [];
		const today = moment();
		let dayOfTheWeek = this.props.monday.clone().add(plus,  'd');
		if (dayOfTheWeek.isSame(today, 'day')) {
			classes.push('bg-success');
		}

		// month, Jan, Feb
		const month = dayOfTheWeek.format('MMM');
		classes.push('month-' + month);

		return classes.join(' ');
	}

	get isCurrentWeek() {
		const today = moment();
		if (this.props.monday.isSame(today, 'week')) {
			return 'bg-success';
		}
		return '';
	}

	day(plus: number) {
		let dayOfTheWeek = this.props.monday.clone().add(plus,  'd');
		return dayOfTheWeek.format('DD');
	}

	render() {
		return (
			<>
				<td className={'weekNumber ' + this.isCurrentWeek}>
					#{this.props.monday.format('ww')}
				</td>
				<td className={this.isToday(0)}>
					{this.day(0)}
				</td>
				<td className={this.isToday(1)}>
					{this.day(1)}
				</td>
				<td className={this.isToday(2)}>
					{this.day(2)}
				</td>
				<td className={this.isToday(3)}>
					{this.day(3)}
				</td>
				<td className={this.isToday(4)}>
					{this.day(4)}
				</td>
				<td className={'weekend ' + this.isToday(5)}>
					{this.day(5)}
				</td>
				<td className={'weekend ' + this.isToday(6)}>
					{this.day(6)}
				</td>
			</>
		);
	}

}
