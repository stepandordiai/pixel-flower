import contactsData from "@/app/assets/data/contacts-data";
import ArrowRightBtn from "../../ArrowRightBtn/ArrowRightBtn";
import styles from "./ContactUs.module.scss";

const ContactUs = () => {
	return (
		<section className={styles.section}>
			<h2 className={styles["section__title"]}>Зв'яжіться з нами</h2>
			<p className={styles["section__desc"]}>
				Зв’яжіться з нами зручним для вас способом — із радістю допоможемо
				створити ідеальне запрошення.
			</p>
			<div className={styles["contact-us-container"]}>
				{contactsData.map((el, i) => {
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
