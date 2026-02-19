import styles from "./WhyUs.module.scss";
import { getTranslations } from "next-intl/server";

const whyUsData = [
	{
		title: "whyUs.itemTitle1",
		desc: "whyUs.itemDesc1",
	},
	{
		title: "whyUs.itemTitle2",
		desc: "whyUs.itemDesc2",
	},
	{
		title: "whyUs.itemTitle3",
		desc: "whyUs.itemDesc3",
	},
	{
		title: "whyUs.itemTitle4",
		desc: "whyUs.itemDesc4",
	},
	{
		title: "whyUs.itemTitle5",
		desc: "whyUs.itemDesc5",
	},
	{
		title: "whyUs.itemTitle6",
		desc: "whyUs.itemDesc6",
	},
	{
		title: "whyUs.itemTitle7",
		desc: "whyUs.itemDesc7",
	},
];

const WhyUs = async () => {
	const t = await getTranslations();

	return (
		<section className={styles.section}>
			<h2 className={styles["why-us__title"]}>{t("whyUs.title")}</h2>
			<ul className={styles["why-us-list"]}>
				{whyUsData.map(({ title, desc }, i) => {
					return (
						<li key={i} className={styles["why-us-item"]}>
							<p
								className={styles["why-us-item__number"]}
								style={{ fontSize: "2rem", fontWeight: 600 }}
							>
								{i + 1}
							</p>
							<h3 className={styles["why-us-item__title"]}>{t(title)}</h3>
							<p>{t(desc)}</p>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default WhyUs;
