import React, { Component } from "react";
import axios from "axios";

class Locations extends Component {
	constructor(props) {
		super(props);

		this.state = {
			locations: [],
			error: "",
		};
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API_URL}/location/`)
			.then((res) => {
				const locations = res.data;
				this.setState({
					locations: locations,
				});
			})
			.catch((error) => {
				this.setState({
					error: error,
				});
			});
	}
	render() {
		return (
			<>
				<option value="">Choose...</option>
				{this.state.locations.map((location) => (
					<option key={location.location_id} value={location.location_id}>
						{location.city}
					</option>
				))}
				{this.state.error && this.state.error}
			</>
		);
	}
}

export default Locations;
