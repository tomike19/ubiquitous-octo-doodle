import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/businessRedux";
import { Link } from "react-router-dom";
import { Media, Card } from "react-bootstrap";
import Loading from "./Loading";
import BusinessList from "./BusinessList";

export class FilterResult extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { isLoading } = this.props;
		return (
			<>
				{isLoading === true ? (
					<Loading />
				) : results.length === 0 ? (
					<>
						{emptyMessage ? (
							<div className="text-center">{emptyMessage}</div>
						) : (
							<>
								{this.props.businesses.map((business) => (
									<BusinessList business={business} key={business.pk} />
								))}
							</>
						)}
					</>
				) : (
					results.map((result) => (
						<Card className="mb-2 shadow-sm" key={result.pk}>
							<Media as="li">
								<Link
									to={"business/" + result.slug}
									style={{ textDecoration: "none" }}
									className="text-dark"
								>
									<img
										width={100}
										height={100}
										className="align-self-center mr-3 ml-1 my-1"
										src={result.picture}
										alt={result.business_name}
									/>
								</Link>
								<Media.Body>
									<Link
										to={"business/" + result.slug}
										style={{ textDecoration: "none" }}
										className="text-dark"
									>
										<b>
											{result.business_name}
											{result.is_verified === true && (
												<i className="fas fa-check-circle text-success mx-1"></i>
											)}
										</b>
										<p>
											<span className="mx-1">{result.category_name}</span>•
											<span className="mx-1">{result.location_city}</span>
										</p>
									</Link>
									<p>
										<a
											href={"https://wa.me/" + result.whatsapp_number}
											target="blank"
											className="mx-2"
										>
											<i className="fab fa-whatsapp text-dark"></i>
										</a>
										<a
											href={"mailto:" + result.email_address}
											target="blank"
											className="mx-2"
										>
											<i className="fas fa-envelope text-dark"></i>
										</a>
										<a
											href={"tel:" + result.phone_number}
											target="blank"
											className="mx-2"
										>
											<i className="fas fa-phone text-dark"></i>
										</a>
									</p>
								</Media.Body>
							</Media>
						</Card>
					))
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		businesses: state.businesses,
		isLoading: state.isLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchbisinesses: () => dispatch(actions.fetchBusinesses()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterResult);
