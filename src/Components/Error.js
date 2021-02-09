import React from "react";

const Error = (props) => {
	return (
		<div className="d-flex justify-content-center text-danger">
			{props.error}
		</div>
	);
};

export default Error;
