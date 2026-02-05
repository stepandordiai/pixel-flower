"use client";

import { useTranslations } from "next-intl";
import socialsData from "./../../../assets/data/socialsData";
import styles from "./Socials.module.scss";
import ArrowRightIcon from "../../../icons/ArrowRightIcon";

const Socials = () => {
	const t = useTranslations();

	return (
		<section className={styles["socials"]}>
			<h2 className={styles["socials__title"]}>{t("followUs")}</h2>
			<div className={styles["socials__container"]}>
				{socialsData.map((social, i) => {
					const Icon = social.icon;
					return (
						<a
							key={i}
							className="contact-banner__btn"
							href={social.socialUrl}
							target="_blank"
						>
							<Icon size={24} />
							<span>{social.title}</span>
							<span className="package__link-img-container">
								<span className="package__link-img-container-inner">
									{[...Array(2)].map((_, i) => {
										return <ArrowRightIcon key={i} size={24} />;
									})}
								</span>
							</span>
						</a>
					);
				})}
			</div>
		</section>
	);
};

export default Socials;
