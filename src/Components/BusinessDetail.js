import React from "react";

const BusinessDetail = (props) => {
	const business = props.business;

	return (
		<div className="px-3">
			<div className="card m-0">
				<img
					src={business.picture}
					className="d-flex justify-content-center"
					alt={business.business_name}
					height="100"
					width="100"
				/>
				<img
					src={business.qr_code}
					className="d-flex justify-content-center"
					alt="qrcode"
					height="100"
					width="100"
				/>
				<div className="card-body">
					<h5 className="card-title">
						{business.business_name}
						{business.is_verified === true && (
							<i className="fas fa-check-circle text-success"></i>
						)}
					</h5>
					<p>{business.description}</p>
					<p>
						{business.location_city} - {business.location_state}
					</p>
				</div>
			</div>
		</div>
	);
};

export default BusinessDetail;
