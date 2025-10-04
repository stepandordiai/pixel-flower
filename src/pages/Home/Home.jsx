import { Helmet } from "react-helmet-async";
import Header from "../../components/Header/Header";
import { useEffect } from "react";
import Templates from "../../components/Templates/Templates";
import QA from "../../components/QA/QA";
import { HashLink } from "react-router-hash-link";
import Packages from "../../components/Packages/Packages";
import img from "/iphone.png";
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
					<div className="home-top-container">
						<div className="home-top__sliders">
							<div
								className="home-top__slider"
								style={{
									"--height": "200px",
									"--quantity": "6",
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
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "3" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "4" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "5" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "6" }}>
										<img
											className="home-top__img"
											src={img}
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
									"--quantity": "6",
									"--state": "normal",
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
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "3" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "4" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "5" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "6" }}>
										<img
											className="home-top__img"
											src={img}
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
									"--quantity": "6",
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
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "3" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "4" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "5" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
									<div className="home-top__item" style={{ "--position": "6" }}>
										<img
											className="home-top__img"
											src={img}
											height={200}
											alt=""
										/>
									</div>
								</div>
							</div>
						</div>

						<h1 className="home-top__title">
							Студія креативних сайт-запрошень
						</h1>
						<HashLink className="home-top__link" to="/#templates" smooth>
							<span>Обрати шаблони</span>
							<div className="home-top-icon-wrapper">
								<div className="home-top-icon-wrapper-inner">
									<img src={arrowTopIcon} width={16} height={16} alt="" />
									<img src={arrowTopIcon} width={16} height={16} alt="" />
								</div>
							</div>
						</HashLink>
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
