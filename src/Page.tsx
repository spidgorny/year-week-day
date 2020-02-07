import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Generator} from "./model/generator";
import Table from "react-bootstrap/Table";
import {TBodySelection} from "./components/TBodySelection";

export class Page extends React.Component<any, any> {

	generator = new Generator(2020);

	state = {
		weeks: [],
	};

	componentDidMount(): void {
		let weeks = this.generator.weeks;
		this.setState(() => ({
			weeks: weeks,
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
						<TBodySelection weeks={this.state.weeks}>
						</TBodySelection>
					</Table>
				</Container>
			</>
		);
	}

}
