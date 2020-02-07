import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Table from "react-bootstrap/Table";
import {WeekRow} from "./components/WeekRow";
import {Generator} from "./model/generator";
import moment from "moment";

export class Page extends React.Component<any, any> {

	generator = new Generator(2020);

	state = {
		weeks: [],
	};

	componentDidMount(): void {
		this.setState(() => ({
			weeks: this.generator.weeks,
		}));
	}

	render() {
		return (
			<>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href=".">Year-Week-Day</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav"/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Container>
					<Table>
						<thead>
						<tr>
							<td>Week #</td>
							<td>Monday</td>
							<td>Tuesday</td>
							<td>Wednesday</td>
							<td>Thursday</td>
							<td>Friday</td>
							<td>Saturday</td>
							<td>Sunday</td>
						</tr>
						</thead>
						<tbody>
						{this.state.weeks.map((monday: moment.Moment) => (
							<WeekRow key={monday.format('YYYY-MM-DD')}
								monday={monday}/>
						))}
						</tbody>
					</Table>
				</Container>
			</>
		);
	}

}
