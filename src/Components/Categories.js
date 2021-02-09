import React, { Component } from "react";
import axios from "axios";

class Categories extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: [],
			error: "",
		};
	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API_URL}/category/`)
			.then((res) => {
				const categories = res.data;
				this.setState({
					categories: categories,
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
				{this.state.categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</>
		);
	}
}

export default Categories;
