import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import App from "../Components/img/App.png";
import * as actions from "../store/actions/auth";
import Loading from "./Loading";
import Signup from "../Components/SignupForm";

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

	handleLoginModalShowHide() {
		this.setState({ showHide: !this.state.showHide });
	}

	render() {
		const { redirect, isLoading, loginError } = this.props;
		return (
			<>
				{redirect === true && <Redirect to="/dashboard/" />}
				{isLoading === true ? (
					<Loading />
				) : (
						<div className="login">
				<Button
					variant="Light"
					className="button"
					onClick={() => this.handleLoginModalShowHide()}
				>
					Login
				</Button>

				<Modal show={this.state.showHide}>
					<Modal.Header
						closeButton
						onClick={() => this.handleLoginModalShowHide()}
					>
						<Modal.Title>
							{" "}
							<img src={App} width="40" height="30" className="img" alt="" />
							<br />
							<span className="text mb-5">Appwitme</span>
						</Modal.Title>
					</Modal.Header>

					<Modal.Body className="body">
						<p className="text-center">Login to your account to continue</p>
						<form>
							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text" id="inputGroup-sizing-sm">
										<i class="fa fa-envelope"></i>
									</span>
								</div>
								<input
									type="text"
									class="form-control"
									placeholder="Email"
									aria-label="Email"
									onChange={this.handleChange}
									value={this.state.email}
									aria-describedby="basic-addon1"
								/>
							</div>

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text" id="inputGroup-sizing-sm">
										<i class="fa fa-lock"></i>
									</span>
								</div>

								<input
									type="password"
									class="form-control"
									placeholder="Password"
									aria-label="Password"
									aria-describedby="basic-addon1"
									onChange={this.handleChange}
									value={this.state.password}
								/>
							</div>

							<p className="text-center" style={{ color: "black" }}>
								Don't have an account?
								<Signup
									className="Login-signup"
									style={{ backgroundColor: "transparent" }}
									onClick={() => {
										this.handleLoginModalShowHide();
									}}
								/>
							</p>
						</form>
					</Modal.Body>

					<Modal.Footer>
						<div className="col-12 text-center">
							<Button
								variant="success"
								className="submitBtn btn-default"
								onClick={
									(() => this.handleLoginModalShowHide(), this.state.showHide)
								}
							>
								Submit
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			</div>
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
