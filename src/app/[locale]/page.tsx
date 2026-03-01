import { getTranslations } from "next-intl/server";
import Header from "../components/layout/Header/Header";
import Templates from "../components/home/Templates/Templates";
import QA from "../components/home/QA/QA";
import Packages from "../components/home/Packages/Packages";
import Socials from "../components/home/Socials/Socials";
import WhyUs from "../components/home/WhyUs/WhyUs";
import HowItWorks from "../components/home/HowItWorks/HowItWorks";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import ContactUs from "../components/home/ContactUs/ContactUs";
import OurFeatures from "../components/home/OurFeatures/OurFeatures";
import Lng from "../components/common/Lng/Lng";
import TelIcon from "../icons/TelIcon";
import "./Home.scss";

const sliderImgData = [
	[
		{
			label: "Скріншот сайту-запрошення на весілля",
			path: "/hero-img/wedding-1-ss-01-c.png",
		},
		{
			label: "Скріншот сайту-запрошення на весілля",
			path: "/hero-img/wedding-1-ss-02-c.png",
		},
		{
			label: "Скріншот сайту-запрошення на весілля",
			path: "/hero-img/wedding-2-ss-01-c.png",
		},
	],
	[
		{
			label: "Скріншот сайту-запрошення на весілля",
			path: "/hero-img/wedding-2-ss-02-c.png",
		},
		{
			label: "Скріншот сайту-запрошення на хрестини",
			path: "/hero-img/christening-1-ss-01-c.png",
		},
		{
			label: "Скріншот сайту-запрошення на хрестини",
			path: "/hero-img/christening-1-ss-02-c.png",
		},
	],
	[
		{
			label: "Скріншот сайту-запрошення на хрестини",
			path: "/hero-img/christening-2-ss-01-c.png",
		},
		{
			label: "Скріншот сайту-запрошення на хрестини",
			path: "/hero-img/christening-2-ss-02-c.png",
		},
		{
			label: "Скріншот сайту-запрошення на день народження",
			path: "/hero-img/birthday-1-ss-01-c.png",
		},
	],
	[
		{
			label: "Скріншот сайту-запрошення на день народження",
			path: "/hero-img/birthday-1-ss-02-c.png",
		},
		{
			label: "Скріншот сайту-запрошення на день народження",
			path: "/hero-img/birthday-2-ss-01-c.png",
		},
		{
			label: "Скріншот сайту-запрошення на день народження",
			path: "/hero-img/birthday-2-ss-02-c.png",
		},
	],
];

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	// TODO: ?
	const t = await getTranslations({ locale });
	const baseUrl = "https://www.pixelflower.studio";

	return {
		title: `${t("homeMetaTitle")} | pixel flower`,
		description: t("homeMetaDesc"),
		alternates: {
			canonical: `${baseUrl}/${locale}`,
			languages: {
				uk: `${baseUrl}/uk`,
				cs: `${baseUrl}/cs`,
				"x-default": `${baseUrl}/uk`,
			},
		},
	};
}

export default async function Home() {
	const t = await getTranslations();

	return (
		<>
			<Header />
			<Lng />
			<a className="float-tel" href="tel:+420722001016">
				<TelIcon size={24} />
			</a>
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
														src={img.path}
														height={250}
														alt={img.label}
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
						<h1 className="home-top__title">{t("home.title")}</h1>
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
								<span>{t("home.orderInvitation")}</span>
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
					<OurFeatures />
					<QA />
					<ContactUs />
					<Socials />
				</div>
			</main>
		</>
	);
}
