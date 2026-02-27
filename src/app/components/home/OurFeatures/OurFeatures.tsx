import styles from "./OurFeatures.module.scss";

const ourFeatures = [
	{
		title: "Дрес-код",
		desc: "Гості одразу розуміють стиль вашого свята",
	},
	{
		title: "Персональна сторінка",
		desc: "Ваші імена, дата та важлива інформація в одному місці",
	},
	{
		title: "Інтерактивна мапа",
		desc: "Легко знайти локацію без зайвих запитань",
		videoSrc: "/video3.mp4",
	},
	{
		title: "Розклад подій",
		desc: "Гості знають, що і коли відбувається",
	},
	{
		title: "Анімований вступ",
		desc: "Створює яскраве перше враження та задає атмосферу вашого свята з перших секунд",
		videoSrc: "/video1.mp4",
	},
	{
		title: "Анімації",
		desc: "Створюють wow-ефект з першого перегляду",
		videoSrc: "/video2.mp4",
	},
	{
		title: "Фонова музика",
		desc: "Передає атмосферу вашого свята",
	},
	{
		title: "Підтримка кількох мов",
		desc: "Зручно для гостей з різних країн",
	},
	{
		title: "Власний домен",
		desc: "Ваше унікальне посилання",
	},
	{
		title: "Таймер зворотнього відліку",
		desc: "Нагадує про важливий день",
	},
	{
		title: "Персоналізація гостей",
		desc: "Індивідуальне звернення до кожного",
	},
];

const OurFeatures = () => {
	return (
		<section className={styles["our-features"]}>
			<h2 className={styles["our-features__title"]}>
				Ваше запрошення - більше, ніж просто сайт
			</h2>
			<div className={styles["our-features-grid"]}>
				{ourFeatures.map((card, i) => {
					return (
						<div key={i} className={styles["our-features-grid__card"]}>
							<div style={{ padding: "12.5px" }}>
								<h3 style={{ fontSize: "18px", fontWeight: 500 }}>
									{card.title}
								</h3>
								<p>{card.desc}</p>
							</div>
							<div className={styles["our-features__video-container"]}>
								{card.videoSrc && (
									<video autoPlay loop muted playsInline>
										<source src={card.videoSrc} type="video/mp4" />
									</video>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default OurFeatures;
