import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as businessActions from "../store/actions/businessRedux";
import { Navbar, Nav, Button } from "react-bootstrap";
import NavBarStyle from "./NavBar.module.scss";

const NavBar = (props) => {
	return (
		<Navbar bg="light" variant="light" fixed="top" className={NavBarStyle.nav}>
			<Navbar.Brand>
				<NavLink to="/" onClick={props.fetchbisinesses}>
					<img
						src="https://find-blue-collar.s3.us-east-2.amazonaws.com/static/images/logo.png"
						alt="AppWitMe"
						width="30"
						height="30"
						className="d-inline-block align-top mr-2"
					/>
				</NavLink>
				APPWITME
			</Navbar.Brand>
			{props.isAuthenticated ? (
				<Nav className="ml-auto">
					<NavLink to="/dashboard" className="nav-link">
						<i className="fas fa-tachometer-alt text-white"></i> Dashboard
					</NavLink>
					<NavLink
						to="/logout"
						className="nav-link"
						onClick={() => {
							window.location.replace("/");
							props.logout();
						}}
					>
						<i className="fas fa-sign-out-alt"></i> Logout
					</NavLink>
				</Nav>
			) : (
				<Nav className="ml-auto">
					<NavLink className={NavBarStyle.login} to="/login">
						Login
					</NavLink>
					<NavLink className={NavBarStyle.signupLink} to="/signup">
						<Button variant="primary" className={NavBarStyle.signupButton}>
							<span className="text-white">Signup</span>
						</Button>
					</NavLink>
				</Nav>
			)}
		</Navbar>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(authActions.logout()),
		fetchbisinesses: () => dispatch(businessActions.fetchBusinesses()),
	};
};
export default withRouter(connect(null, mapDispatchToProps)(NavBar));
