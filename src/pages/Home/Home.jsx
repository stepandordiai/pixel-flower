import { Helmet } from "react-helmet-async";
import Header from "../../components/Header/Header";
import { useEffect } from "react";
import Templates from "../../components/Templates/Templates";
import QA from "../../components/QA/QA";
import { HashLink } from "react-router-hash-link";
import Packages from "../../components/Packages/Packages";
import img from "/Shot.png";
import arrowTopIcon from "/top.png";
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
				<div className="home-top">
					<div className="home-top-container">
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
					<img className="home-top__img" src={img} width={400} alt="" />
				</div>
				<Templates />
				<Packages />
				<QA />
			</main>
		</>
	);
};

export default Home;
