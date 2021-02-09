import React from "react";

const BusinessList = (props) => {
	const business = props.business;
	return (
		<span className="row">
			<span className="col-3">
				<img
					width={100}
					height={100}
					className="rounded-circle"
					src={business.picture}
					alt={business.business_name}
				/>
			</span>
			<span className="col-8 ml-1">
				<p>
					<b>{business.business_name}</b>
					{business.is_verified === true && (
						<i className="fas fa-check-circle text-success mx-1"></i>
					)}
				</p>
				<p>
					<span className="mx-1">{business.category_name}</span>
				</p>
				<p>
					<span className="mx-1">{business.location_city}</span>
				</p>
				<hr />
			</span>
		</span>
	);
};

export default BusinessList;
