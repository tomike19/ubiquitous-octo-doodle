import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../actions/utility";

const initialState = {
	token: null,
	redirect: false,
	error: null,
	isLoading: false,
	businesses: [],
	business: {},
	reviews: [],
	favorite: 0,
	user: {},
};

const authStart = (state, action) => {
	return updateObject(state, {
		error: null,
		isLoading: true,
	});
};

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.token,
		error: null,
		isLoading: false,
		redirect: true,
	});
};

const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		isLoading: false,
	});
};

const authLogout = (state, action) => {
	return updateObject(state, {
		token: null,
		redirect: false,
	});
};

const fetchStart = (state, action) => {
	return updateObject(state, {
		error: null,
		isLoading: true,
	});
};

const fetchBusinessesSuccess = (state, action) => {
	return updateObject(state, {
		businesses: action.businesses,
		error: null,
		isLoading: false,
	});
};

const fetchToken = (state, action) => {
	return updateObject(state, {
		Authorization: action.token,
	});
};

const favoriteBusiness = (state, action) => {
	return updateObject(state, {
		favorite: action.favorite,
	});
};

const fetchBusinessSuccess = (state, action) => {
	return updateObject(state, {
		business: action.business,
		reviews: action.reviews,
		error: null,
		isLoading: false,
	});
};

const fetchFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		isLoading: false,
	});
};

const createBusinessStart = (state, action) => {
	return updateObject(state, {
		error: null,
		isLoading: true,
	});
};

const createBusinessSuccess = (state, action) => {
	return updateObject(state, {
		business: action.business,
		reviews: action.reviews,
		error: null,
		isLoading: false,
	});
};

const createBusinessFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		isLoading: false,
	});
};

const getUserStart = (state, action) => {
	return updateObject(state, {
		error: null,
		isLoading: true,
	});
};

const getUserSuccess = (state, action) => {
	return updateObject(state, {
		user: action.user,
		isLoading: false,
	});
};

const getUserFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		isLoading: false,
	});
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.FETCH_START:
			return fetchStart(state, action);
		case actionTypes.FETCH_BUSINESSES_SUCCESS:
			return fetchBusinessesSuccess(state, action);
		case actionTypes.FETCH_BUSINESS_SUCCESS:
			return fetchBusinessSuccess(state, action);
		case actionTypes.FETCH_FAIL:
			return fetchFail(state, action);
		case actionTypes.FETCH_TOKEN:
			return fetchToken(state, action);
		case actionTypes.FAVORITE_BUSINESS:
			return favoriteBusiness(state, action);
		case actionTypes.CREATE_BUSINESS_START:
			return createBusinessStart(state, action);
		case actionTypes.CREATE_BUSINESS_SUCCESS:
			return createBusinessSuccess(state, action);
		case actionTypes.CREATE_BUSINESS_FAIL:
			return createBusinessFail(state, action);
		case actionTypes.GET_USER_START:
			return getUserStart(state, action);
		case actionTypes.GET_USER_SUCCESS:
			return getUserSuccess(state, action);
		case actionTypes.GET_USER_FAIL:
			return getUserFail(state, action);
		default:
			return state;
	}
};

export default reducer;
