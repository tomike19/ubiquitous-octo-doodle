import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as actions from "../store/actions/auth";
import Loading from "./Loading";

class LogInForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleFormSubmit = (event) => {
		event.preventDefault();
		const { username, password } = this.state;
		this.props.onAuth(username, password);
	};
	render() {
		const { redirect, isLoading, loginError } = this.props;
		return (
			<>
				{redirect === true && <Redirect to="/dashboard/" />}
				{isLoading === true ? (
					<Loading />
				) : (
					<form className="p-3" onSubmit={this.handleFormSubmit}>
						<div className="form-group">
							{loginError && (
								<div className="text-center text-danger">
									{loginError.name}: Incorrect username or password
								</div>
							)}
							<label htmlFor="exampleInputEmail1">Username</label>
							<input
								type="text"
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
								className="form-control form-control-sm"
								id="exampleInputEmail1"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
								className="form-control form-control-sm"
								id="exampleInputPassword1"
							/>
						</div>
						<div className="form-group form-check form-control-sm">
							<input
								type="checkbox"
								name="remember"
								className="form-check-input"
								id="exampleCheck1"
							/>
							<label className="form-check-label" htmlFor="exampleCheck1">
								Remember me
							</label>
						</div>
						<button type="submit" className="btn btn-dark">
							Login
						</button>{" "}
						or
						<NavLink to="/signup/"> Signup</NavLink>
					</form>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoading: state.isLoading,
		loginError: state.error,
		redirect: state.redirect,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (username, password) =>
			dispatch(actions.authLogin(username, password)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);
