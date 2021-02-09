import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import BaseRouter from "./routes";
import NavBar from "./Containers/NavBar";
import Layout from "./Containers/Layout";
import * as actions from "./store/actions/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignup();
	}
	render() {
		return (
			<Router>
				<Layout>
					<NavBar {...this.props} />
					<BaseRouter />
				</Layout>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
