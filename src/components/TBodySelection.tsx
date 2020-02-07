import React from "react";
import moment from "moment";
import {WeekRow} from "./WeekRow";
import Dexie from 'dexie';

export interface IEvent {
	id?: number;
	name: string;
	startDate: moment.Moment;
	endDate: moment.Moment;
}

interface ITBodySelectionProps {
	weeks: moment.Moment[];
}

interface ITBodySelectionState {
	minDate: moment.Moment | null;
	maxDate: moment.Moment | null;
	events: IEvent[];
}

export class TBodySelection extends React.Component<ITBodySelectionProps, ITBodySelectionState> {

	state = {
		minDate: null,
		maxDate: null,
		events: [],
	};

	db = new Dexie("Year-Week-Day");

	constructor(props) {
		super(props);
		this.db.version(1).stores({
			events: "++id,name,startDate,endDate"
		});
	}

	componentDidMount(): void {
		this.fetchData();
	}

	async fetchData() {
		const events = await this.db.table('events').toArray();
		console.log(events);
		this.setState((state) => ({
			...state,
			events: events,
		}))
	}

	reportSelected(date: moment.Moment) {
		// console.log(date.format('YYYY-MM-DD'));
		if (!this.state || !this.state.minDate || !this.state.maxDate) {
			this.setState((state) => ({
				...state,
				minDate: date.clone(),
				maxDate: date.clone(),
			}));
			return;
		}

		this.setState((state) => ({
			...state,
			maxDate: date.clone(),
		}));
	}

	async reportMouseUp(date: moment.Moment) {
		if (!this.state.minDate || !this.state.maxDate) {
			return;
		}
		let min = this.state.minDate as unknown as moment.Moment;
		let max = this.state.maxDate as unknown as moment.Moment;
		const name = prompt(`What happens between ${min.format('YYYY-MM-DD')} and ${max.format('YYYY-MM-DD')}?`);
		if (name) {
			await this.db.table('events').put({
				name,
				startDate: min.format('YYYY-MM-DD'),
				endDate: max.format('YYYY-MM-DD'),
			});
			this.fetchData();	// update
		}
		this.setState((state) => ({
			...state,
			minDate: null,
			maxDate: null,
		}));
	}

	render() {
		return (
			<tbody>
			{this.props.weeks.map((monday: moment.Moment) => (
				<WeekRow key={monday.format('YYYY-MM-DD')}
						 monday={monday}
						 reportSelected={this.reportSelected.bind(this)}
						 reportMouseUp={this.reportMouseUp.bind(this)}
						 minSelected={this.state.minDate}
						 maxSelected={this.state.maxDate}
						 events={this.state.events}
				/>
			))}
			</tbody>
		)
	}

}
