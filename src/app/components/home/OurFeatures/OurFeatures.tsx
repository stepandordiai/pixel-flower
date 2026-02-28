import styles from "./OurFeatures.module.scss";

const ourFeatures = [
	{
		title: "Анімований вступ",
		desc: "Створює яскраве перше враження та задає атмосферу вашого свята з перших секунд",
		videoSrc: "/video1.mp4",
	},
	{
		title: "Галерея ваших фото",
		desc: "Це не просто фото — це ваша історія, яку можна переглядати знову і знову.",
	},
	{
		title: "Персоналізація гостей",
		desc: "Індивідуальне звернення до кожного",
		imageSrc: "/image1.jpg",
	},
	{
		title: "Інтерактивна мапа",
		desc: "Легко знайти локацію без зайвих запитань",
		videoSrc: "/video3.mp4",
	},
	{
		title: "Таймер зворотнього відліку",
		desc: "Нагадує про важливий день",
		videoSrc: "/video4.mp4",
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
								{card.imageSrc && <img src={card.imageSrc} alt="" />}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default OurFeatures;
