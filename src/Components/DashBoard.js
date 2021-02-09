import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import axios from "axios";
import * as actions from "../store/actions/businessRedux";

class DashBoard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {},
		};
	}

	componentDidMount() {
		this.props.fetchbisinesses();
		const userToken = localStorage.getItem("token");
		axios
			.get(`${process.env.REACT_APP_API_URL}/rest-auth/user/`, {
				headers: { Authorization: `Token  ${userToken}` },
			})
			.then((res) => {
				this.setState({
					user: res.data,
				});
			})
			.catch((Error) => {
				console.log(Error);
			});
	}
	render() {
		const { businesses } = this.props;
		return (
			<div className="p-3">
				{this.props.isAuthenticated ? (
					<>
						<img
							src={this.state.user.profile_picture}
							alt="profile"
							height="50"
							width="50"
						/>
						<p>
							Hello {this.state.user.username}
							<br />
							{/* {this.state.user.about} */}
						</p>
					</>
				) : (
					<Redirect to="/login" />
				)}
				<Link
					to="/business-form"
					className="text-dark"
					style={{ textDecoration: "none" }}
				>
					<i className="fas fa-plus"></i> Create Business
				</Link>
				<table className="table table-responsive">
					<tbody>
						{businesses
							.filter(
								(business) =>
									business.user.username === this.state.user.username
							)
							.map((business) => (
								<tr key={business.pk}>
									<td>
										<Link
											to={`/business/${business.slug}`}
											className="text-dark"
											style={{ textDecoration: "none" }}
											onClick={() => {
												this.props.fetchbisiness();
											}}
										>
											<img
												src={business.picture}
												alt={business.business_name}
												height="20"
												width="20"
											/>
										</Link>
									</td>
									<td>
										<Link
											to={`/business/${business.slug}`}
											className="text-dark"
											style={{ textDecoration: "none" }}
											onClick={() => {
												this.props.fetchbisiness();
											}}
										>
											{business.business_name}
										</Link>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.token !== null,
		token: state.token,
		businesses: state.businesses,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchbisinesses: () => dispatch(actions.fetchBusinesses()),
		fetchbisiness: () => dispatch(actions.fetchBusiness()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
