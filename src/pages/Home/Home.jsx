import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header/Header";
import { useEffect, useState } from "react";
import Templates from "../../components/Templates/Templates";
import QA from "../../components/QA/QA";
import { HashLink } from "react-router-hash-link";
import Packages from "../../components/Packages/Packages";
import Socials from "../../components/Socials/Socials";
import classNames from "classnames";
import WhyUs from "../../components/WhyUs/WhyUs";
import Lng from "../../components/Lng/Lng";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import img1 from "/hero-img/01.png";
import img2 from "/hero-img/02.png";
import img3 from "/hero-img/03.png";
import img4 from "/hero-img/04.png";
import img5 from "/hero-img/05.png";
import img6 from "/hero-img/06.png";
import img7 from "/hero-img/07.png";
import img8 from "/hero-img/08.png";
import img9 from "/hero-img/09.png";
import img10 from "/hero-img/10.png";
import img11 from "/hero-img/11.png";
import img12 from "/hero-img/12.png";
import "./Home.scss";

const sliderImgData = [
	[img1, img2, img3],
	[img4, img5, img6],
	[img7, img8, img9],
	[img10, img11, img12],
];

const storedLngData = localStorage.getItem("i18nextLng");

const Home = () => {
	const { t } = useTranslation();

	const [showLoadedImg, setShowLoadedImg] = useState({});
	const [lngBannerVisible, setLngBannerVisible] = useState(false);

	useEffect(() => {
		// TODO: LEARN THIS
		const shortPreferredLng = navigator.language;

		if (
			shortPreferredLng.split("-")[0] === (storedLngData || "uk") ||
			storedLngData
		)
			return;

		const timeout = setTimeout(() => setLngBannerVisible(true), 1000);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		document.body.style.overflow = "auto";
	}, []);

	return (
		<>
			<Helmet>
				<meta name="description" content={t("homeMetaDesc")} />
				<title>{t("homeMetaTitle")} | pixel flower</title>
				<link rel="canonical" href="https://www.pixelflower.studio/" />
			</Helmet>
			<Header />
			<div
				className={`lng-banner ${
					lngBannerVisible ? "lng-banner--visible" : ""
				}`.trimEnd()}
			>
				<div style={{ marginBottom: 10 }}>
					<p>Будь ласка, оберіть бажану мову зі списку нижче.</p>
					<p>Vyberte si prosím preferovaný jazyk ze seznamu níže.</p>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{/* TODO: learn this */}
					<Lng click={() => setLngBannerVisible(false)} />
					<button onClick={() => setLngBannerVisible(false)}>
						{t("close")}
					</button>
				</div>
			</div>
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
														className={classNames("home-top__img", {
															"home-top__img--show": showLoadedImg[i],
														})}
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
							Створюйте особливі спогади з першого кліку. Онлайн-запрошення на
							ваше свято.
						</h1>
						<div className="home-hero__link-container">
							<HashLink className="home-top__link" to="/#templates" smooth>
								<span>{t("home.chooseATemplate")}</span>
								<div className="home-top-icon-wrapper">
									<div className="home-top-icon-wrapper-inner">
										{[...Array(2)].map((_, i) => {
											return <ArrowRightIcon key={i} />;
										})}
									</div>
								</div>
							</HashLink>
							<HashLink className="home-top__link" to="/#how-it-works" smooth>
								<span>{t("howItWorks.heading")}</span>
								<div className="home-top-icon-wrapper">
									<div className="home-top-icon-wrapper-inner">
										{[...Array(2)].map((_, i) => {
											return <ArrowRightIcon key={i} />;
										})}
									</div>
								</div>
							</HashLink>
						</div>
					</div>
				</section>
				<div className="home-container">
					<HowItWorks />
					<Templates />
					<Packages />
					<WhyUs />
					<QA />
					<Socials />
				</div>
			</main>
		</>
	);
};

export default Home;
