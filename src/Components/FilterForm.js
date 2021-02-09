import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Media, Card } from "react-bootstrap";
import Loading from "./Loading";
import Select from "react-select";

export class FilterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			business_name: "",
			category: 0,
			location: 0,
			categoryOptions: [],
			locationOptions: [],
			results: [],
			isLoading: false,
			emptyMessage: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getCategory = this.getCategory.bind(this);
		this.getLocation = this.getLocation.bind(this);
	}

	async getCategory() {
		axios.get(`${process.env.REACT_APP_API_URL}/category/`).then((res) => {
			const data = res.data;
			const categories = data;

			const options = categories.map((category) => ({
				value: category.id,
				label: category.name,
			}));
			this.setState({
				categoryOptions: options,
			});
		});
	}

	async getLocation() {
		let data;
		axios.get(`${process.env.REACT_APP_API_URL}/location/`).then((res) => {
			data = res.data;
			const locations = data;

			const options = locations.map((location) => ({
				value: location.location_id,
				label: location.city,
			}));
			this.setState({
				locationOptions: options,
			});
		});
	}

	componentDidMount() {
		this.getCategory();
		this.getLocation();
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleCategoryChange = (e) => {
		this.setState({
			category: e.value,
		});
	};
	handleLocationChange = (e) => {
		this.setState({
			location: e.value,
		});
	};

	handleSubmit(e) {
		this.setState({
			isLoading: true,
		});
		axios.get(`${process.env.REACT_APP_API_URL}/business`).then((res) => {
			this.setState({
				results: res.data.filter(
					(result) =>
						(this.state.business_name !== "" &&
							result.business_name
								.toLowerCase()
								.includes(this.state.business_name.toLowerCase())) ||
						(result.location.toString().indexOf(this.state.location) >= 0 &&
							result.category.toString().indexOf(this.state.category) >= 0)
				),
				isLoading: false,
				emptyMessage: "No result found!",
			});
			console.log(this.state.results);
		});
		e.preventDefault();
	}
	render() {
		const {
			categoryOptions,
			locationOptions,
			business_name,
			results,
			isLoading,
			emptyMessage,
		} = this.state;
		return (
			<>
				<form className="col" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input
							name="business_name"
							onChange={this.handleChange}
							value={business_name}
							type="text"
							className="form-control"
							id="business_name"
							aria-describedby="emailHelp"
						/>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6 col-12">
							<label htmlFor="inputCategory">Category</label>
							<Select
								name="category"
								onChange={this.handleCategoryChange}
								options={categoryOptions}
								placeholder="Select Category..."
							/>
						</div>
						<div className="form-group col-md-6 col-12">
							<label htmlFor="inputCity">City</label>
							<Select
								name="location"
								onChange={this.handleLocationChange}
								options={locationOptions}
								placeholder="Select Location..."
							/>
						</div>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-dark col-12">
							Search
						</button>
					</div>
				</form>
				{isLoading === true ? (
					<Loading />
				) : results.length === 0 ? (
					<div className="text-center">{emptyMessage}</div>
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

export default FilterForm;
