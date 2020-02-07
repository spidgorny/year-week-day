import React from "react";
import moment from "moment";

interface IWeekRowProps {
	monday: moment.Moment;
}

export class WeekRow extends React.Component<IWeekRowProps, {}> {

	isToday(plus: number) {
		const today = moment();
		let dayOfTheWeek = this.props.monday.clone().add(plus,  'd');
		if (dayOfTheWeek.isSame(today, 'day')) {
			return 'bg-success';
		}
		return '';
	}

	render() {
		return (
			<tr>
				<td className={this.isToday(0)}>
					#{this.props.monday.format('ww')}
				</td>
				<td className={this.isToday(1)}>

				</td>
				<td className={this.isToday(2)}>

				</td>
				<td className={this.isToday(3)}>

				</td>
				<td className={this.isToday(4)}>

				</td>
				<td className={this.isToday(5)}>

				</td>
				<td className={'weekend ' + this.isToday(6)}>

				</td>
				<td className={'weekend ' + this.isToday(7)}>

				</td>
			</tr>
		);
	}

}
