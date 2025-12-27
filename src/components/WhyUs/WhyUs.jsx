import styles from "./WhyUs.module.scss";

const whyUsData = [
	{
		title: "Сучасніше рішення, що виглядає «дорожче»",
		desc: "Онлайн-запрошення справляє сильніше враження, ніж звичайний файл або картинка.",
	},
	{
		title: "Зручно відкривати на будь-якому пристрої",
		desc: "Смартфон, планшет чи ноутбук — сайт виглядає однаково добре всюди.",
	},
	{
		title: "Живі елементи, яких немає в PDF",
		desc: "Анімації, музика, кнопки та інтерактив створюють вау-ефект.",
	},
	{
		title: "Легко оновлювати інформацію",
		desc: "Змінилися деталі події? Ми швидко внесемо правки без перевипуску запрошень.",
	},
	{
		title: "Посилання зручно надсилати гостям",
		desc: "Одне посилання — у месенджері, поштою або соцмережах.",
	},
	{
		title: "Доступніше, ніж здається",
		desc: "Ціна онлайн-запрошення часто не вища за друк та доставку паперових.",
	},
	{
		title: "Таке запрошення запам’ятовується",
		desc: "Гості ще довго згадують стильну подачу та атмосферу події.",
	},
];

const WhyUs = () => {
	return (
		<section className={styles["why-us"]}>
			<h2 className={styles["why-us__title"]}>
				Чому варто обрати наше сайт-запрошення
			</h2>
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
							<h3 className={styles["why-us-item__title"]}>{title}</h3>
							<p>{desc}</p>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default WhyUs;
