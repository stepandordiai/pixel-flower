import { getTranslations } from "next-intl/server";
import contacts from "@/app/assets/data/contacts";
import ArrowRightBtn from "../../ArrowRightBtn/ArrowRightBtn";
import styles from "./ContactUs.module.scss";

const ContactUs = async () => {
	const t = await getTranslations();

	return (
		<section className={styles.section} id="contact">
			<h2 className={styles["section__title"]}>{t("contactUs.title")}</h2>
			<p className={styles["section__desc"]}>{t("contactUs.desc")}</p>
			<div className={styles["contact-us-container"]}>
				{contacts.map((el, i) => {
					return (
						<ArrowRightBtn
							key={i}
							url={el.socialUrl}
							label={el.title}
							icon={el.icon}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default ContactUs;
