import { useTranslation } from "react-i18next";
import socialsData from "../../assets/data/socialsData";
import styles from "./Socials.module.scss";

const Socials = () => {
	const { t } = useTranslation();

	return (
		<section className={styles["socials"]}>
			<h2 className={styles["socials__title"]}>{t("followUs")}</h2>
			<div className={styles["socials__container"]}>
				{socialsData.map((social, i) => {
					const Icon = social.icon;
					return (
						<a
							key={i}
							href={social.socialUrl}
							target="_blank"
							data-value={social.title}
							title={social.title}
						>
							<Icon size={24} />
						</a>
					);
				})}
			</div>
		</section>
	);
};

export default Socials;
