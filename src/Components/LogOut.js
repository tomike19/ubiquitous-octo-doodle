import React from "react";
import { Redirect } from "react-router-dom";

function LogOut() {
	return (
		<div>
			<Redirect to="/login" />
		</div>
	);
}

export default LogOut;
