import React from "react";
import moment from "moment";
import {DayCell} from "./DayCell";

interface IWeekRowProps {
	monday: moment.Moment;
	reportSelected: Function;
	reportMouseUp: Function;
	minSelected: moment.Moment | null;
	maxSelected: moment.Moment | null;
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
		let dayOfTheWeek = this.props.monday.clone().add(plus, 'd');
		return dayOfTheWeek.format('DD');
	}

	date(plus: number) {
		let dayOfTheWeek = this.props.monday.clone().add(plus, 'd');
		return dayOfTheWeek;
	}

	isSelected(plus: number) {
		if (!this.props.minSelected || !this.props.maxSelected) {
			return false;
		}
		let dayOfTheWeek = this.props.monday.clone().add(plus, 'd');
		let between = dayOfTheWeek.isBetween(this.props.minSelected, this.props.maxSelected, 'day');
		return dayOfTheWeek.isSame(this.props.minSelected) || between || dayOfTheWeek.isSame(this.props.maxSelected);
	}

	render() {
		return (
			<tr>
				<td className={'weekNumber ' + this.isCurrentWeek}>
					#{this.props.monday.format('ww')}
				</td>
				<DayCell className={this.isToday(0)}
						 date={this.date(0)}
						 reportSelected={this.props.reportSelected}
						 reportMouseUp={this.props.reportMouseUp}
						 isSelected={this.isSelected(0)}
				>
					{this.day(0)}
				</DayCell>
				<DayCell className={this.isToday(1)}
						 date={this.date(1)}
						 reportSelected={this.props.reportSelected}
						 reportMouseUp={this.props.reportMouseUp}
						 isSelected={this.isSelected(1)}
				>
					{this.day(1)}
				</DayCell>
				<DayCell className={this.isToday(2)}
						 date={this.date(2)}
						 reportSelected={this.props.reportSelected}
						 reportMouseUp={this.props.reportMouseUp}
						 isSelected={this.isSelected(2)}
				>
					{this.day(2)}
				</DayCell>
				<DayCell className={this.isToday(3)}
						 date={this.date(3)}
						 reportSelected={this.props.reportSelected}
						 reportMouseUp={this.props.reportMouseUp}
						 isSelected={this.isSelected(3)}
				>
					{this.day(3)}
				</DayCell>
				<DayCell className={this.isToday(4)}
						 date={this.date(4)}
						 reportSelected={this.props.reportSelected}
						 reportMouseUp={this.props.reportMouseUp}
						 isSelected={this.isSelected(4)}
				>
					{this.day(4)}
				</DayCell>
				<DayCell className={'weekend ' + this.isToday(5)}
						 date={this.date(5)}
						 reportSelected={this.props.reportSelected}
						 reportMouseUp={this.props.reportMouseUp}
						 isSelected={this.isSelected(5)}
				>
					{this.day(5)}
				</DayCell>
				<DayCell className={'weekend ' + this.isToday(6)}
						 date={this.date(6)}
						 reportSelected={this.props.reportSelected}
						 reportMouseUp={this.props.reportMouseUp}
						 isSelected={this.isSelected(6)}
				>
					{this.day(6)}
				</DayCell>
			</tr>
		);
	}

}
