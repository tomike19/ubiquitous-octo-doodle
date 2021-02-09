import React, { Component } from "react";
import { connect } from "react-redux";
import * as businessactions from "../store/actions/businessRedux";
import * as authactions from "../store/actions/auth";
import Loading from "./Loading";
import Error from "./Error";
import Locations from "./Locations";
import Categories from "./Categories";

class BusinessForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user_id: "",
			business_name: "",
			email_address: "",
			phone_number: "",
			whatsapp_number: "",
			description: "",
			category: "",
			location: "",
			address: "",
			picture: undefined,
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	handlePicChange = (event) => {
		this.setState({
			picture: event.target.files[0],
		});
	};

	handleBusinessCreate = (event) => {
		const {
			business_name,
			email_address,
			phone_number,
			whatsapp_number,
			description,
			category,
			location,
			address,
			picture,
		} = this.state;
		event.preventDefault();
		this.props.addBusiness(
			localStorage.getItem("pk"),
			business_name,
			email_address,
			phone_number,
			whatsapp_number,
			description,
			category,
			location,
			address,
			picture
		);
	};
	componentDidMount() {
		const user_id = localStorage.getItem("pk");
		this.props.fetchbisinesses();
		this.setState({
			user_id: user_id,
		});
		console.log(this.state.user_id);
	}

	render() {
		const {
			user_id,
			business_name,
			email_address,
			phone_number,
			whatsapp_number,
			description,
			address,
		} = this.state;
		const { error, isLoading, businesses } = this.props;
		let businessAddLimit = 5;
		return (
			<>
				{isLoading === true ? (
					<Loading />
				) : businesses.filter(
						(user_business) =>
							user_business.owner.toString() === user_id.toString()
				  ).length >= businessAddLimit ? (
					<div className="text-center text-danger">
						User can not have more than {businessAddLimit} businesses!
					</div>
				) : (
					<div className="p-5">
						<>
							{error && <Error error={error.message} />}
							<form onSubmit={this.handleBusinessCreate}>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="inputBusinessName">Business Name</label>
										<input
											maxLength="50"
											type="text"
											name="business_name"
											value={business_name}
											onChange={this.handleChange}
											className="form-control"
											id="inputBusinessName"
											required
										/>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="inputEmail4">Email</label>
										<input
											type="email"
											name="email_address"
											value={email_address}
											onChange={this.handleChange}
											className="form-control"
											id="inputEmail4"
											required
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="inputPhoneNumber">Phone Number</label>
										<input
											maxLength="14"
											type="phonenumber"
											name="phone_number"
											value={phone_number}
											onChange={this.handleChange}
											className="form-control"
											id="inputPhoneNumber"
											required
										/>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="inputWhatsappNumber">Whatsapp Number</label>
										<input
											maxLength="14"
											type="phonenumber"
											name="whatsapp_number"
											value={whatsapp_number}
											onChange={this.handleChange}
											className="form-control"
											id="inputWhatsappNumber"
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="inputState">State</label>
										<select
											name="state"
											id="inputState"
											className="form-control"
											required
										>
											<option>Lagos</option>
											<option>Ibadan</option>
										</select>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="inputCity">City</label>
										<select
											name="location"
											onChange={this.handleChange}
											id="inputCity"
											className="form-control"
											required
										>
											<Locations />
										</select>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<label htmlFor="inputAddress">Address</label>
										<input
											maxLength="100"
											type="text"
											name="address"
											value={address}
											onChange={this.handleChange}
											className="form-control"
											id="inputAddress"
											placeholder="1234 Main St"
											required
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<label htmlFor="inputCategory">Category</label>
										<select
											name="category"
											onChange={this.handleChange}
											id="inputCategory"
											className="form-control"
											required
										>
											<Categories />
										</select>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<label htmlFor="inputDescription">Description</label>
										<textarea
											maxLength="200"
											type="text"
											name="description"
											value={description}
											onChange={this.handleChange}
											className="form-control"
											id="inputDescription"
										/>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="FormControlPicture">Picture</label>
									<input
										type="file"
										name="picture"
										accept="image/*"
										onChange={this.handlePicChange}
										className="form-control-file"
										id="FormControlPicture"
									/>
								</div>

								<button type="submit" className="btn btn-dark col-12">
									Create Business
								</button>
							</form>
						</>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		businesses: state.businesses,
		isLoading: state.isLoading,
		error: state.error,
		redirect: state.redirect,
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchbisinesses: () => dispatch(businessactions.fetchBusinesses()),
		getUser: (userToken) => dispatch(authactions.getUser(userToken)),
		addBusiness: (
			owner,
			business_name,
			email_address,
			phone_number,
			whatsapp_number,
			location,
			address,
			category,
			description,
			picture
		) =>
			dispatch(
				businessactions.addBusiness(
					owner,
					business_name,
					email_address,
					phone_number,
					whatsapp_number,
					location,
					address,
					category,
					description,
					picture
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessForm);
