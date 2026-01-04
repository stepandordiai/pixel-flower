import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { HashLink } from "react-router-hash-link";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import "./HowItWorks.scss";

const howItWorksData = [
	{
		heading: "howItWorks.cardHeading1",
		desc: "howItWorks.cardDesc1",
	},
	{
		heading: "howItWorks.cardHeading2",
		desc: "howItWorks.cardDesc2",
	},
	{
		heading: "howItWorks.cardHeading3",
		desc: "howItWorks.cardDesc3",
	},
	{
		heading: "howItWorks.cardHeading4",
		desc: "howItWorks.cardDesc4",
	},
];

const HowItWorks = () => {
	const { t } = useTranslation();
	const cardsRef = useRef([]);
	const [isCardInView, setIsCardInView] = useState(() =>
		new Array(howItWorksData.length).fill(false)
	);

	useEffect(() => {
		if (!cardsRef.current.length) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = cardsRef.current.indexOf(entry.target);
					if (!entry.isIntersecting) return;
					setIsCardInView((prev) => {
						if (prev[index]) return prev;
						const updated = [...prev];
						updated[index] = true;
						return updated;
					});
				});
			},
			{ threshold: 0.5 }
		);

		cardsRef.current.forEach((card) => {
			if (!card) return;
			observer.observe(card);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section className="how-it-works">
			<h2 className="how-it-works__title" id="how-it-works">
				{t("howItWorks.heading")}
			</h2>
			<p style={{ textAlign: "center", marginBottom: 10 }}>
				{t("howItWorks.desc")}
			</p>
			<div className="how-it-works-container">
				{howItWorksData.map(({ heading, desc }, i) => {
					return (
						<div
							ref={(card) => {
								cardsRef.current[i] = card;
							}}
							className={classNames("how-it-works-card", {
								"how-it-works-card--visible": isCardInView[i],
							})}
							key={i}
						>
							<h3 style={{ fontWeight: 600, marginBottom: 10 }}>
								{t(heading)}
							</h3>
							<p>{t(desc)}</p>
						</div>
					);
				})}
			</div>
			<div style={{ marginBottom: 10 }}>
				<p>{t("howItWorks.txt1")}</p>
				<p>{t("howItWorks.txt2")}</p>
				<p>{t("howItWorks.txt3")}</p>
			</div>
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
		</section>
	);
};

export default HowItWorks;
