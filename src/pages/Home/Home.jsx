import { Helmet } from "react-helmet-async";
import Header from "../../components/Header/Header";
import { useEffect } from "react";
import Templates from "../../components/Templates/Templates";
import QA from "../../components/QA/QA";
import { HashLink } from "react-router-hash-link";
import Packages from "../../components/Packages/Packages";
import img from "/iphone.png";
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
import arrowTopIcon from "/icons/top.png";
import "./Home.scss";

const Home = () => {
	useEffect(() => {
		document.body.style.overflow = "auto";
	}, []);

	return (
		<>
			<Helmet>
				<title>Студія креативних сайт-запрошень &sim; pixel flower</title>
			</Helmet>
			<Header />
			<main className="home">
				<div className="home-hero">
					<div className="home-top__sliders">
						<div
							className="home-top__slider"
							style={{
								"--height": "200px",
								"--quantity": "3",
								"--state": "reverse",
							}}
						>
							<div className="home-top__list">
								<div className="home-top__item" style={{ "--position": "1" }}>
									<img
										className="home-top__img"
										src={img}
										height={200}
										alt=""
									/>
								</div>
								<div className="home-top__item" style={{ "--position": "2" }}>
									<img
										className="home-top__img"
										src={img2}
										height={200}
										alt=""
									/>
								</div>
								<div className="home-top__item" style={{ "--position": "3" }}>
									<img
										className="home-top__img"
										src={img3}
										height={200}
										alt=""
									/>
								</div>
							</div>
						</div>
						<div
							className="home-top__slider"
							style={{
								"--height": "200px",
								"--quantity": "3",
								"--state": "normal",
							}}
						>
							<div className="home-top__list">
								<div className="home-top__item" style={{ "--position": "1" }}>
									<img
										className="home-top__img"
										src={img4}
										height={200}
										alt=""
									/>
								</div>
								<div className="home-top__item" style={{ "--position": "2" }}>
									<img
										className="home-top__img"
										src={img5}
										height={200}
										alt=""
									/>
								</div>
								<div className="home-top__item" style={{ "--position": "3" }}>
									<img
										className="home-top__img"
										src={img6}
										height={200}
										alt=""
									/>
								</div>
							</div>
						</div>

						<div
							className="home-top__slider"
							style={{
								"--height": "200px",
								"--quantity": "3",
								"--state": "reverse",
							}}
						>
							<div className="home-top__list">
								<div className="home-top__item" style={{ "--position": "1" }}>
									<img
										className="home-top__img"
										src={img7}
										height={200}
										alt=""
									/>
								</div>
								<div className="home-top__item" style={{ "--position": "2" }}>
									<img
										className="home-top__img"
										src={img8}
										height={200}
										alt=""
									/>
								</div>
								<div className="home-top__item" style={{ "--position": "3" }}>
									<img
										className="home-top__img"
										src={img9}
										height={200}
										alt=""
									/>
								</div>
							</div>
						</div>
						<div
							className="home-top__slider"
							style={{
								"--height": "200px",
								"--quantity": "3",
								"--state": "normal",
							}}
						>
							<div className="home-top__list">
								<div className="home-top__item" style={{ "--position": "1" }}>
									<img
										className="home-top__img"
										src={img10}
										height={200}
										alt=""
									/>
								</div>
								<div className="home-top__item" style={{ "--position": "2" }}>
									<img
										className="home-top__img"
										src={img11}
										height={200}
										alt=""
									/>
								</div>
								<div className="home-top__item" style={{ "--position": "3" }}>
									<img
										className="home-top__img"
										src={img12}
										height={200}
										alt=""
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="home-top-container">
						<h1 className="home-top__title">
							Студія креативних сайт-запрошень
						</h1>
						<div className="home-hero__link-container">
							<HashLink className="home-top__link" to="/#templates" smooth>
								<span>Обрати шаблони</span>
								<div className="home-top-icon-wrapper">
									<div className="home-top-icon-wrapper-inner">
										<img src={arrowTopIcon} width={16} height={16} alt="" />
										<img src={arrowTopIcon} width={16} height={16} alt="" />
									</div>
								</div>
							</HashLink>
							<HashLink className="home-top__link" to="/#packages" smooth>
								<span>Дізнатися вартість</span>
								<div className="home-top-icon-wrapper">
									<div className="home-top-icon-wrapper-inner">
										<img src={arrowTopIcon} width={16} height={16} alt="" />
										<img src={arrowTopIcon} width={16} height={16} alt="" />
									</div>
								</div>
							</HashLink>
						</div>
					</div>
				</div>
				<Templates />
				<Packages />
				<QA />
			</main>
		</>
	);
};

export default Home;
