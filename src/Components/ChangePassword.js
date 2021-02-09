import React, { Component } from "react";
import axios from "axios";

export class ChangePassword extends Component {
	constructor(props) {
		super(props);

		this.state = {
			old_password: "",
			new_password1: "",
			new_password2: "",
			result: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const endPoint = `${process.env.REACT_APP_API_URL}`;
		const token = localStorage.getItem("token");
		const new_password1 = this.state.new_password1;
		const new_password2 = this.state.new_password2;
		const old_password = this.state.old_password;
		axios
			.post(
				`${endPoint}/rest-auth/password/change/`,
				{
					new_password1,
					new_password2,
					old_password,
				},
				{
					headers: {
						Authorization: `Token ${token}`,
					},
				}
			)
			.then((res) => {
				const result = res.data;
				this.setState({
					result: result.detail,
				});
			})
			.catch((error) => {
				this.setState({
					result: error.name,
				});
			});
	}

	render() {
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<label>Old password</label>
					<input
						type="password"
						name="old_password"
						value={this.state.old_password}
						onChange={this.handleChange}
					/>
					<label>New password</label>
					<input
						type="password"
						name="new_password1"
						value={this.state.new_password1}
						onChange={this.handleChange}
					/>
					<label>Confirm new password</label>
					<input
						type="password"
						name="new_password2"
						value={this.state.new_password2}
						onChange={this.handleChange}
					/>
					<button type="submit" className="btn btn-primary">
						Change
					</button>
				</form>
				{this.state.result}
			</>
		);
	}
}

export default ChangePassword;
