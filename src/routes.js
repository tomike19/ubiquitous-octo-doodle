import React from "react";
import { Route, Switch } from "react-router-dom";
import BusinessDetailView from "./Containers/BusinessDetailView";
import NotFound from "./Components/NotFound";
import LogInForm from "./Components/LogInForm";
import SignupForm from "./Components/SignupForm";
import EmailSent from "./Components/EmailSent";
import DashBoard from "./Components/DashBoard";
import BusinessForm from "./Components/BusinessForm";
import LogOut from "./Components/LogOut";
import ForgotPassword from "./Components/ForgotPassword";
import ChangePassword from "./Components/ChangePassword";
import HomeView from "./Components/HomeView";

const BaseRouter = () => (
	<div className="pt-5 mt-5">
		<Switch>
			<Route exact path="/" component={HomeView} />
			<Route path="/logout" component={LogOut} />
			<Route path="/login/" component={LogInForm} />
			<Route path="/signup/" component={SignupForm} />
			<Route path="/email-sent/" component={EmailSent} />
			<Route path="/dashboard/" component={DashBoard} />
			<Route path="/business-form/" component={BusinessForm} />
			<Route path="/:slug" component={BusinessDetailView} />
			<Route path="/forgot-password/" component={ForgotPassword} />
			<Route path="/change-password/" component={ChangePassword} />
			<Route component={NotFound} />
		</Switch>
	</div>
);

export default BaseRouter;
