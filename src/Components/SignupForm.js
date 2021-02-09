import React from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import * as actions from "../store/actions/auth";
import Loading from "./Loading";

const SignupForm = (props) => {
	const handleFormSubmit = (event) => {
		event.preventDefault();
		const username = event.target.elements.username.value;
		const email = event.target.elements.email.value;
		const password1 = event.target.elements.password1.value;
		const password2 = event.target.elements.password2.value;
		props.onAuth(username, email, password1, password2);
	};
	const { redirect, isLoading, signupError } = props;
	return (
		<>
			{redirect === true && <Redirect to="/email-sent" />}
			{isLoading === true ? (
				<Loading />
			) : (
				<form className="p-3" onSubmit={handleFormSubmit}>
					{signupError && (
						<div className="text-center text-danger">{signupError.message}</div>
					)}
					<div className="form-group">
						<label htmlFor="InputEmail1">Username</label>
						<input
							type="text"
							name="username"
							className="form-control form-control-sm"
							id="Inputusername"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="InputEmail1">email</label>
						<input
							type="email"
							name="email"
							className="form-control form-control-sm"
							id="InputEmail1"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="InputPassword1">Password</label>
						<input
							type="password"
							name="password1"
							className="form-control form-control-sm"
							id="InputPassword1"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="InputPassword2">Password</label>
						<input
							type="password"
							name="password2"
							className="form-control form-control-sm"
							id="InputPassword2"
						/>
					</div>
					<button type="submit" className="btn btn-dark">
						Signup
					</button>
					or
					<NavLink to="/login/"> Login</NavLink>
				</form>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.isLoading,
		signupError: state.error,
		redirect: state.redirect,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (username, email, password1, password2) =>
			dispatch(actions.authSignup(username, email, password1, password2)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
