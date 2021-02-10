import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import "./signup.styles.scss";

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			showHide: false,
			email: "",
			password: "",
			passwordConfirmation: "",
		};
	}

	emailHandler = (event) => {
		this.setState({
			email: event.target.value,
		});
	};

	passwordHandler = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	passwordConfirmationHandler = (event) => {
		this.setState({
			passwordConfirmation: event.target.value,
		});
	};

	handleSignupModalShowHide() {
		this.setState({ showHide: !this.state.showHide });
	}

	render() {
		return (
			<div>
				<Button
					variant="success"
					className="signupBtn"
					onClick={() => this.handleSignupModalShowHide()}
				>
					Signup
				</Button>

				<Modal show={this.state.showHide}>
					<Modal.Header
						closeButton
						onClick={() => this.handleSignupModalShowHide()}
					>
						<Modal.Title>
							{" "}
							{/* <img src={App} width="40" height="30" className="img" alt="" /> */}
							<br />
							<span className="text">Appwitme</span>
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p className="text-center">
							Please create an account by filling the details below
						</p>
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
									aria-describedby="basic-addon1"
									value={this.state.email}
									onChange={this.emailHandler}
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
									value={this.state.password}
									onChange={this.passwordHandler}
								/>
							</div>

							<div class="input-group mb-3">
								<div class="input-group-prepend">
									<span class="input-group-text" id="inputGroup-sizing-sm">
										<i class="fa fa-lock"></i>
									</span>
								</div>

								<input
									type="text"
									class="form-control"
									placeholder="Password confirmation"
									aria-label="Password confirmation"
									aria-describedby="basic-addon1"
									value={this.state.passwordConfirmation}
									onChange={this.passwordConfirmationHandler}
								/>
							</div>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<div className="col-12 text-center">
							<p>Already have an account?</p>
							{/* <Login onClick={this.handleSignupModalShowHide()} /> */}
							<Button
								variant="success"
								className="submitBtn btn-default"
								// onClick={() => this.handleSignupModalShowHide()}
							>
								Submit
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default Signup;
