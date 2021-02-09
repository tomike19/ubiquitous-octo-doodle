import * as actionTypes from "./actionTypes";
import axios from "axios";

const endPoint = `${process.env.REACT_APP_API_URL}`;

export const fetchStart = () => {
	return {
		type: actionTypes.FETCH_START,
	};
};

export const createBusinessStart = () => {
	return {
		type: actionTypes.CREATE_BUSINESS_START,
	};
};

export const fetchBusinessesSuccess = (businesses) => {
	return {
		type: actionTypes.FETCH_BUSINESSES_SUCCESS,
		businesses: businesses,
	};
};

export const fetchBusinessSuccess = (business, reviews) => {
	return {
		type: actionTypes.FETCH_BUSINESS_SUCCESS,
		business: business,
		reviews: reviews,
	};
};

export const createBusinessSuccess = () => {
	return {
		type: actionTypes.CREATE_BUSINESS_SUCCESS,
	};
};

export const fetchFail = (error) => {
	return {
		type: actionTypes.FETCH_FAIL,
		error: error,
	};
};
export const createBusinessFail = (error) => {
	return {
		type: actionTypes.CREATE_BUSINESS_FAIL,
		error: error,
	};
};

export const fetchBusinesses = () => {
	return (dispatch) => {
		dispatch(fetchStart());
		axios
			.get(`${endPoint}/business/`)
			.then((res) => {
				const businesses = res.data;
				dispatch(fetchBusinessesSuccess(businesses));
			})
			.catch((error) => dispatch(fetchFail(error)));
	};
};

export const fetchBusiness = () => {
	return (dispatch) => {
		dispatch(fetchStart());
		axios
			.get(`${endPoint}/business${window.location.pathname}`)
			.then((res) => {
				const business = res.data;
				const reviews = business.review_set;
				dispatch(fetchBusinessSuccess(business, reviews));
			})
			.catch((error) => {
				dispatch(fetchFail(error));
			});
	};
};

export const addBusiness = (
	owner,
	business_name,
	email_address,
	phone_number,
	whatsapp_number,
	description,
	category,
	location,
	address,
	picture
) => {
	return (dispatch) => {
		dispatch(createBusinessStart());
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("owner", owner);
		formData.append("business_name", business_name);
		formData.append("email_address", email_address);
		formData.append("phone_number", phone_number);
		formData.append("whatsapp_number", whatsapp_number);
		formData.append("description", description);
		formData.append("category", category);
		formData.append("location", location);
		formData.append("address", address);
		picture && formData.append("picture", picture, picture.name);

		axios
			.post(`${endPoint}/business/`, formData, {
				headers: {
					Authorization: `Token ${token}`,
					"content-type": "multipart/form-data",
				},
			})
			.then((res) => {
				console.log(res.data);
				dispatch(fetchBusinesses());
				window.location.replace("/dashboard");
			})
			.catch((error) => {
				console.log(error);
				dispatch(createBusinessFail(error));
			});
	};
};
