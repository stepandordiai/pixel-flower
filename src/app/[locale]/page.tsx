"use client";

import { useTranslations } from "next-intl";
import Header from "../components/common/Header/Header";
import { useEffect } from "react";
import Templates from "../components/home/Templates/Templates";
import QA from "../components/home/QA/QA";
import Packages from "../components/home/Packages/Packages";
import Socials from "../components/home/Socials/Socials";
import WhyUs from "../components/home/WhyUs/WhyUs";
import HowItWorks from "../components/home/HowItWorks/HowItWorks";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { Link } from "@/i18n/navigation";
import ScrollToTop from "../utils/ScrollToTop";
import "./Home.scss";

const sliderImgData = [
	["/hero-img/01.png", "/hero-img/02.png", "/hero-img/03.png"],
	["/hero-img/04.png", "/hero-img/05.png", "/hero-img/06.png"],
	["/hero-img/07.png", "/hero-img/08.png", "/hero-img/09.png"],
	["/hero-img/10.png", "/hero-img/11.png", "/hero-img/12.png"],
];

export default function Home() {
	const t = useTranslations();

	// TODO: learn this
	// const [showLoadedImg, setShowLoadedImg] = useState<Record<number, boolean>>(
	// 	{},
	// );

	useEffect(() => {
		document.body.style.overflow = "auto";
	}, []);

	return (
		<>
			<ScrollToTop />
			<Header />
			<main className="home" id="home">
				<section className="home-hero">
					<div className="home-top__sliders">
						{Array.from({ length: 4 }).map((_, sliderIndex) => {
							return (
								<div
									key={sliderIndex}
									className="home-top__slider"
									style={
										{
											// "--height": "250px",
											"--quantity": "3",
											"--state": sliderIndex % 2 === 0 ? "reverse" : "normal",
										} as React.CSSProperties
									}
								>
									<div className="home-top__list">
										{/* TODO: */}
										{sliderImgData[sliderIndex].map((img, i) => {
											return (
												<div
													key={i}
													className="home-top__item"
													style={{ "--position": i + 1 } as React.CSSProperties}
												>
													<img
														// onLoad={() => {
														// 	setShowLoadedImg((prev) => ({
														// 		...prev,
														// 		[i]: true,
														// 	}));
														// }}
														// className={classNames("home-top__img", {
														// 	"home-top__img--show": showLoadedImg[i],
														// })}
														className="home-top__img home-top__img--show"
														src={img}
														height={250}
														alt="Img"
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
							<Link className="home-top__link" href="#templates">
								<span>{t("home.chooseATemplate")}</span>
								<div className="home-top-icon-wrapper">
									<div className="home-top-icon-wrapper-inner">
										{[...Array(2)].map((_, i) => {
											return <ArrowRightIcon key={i} size={24} />;
										})}
									</div>
								</div>
							</Link>
							<Link className="home-top__link" href="#packages">
								<span>Замовити запрошення</span>
								<div className="home-top-icon-wrapper">
									<div className="home-top-icon-wrapper-inner">
										{[...Array(2)].map((_, i) => {
											return <ArrowRightIcon key={i} size={24} />;
										})}
									</div>
								</div>
							</Link>
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
}
