import templatesData from "../../assets/data/templates-data.json";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import img from "/wedding-one/bg-c.jpg";
import heartIcon from "/wedding-one/heart.png";
import NotFound from "../NotFound/NotFound";
import styles from "./WeddingOne.module.scss";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const WeddingOne = () => {
	const { id } = useParams();

	const template = templatesData.find((template) => template.id == id);

	if (!template) {
		return <NotFound />;
	}

	const date = template.time.slice(8, 10).startsWith("0")
		? template.time.slice(9, 10)
		: template.time.slice(8, 10);

	const month = template.time.slice(5, 7).startsWith("0")
		? template.time.slice(6, 7)
		: template.time.slice(5, 7);

	// TODO:
	function getDaysOfMonth(year, month) {
		// month is 0-indexed in JS (0 = January, 1 = February, ...)
		const days1 = [];
		const date1 = new Date(year, month, 1); // start of month

		while (date1.getMonth() === month) {
			days1.push(new Date(date1)); // push a copy of the current day
			date1.setDate(date1.getDate() + 1); // move to next day
		}

		return days1;
	}

	const days2 = [];

	const firstDay = new Date(2025, 7, 1); // August 1, 2025
	let startWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...

	const febDayNumbers = getDaysOfMonth(2025, 7).map((d) => d.getDate());

	startWeekday = (startWeekday + 6) % 7; // now Monday=0, Tuesday=1, ...

	for (let i = 0; i < startWeekday; i++) {
		days2.push(null); // empty slot
	}

	days2.push(...febDayNumbers);

	let txtMonth;

	switch (Number(month)) {
		case 1:
			txtMonth = "Січень";
			break;
		case 2:
			txtMonth = "Лютий";
			break;
		case 3:
			txtMonth = "Березень";
			break;
		case 4:
			txtMonth = "Квітень";
			break;
		case 5:
			txtMonth = "Травень";
			break;
		case 6:
			txtMonth = "Червень";
			break;
		case 7:
			txtMonth = "Липень";
			break;
		case 8:
			txtMonth = "Серпень";
			break;
		case 9:
			txtMonth = "Вересень";
			break;
		case 10:
			txtMonth = "Жовтень";
			break;
		case 11:
			txtMonth = "Листопад";
			break;
		case 12:
			txtMonth = "Грудень";
			break;
	}

	return (
		<>
			<Helmet>
				<meta name="robots" content="noindex, nofollow" />
			</Helmet>
			<main className={styles.main}>
				<div className={styles.hero}>
					<img className={styles["hero__img"]} src={img} alt="" />
					<div className={styles["hero-inner"]}>
						<div style={{ fontSize: "2rem", color: "rgb(211, 201, 87)" }}>
							{template.name_1[0]}
							<span
								style={{
									display: "inline-block",
									fontSize: "1.5rem",
									padding: "0 5px",
								}}
							>
								&
							</span>
							{template.name_2[0]}
						</div>
						<div className={styles["hero__divider"]}></div>
						<div className="home__top-date">
							<p>{date}</p>
							<span>&bull;</span>
							<p>{month}</p>
							<span>&bull;</span>
							<p>{template.time.slice(0, 4)}</p>
						</div>
						<h1 className="home__top-title">
							<span>{template.name_1}</span>
							<span> та </span>
							<span>{template.name_2}</span>
						</h1>
					</div>
				</div>
				<div>
					<p className="pepe">
						<span>Дорогі гості,</span>
						<br />
						Щиро запрошуємо вас на свято, присвячене створенню нашої сім'ї, яке
						відбудеться:
					</p>
				</div>
				<div className={styles.calendar}>
					<p className="calendar-top">{`${txtMonth} ${template.time.slice(
						0,
						4
					)}`}</p>
					<div className={styles["calendar-inner"]}>
						<div>Пн</div>
						<div>Вт</div>
						<div>Ср</div>
						<div>Чт</div>
						<div>Пт</div>
						<div>Сб</div>
						<div>Нд</div>
						{days2.map((day, index) => {
							return (
								<div key={index} className={day == date ? "target-time" : ""}>
									{day}
									{day == date && (
										<img className="calendar-heart" src={heartIcon} alt="" />
									)}
								</div>
							);
						})}
					</div>
				</div>
				<p className="pepe">
					І ми не уявляємо цей радісний день без Вас - близьких і дорогих нам
					людей!
				</p>
				<div className="addresses-container">
					<p className="addresses__title">Адреси святкування</p>
					<p style={{ marginBottom: 25 }} className="page-desc">
						{template.location_time}
					</p>
					<div className="addresses">
						{template.adresess.map((address, index) => {
							return (
								<div key={index} className="address">
									<p className="address__title">
										<span>{address.title}</span>
										<span>{address.time}</span>
									</p>
									<p className="address__info">{address.address_title}</p>
									<p style={{ marginBottom: 10 }} className="address__info">
										{address.address}
									</p>
									<iframe
										className="map"
										src={address.address_url}
										loading="lazy"
									></iframe>
									<a
										className="address__link"
										href={address.address_destination_url}
										target="_blank"
									>
										Отримати маршрут
									</a>
								</div>
							);
						})}
					</div>
				</div>
				<div className="gallery">
					<p className="page-title">Галерея</p>
					<Swiper
						effect={"cards"}
						grabCursor={true}
						modules={[EffectCards]}
						className="mySwiper"
					>
						{template.gallery.map((img, index) => {
							return (
								<SwiperSlide key={index} className="slide">
									<img src={img} alt="" />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
				<p className="page-title">Святкуйте з нами!</p>
				<div style={{ fontSize: "2rem", color: "rgb(211, 201, 87)" }}>
					{template.name_1[0]}
					<span
						style={{
							display: "inline-block",
							fontSize: "1.5rem",
							padding: "0 5px",
						}}
					>
						&
					</span>
					{template.name_2[0]}
				</div>
			</main>
		</>
	);
};

export default WeddingOne;
