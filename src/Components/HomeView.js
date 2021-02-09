import React from "react";
import HomeViewStyle from "./HomeView.module.scss";
import { Carousel } from "react-bootstrap";

const HomeView = (props) => {
	return (
		<div className={HomeViewStyle.businesslist}>
			<Carousel>
				<Carousel.Item interval={1000}>
					<img
						className={HomeViewStyle.image}
						src="https://find-blue-collar.s3.us-east-2.amazonaws.com/media/business/user_2/lakers-creative/banner1.jpg"
						alt="Lakers Creative"
					/>
					<Carousel.Caption>
						<h3>Lakers Creative</h3>
						<p>
							Lakers Creative is the team that is going to help you achieve your
							technological goals.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item interval={500}>
					<img
						className={HomeViewStyle.image}
						src="https://find-blue-collar.s3.us-east-2.amazonaws.com/media/images/Logopit_1580103689932.jpg"
						alt="Third slide"
					/>
					<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img
						className={HomeViewStyle.image}
						src="https://find-blue-collar.s3.us-east-2.amazonaws.com/media/images/234_812_457_7931_20190828_131056.jpg"
						alt="Third slide"
					/>
					<Carousel.Caption>
						<h3>Third slide label</h3>
						<p>
							Praesent commodo cursus magna, vel scelerisque nisl consectetur.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</div>
	);
};

export default HomeView;
