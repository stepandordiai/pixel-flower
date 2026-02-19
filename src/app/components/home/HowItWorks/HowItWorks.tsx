"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./HowItWorks.module.scss";

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
	const t = useTranslations();

	const cardsRef = useRef<(HTMLElement | null)[]>([]);
	const [isCardInView, setIsCardInView] = useState(() =>
		new Array(howItWorksData.length).fill(false),
	);

	useEffect(() => {
		if (!cardsRef.current.length) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const index = cardsRef.current.indexOf(entry.target as HTMLElement);
					if (!entry.isIntersecting) return;
					setIsCardInView((prev) => {
						if (prev[index]) return prev;
						const updated = [...prev];
						updated[index] = true;
						return updated;
					});
				});
			},
			{ threshold: 0.5 },
		);

		cardsRef.current.forEach((card) => {
			if (!card) return;
			observer.observe(card);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section className={styles.section}>
			<h2 className={styles["how-it-works__title"]} id="how-it-works">
				{t("howItWorks.heading")}
			</h2>
			<p className={styles["how-it-works__desc"]}>{t("howItWorks.desc")}</p>
			<div className={styles["how-it-works-container"]}>
				{howItWorksData.map(({ heading, desc }, i) => {
					return (
						<div
							ref={(card) => {
								cardsRef.current[i] = card;
							}}
							className={classNames(styles["how-it-works-card"], {
								[styles["how-it-works-card--visible"]]: isCardInView[i],
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
		</section>
	);
};

export default HowItWorks;
