import React, { useEffect } from "react";
import { connect } from "react-redux";
import BusinessList from "../Components/BusinessList";
import * as actions from "../store/actions/businessRedux";
import LayoutViewStyle from "./Layout.module.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Layout = (props) => {
	const { fetchbisinesses } = props;
	const history = useHistory();
	useEffect(() => {
		let mounted = true;
		if (mounted) {
			fetchbisinesses();
		}
		return () => (mounted = false);
	}, [fetchbisinesses]);

	const { businesses } = props;
	return (
		<div className="row m-0 p-0">
			<div className="col-3 mt-5 pt-5">
				<div className={LayoutViewStyle.businesslist}>
					<div className={LayoutViewStyle.searchandfilterbar}>
						<div className={LayoutViewStyle.search}>
							<input
								type="text"
								className={LayoutViewStyle.inputBox}
								placeholder="Find business by name"
							/>
						</div>
					</div>
					<div className={LayoutViewStyle.card}>
						{businesses.map((business) => (
							<Link
								key={business.pk}
								to={`/business/${business.slug}`}
								style={{ textDecoration: "none" }}
								className="text-dark mb-1"
								onClick={() => {
									history.push(`/${business.slug}`);
									props.fetchbisiness();
								}}
							>
								<BusinessList business={business} className={LayoutViewStyle} />
							</Link>
						))}
					</div>
				</div>
			</div>
			<div
				className="col-8 offset-1"
				style={{ height: "100vh", position: "relative" }}
			>
				<div className={LayoutViewStyle.container}>{props.children}</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		businesses: state.businesses,
		business: state.business,
		username: state.username,
		isLoading: state.isLoading,
		error: state.error,
		token: state.token,
		favorite: state.favorite,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchbisinesses: () => dispatch(actions.fetchBusinesses()),
		fetchbisiness: () => dispatch(actions.fetchBusiness()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
