import React, {MouseEventHandler} from "react";
import moment from "moment";
import {IEvent} from "./TBodySelection";

interface IDayCellProps {
	className: string;
	date: moment.Moment;
	reportSelected: Function;
	reportMouseUp: Function;
	isSelected?: boolean;
	events: IEvent[];
}

interface IDayCellState {
}

export class DayCell extends React.Component<IDayCellProps, IDayCellState> {

	eventNames: string[] = [];

	get classNames() {
		const classes: string[] = [];
		classes.push(this.props.className);
		classes.push(this.props.isSelected ? ' selected' : '');

		this.eventNames = [];
		this.props.events.map((event: IEvent) => {
			const start = moment(event.startDate);
			const end = moment(event.endDate);
			if (this.props.date.isSame(start) || this.props.date.isBetween(start, end) || this.props.date.isSame(end)) {
				classes.push('event-' + event.id);
				this.eventNames.push(event.name);
			}
			return true;
		});

		return classes.join(' ');
	}

	render() {
		return (
			<td className={this.classNames}
				onMouseDown={this._onMouseDown.bind(this) as unknown as MouseEventHandler}
				onMouseEnter={this._onMouseEnter.bind(this) as unknown as MouseEventHandler}
				onMouseUp={this._onMouseUp.bind(this) as unknown as MouseEventHandler}
			>
				{this.props.children} &nbsp;
				{this.eventNames.join(' ')}
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
