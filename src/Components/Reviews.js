import React from "react";

const Reviews = (props) => {
	const reviews = props.reviews;
	return reviews.map((review) => (
		<div className="p-3" key={review.id}>
			<div className="card m-0">
				<div className="card-body">
					<small className="card-title">{review.username}</small>
					<p className="card-title">{review.rate}</p>
					<p className="card-text">{review.review}</p>
				</div>
			</div>
		</div>
	));
};

export default Reviews;
