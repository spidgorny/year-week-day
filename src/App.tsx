import React from 'react';
import './css/App.css';
import {Button, Alert} from 'react-bootstrap';

const App = () => {
	return (
		<>
			<Button>asdf</Button>
			<Alert dismissible variant="danger">
				<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
				<p>
					Change this and that and try again.
				</p>
			</Alert>
		</>
	);
};

export default App;

