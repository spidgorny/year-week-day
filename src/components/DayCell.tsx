import React, {MouseEventHandler} from "react";
import moment from "moment";

interface IDayCellProps {
	className: string;
	date: moment.Moment;
	reportSelected: Function;
	reportMouseUp: Function;
	isSelected?: boolean;
}

interface IDayCellState {
}

export class DayCell extends React.Component<IDayCellProps, IDayCellState> {

	state = {
	};

	constructor(props) {
		super(props);
	}

	componentDidMount(): void {
	}

	render() {
		return (
			<td className={this.props.className}
				onMouseDown={this._onMouseDown.bind(this) as unknown as MouseEventHandler}
				onMouseEnter={this._onMouseEnter.bind(this) as unknown as MouseEventHandler}
				onMouseUp={this._onMouseUp.bind(this) as unknown as MouseEventHandler}
			>
				{this.props.children}
				{this.props.isSelected ? 'YES' : ''}
			</td>
		)
	}

	_onMouseDown(e: MouseEvent) {
		e.preventDefault();
		this.setState(state => ({
			...state,
			mouseDown: true,
		}));
		this.props.reportSelected(this.props.date);
	}

	/**
	 * On document element mouse up
	 */
	_onMouseUp(e: MouseEvent) {
		e.preventDefault();
		this.setState(state => ({
			...state,
			mouseDown: false,
		}));
		this.props.reportMouseUp(this.props.date);
	}

	/**
	 * On document element mouse move
	 */
	_onMouseEnter(e: MouseEvent) {
		e.preventDefault();
		if (e.buttons !== 1) {
			return;
		}
		this.props.reportSelected(this.props.date);
	}

}
