import React from "react";
import moment from "moment";

interface IDayCellProps {
	className: string;
	date?: moment.Moment;
	reportRef: Function;
}

interface IDayCellState {
	isSelected: boolean;
}

export class DayCell extends React.Component<IDayCellProps, IDayCellState> {

	state = {
		isSelected: false,
	};

	myRef: any;

	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	componentDidMount(): void {
		this.props.reportRef(this);
	}

	render() {
		return (
			<td className={this.props.className} ref={this.myRef}>
				{this.props.children}
				{this.state.isSelected ? 'YES' : ''}
			</td>
		)
	}

}
