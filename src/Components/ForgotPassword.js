import React, { Component } from "react";
import axios from "axios";

export class ForgotPassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			success: "",
			fail: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		const endPoint = `${process.env.REACT_APP_API_URL}`;
		event.preventDefault();
		const email = this.state.email;
		axios
			.post(`${endPoint}/rest-auth/password/reset/`, {
				email,
			})
			.then((res) => {
				console.log(res);
				this.setState({
					success: res.data.detail,
				});
			})
			.catch((error) => {
				this.setState({
					fail: error.name,
				});
			});
	}

	render() {
		const { success, fail } = this.state;
		return (
			<>
				{success && success}
				{fail && `${fail} check the email and try again`}
				<form onSubmit={this.handleSubmit}>
					<div>Email</div>
					<input
						name="email"
						type="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
				</form>
			</>
		);
	}
}

export default ForgotPassword;
