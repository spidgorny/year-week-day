import React from "react";
import moment from "moment";
import {DayCell} from "./DayCell";

interface IWeekRowProps {
	monday: moment.Moment;
	reportRef: Function;
}

export class WeekRow extends React.Component<IWeekRowProps, {}> {

	isToday(plus: number) {
		const classes: string[] = [];
		const today = moment();
		let dayOfTheWeek = this.props.monday.clone().add(plus, 'd');
		if (dayOfTheWeek.isSame(today, 'day')) {
			classes.push('bg-success');
		}

		// month, Jan, Feb
		const month = dayOfTheWeek.locale('en').format('MMM');
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
			<tr>
				<td className={'weekNumber ' + this.isCurrentWeek}>
					#{this.props.monday.format('ww')}
				</td>
				<DayCell className={this.isToday(0)} reportRef={this.props.reportRef}>
					{this.day(0)}
				</DayCell>
				<DayCell className={this.isToday(1)} reportRef={this.props.reportRef}>
					{this.day(1)}
				</DayCell>
				<DayCell className={this.isToday(2)} reportRef={this.props.reportRef}>
					{this.day(2)}
				</DayCell>
				<DayCell className={this.isToday(3)} reportRef={this.props.reportRef}>
					{this.day(3)}
				</DayCell>
				<DayCell className={this.isToday(4)} reportRef={this.props.reportRef}>
					{this.day(4)}
				</DayCell>
				<DayCell className={'weekend ' + this.isToday(5)} reportRef={this.props.reportRef}>
					{this.day(5)}
				</DayCell>
				<DayCell className={'weekend ' + this.isToday(6)} reportRef={this.props.reportRef}>
					{this.day(6)}
				</DayCell>
			</tr>
		);
	}

}
