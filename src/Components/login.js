import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./login.styles.scss";

class Login extends React.Component {
	state = {
		showHide: false,
		email: "",
		password: "",
	};

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

	handleLoginModalShowHide() {
		this.setState({ showHide: !this.state.showHide });
	}

	render() {
		return (
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
							{/* <img src={App} width="40" height="30" className="img" alt="" /> */}
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
									onChange={this.emailHandler}
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
									onChange={this.passwordHandler}
									value={this.state.password}
								/>
							</div>

							<p className="text-center" style={{ color: "black" }}>
								Don't have an account?
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
		);
	}
}

export default Login;
