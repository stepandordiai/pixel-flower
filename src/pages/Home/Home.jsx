import { Helmet } from "react-helmet-async";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import Templates from "../../components/Templates/Templates";
import QA from "../../components/QA/QA";
import { HashLink } from "react-router-hash-link";
import Packages from "../../components/Packages/Packages";
import Socials from "../../components/Socials/Socials";
import img1 from "/iphone.png";
import img2 from "/iphone-2.png";
import img3 from "/iphone-3.png";
import img4 from "/iphone-4.png";
import img5 from "/iphone-5.png";
import img6 from "/iphone-6.png";
import img7 from "/iphone-7.png";
import img8 from "/iphone-8.png";
import img9 from "/iphone-9.png";
import img10 from "/iphone-10.png";
import img11 from "/iphone-11.png";
import img12 from "/iphone-12.png";
import "./Home.scss";

const sliderImgData = [
	[img1, img2, img3],
	[img4, img5, img6],
	[img7, img8, img9],
	[img10, img11, img12],
];

const Home = () => {
	const [showLoadedImg, setShowLoadedImg] = useState({});

	useEffect(() => {
		document.body.style.overflow = "auto";
	}, []);

	return (
		<>
			<Helmet>
				<title>Студія креативних сайт-запрошень &sim; pixel flower</title>
			</Helmet>
			<Header />
			<main className="home" id="home">
				<section className="home-hero">
					<div className="home-top__sliders">
						{Array.from({ length: 4 }).map((_, sliderIndex) => {
							return (
								<div
									key={sliderIndex}
									className="home-top__slider"
									style={{
										// "--height": "250px",
										"--quantity": "3",
										"--state": sliderIndex % 2 === 0 ? "reverse" : "normal",
									}}
								>
									<div className="home-top__list">
										{/* TODO: */}
										{sliderImgData[sliderIndex].map((img, i) => {
											return (
												<div
													key={i}
													className="home-top__item"
													style={{ "--position": i + 1 }}
												>
													<img
														onLoad={() => {
															setShowLoadedImg((prev) => ({
																...prev,
																[i]: true,
															}));
														}}
														className={`home-top__img ${
															showLoadedImg[i] ? "home-top__img--show" : ""
														}`}
														src={img}
														height={250}
														alt=""
													/>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
					<div className="home-top-container">
						<h1 className="home-top__title">
							Студія креативних сайт-запрошень
						</h1>
						<div className="home-hero__link-container">
							<HashLink className="home-top__link" to="/#templates" smooth>
								<span>Обрати шаблон</span>
								<div className="home-top-icon-wrapper">
									<div className="home-top-icon-wrapper-inner">
										{[...Array(2)].map((_, i) => {
											return (
												<svg
													key={i}
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													fill="currentColor"
													className="bi bi-arrow-right-short"
													viewBox="0 0 16 16"
												>
													<path
														fillRule="evenodd"
														d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
													/>
												</svg>
											);
										})}
									</div>
								</div>
							</HashLink>
							<HashLink className="home-top__link" to="/#packages" smooth>
								<span>Дізнатися вартість</span>
								<div className="home-top-icon-wrapper">
									<div className="home-top-icon-wrapper-inner">
										{[...Array(2)].map((_, i) => {
											return (
												<svg
													key={i}
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													fill="currentColor"
													className="bi bi-arrow-right-short"
													viewBox="0 0 16 16"
												>
													<path
														fillRule="evenodd"
														d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
													/>
												</svg>
											);
										})}
									</div>
								</div>
							</HashLink>
						</div>
					</div>
				</section>
				<div className="home-container">
					<Templates />
					<Packages />
					<QA />
					<Socials />
				</div>
			</main>
		</>
	);
};

export default Home;
