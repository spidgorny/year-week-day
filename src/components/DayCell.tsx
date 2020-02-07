import React from "react";
import moment from "moment";

interface IDayCellProps {
	className: string;
	date?: moment.Moment;
	isSelected?: boolean;
}

export class DayCell extends React.Component<IDayCellProps, {}> {

	render() {
		return (
			<td className={this.props.className}>
				{this.props.children}
				{this.props.isSelected ? 'YES' : ''}
			</td>
		)
	}

}
