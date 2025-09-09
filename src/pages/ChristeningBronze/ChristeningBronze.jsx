import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import img from "/bg-c.jpg";
import heartIcon from "/heart2.png";
import data from "./../../assets/data/data.json";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

import { useParams } from "react-router-dom";
import "./ChristeningBronze.scss";
import Header from "../../components/Header/Header";

const ChristeningBronze = () => {
	const { id } = useParams();

	const envelope = data.find((envelope) => envelope.id == id);

	// TODO:
	const targetDate = new Date(envelope.countdown);
	const [days, setDays] = useState("0");
	const [hours, setHours] = useState("0");
	const [minutes, setMinutes] = useState("0");
	const [seconds, setSeconds] = useState("0");
	const [showHeader, setShowHeader] = useState(false);

	useEffect(() => {
		let interval = setInterval(() => {
			const date = new Date();
			const dateDifference = targetDate - date;
			setDays(Math.floor(dateDifference / 1000 / 60 / 60 / 24));
			setHours(Math.floor((dateDifference / 1000 / 60 / 60) % 24));
			setMinutes(Math.floor((dateDifference / 1000 / 60) % 60));
			setSeconds(Math.floor((dateDifference / 1000) % 60));

			if (dateDifference <= 0) {
				clearInterval(interval);
				setDays(0);
				setHours(0);
				setMinutes(0);
				setSeconds(0);
				handleClick();
				setShowHeader(true);
			}
		}, 1000);
	}, []);

	const handleClick = () => {
		const duration = 5 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		const randomInRange = (min, max) => Math.random() * (max - min) + min;

		const interval = window.setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);
	};

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

	switch (envelope.month) {
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
			{showHeader && <Header />}
			<main className="home">
				<div style={{ position: "relative" }} className="home__top">
					<img className="home__top-img-bg" src={img} alt="" />
					<div className="home__top-inner">
						<div className="home__top-logo">{/* А<span>&</span>Н */}</div>
						<div className="divider"></div>
						<div className="home__top-date">
							<p>{envelope.date}</p>
							<span>&bull;</span>
							<p>{envelope.month.toString().padStart(2, 0)}</p>
							<span>&bull;</span>
							<p>{envelope.year.toString().slice(2)}</p>
						</div>
						<h1 className="home__top-title">
							{/* <span>{envelope.name_1}</span> */}
							{/* <span> та </span> */}
							{/* <span>{envelope.name_2}</span> */}
							Таїнство хрещення (Імя)
						</h1>
					</div>
					<div className="rainbow">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>

				<div>
					<p className="pepe">
						<span>Дорогі гості,</span>
						<br />з великою радістю та любов’ю запрошуємо Вас розділити з нами
						важливу подію
					</p>
					<p>Таїнство Хрещення нашої (синочка або дочки) [ім’я]</p>
				</div>
				<div className="calendar-wrapper">
					<p className="calendar-top">{`${txtMonth} ${envelope.year}`}</p>
					<div className="calendar">
						<div>Пн</div>
						<div>Вт</div>
						<div>Ср</div>
						<div>Чт</div>
						<div>Пт</div>
						<div>Сб</div>
						<div>Нд</div>
						{days2.map((day, index) => {
							return (
								<div key={index} className={day === 28 ? "target-time" : ""}>
									{day}
									{day === 28 && (
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
						(місцевий час, {envelope.place})
					</p>
					<div className="addresses">
						{envelope.adresess.map((address, index) => {
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
						{envelope.gallery.map((img, index) => {
							return (
								<SwiperSlide key={index} className="slide">
									<img src={img} alt="" />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
				<div className="date-container">
					<p className="page-title">Святкування почнеться через:</p>
					<div className="date" id="date">
						<div>
							<p>{days}</p>
							<p>днів</p>
						</div>
						<div>
							<p>{hours}</p>
							<p>годин(а)</p>
						</div>
						<div>
							<p>{minutes}</p>
							<p>хвилин(а)</p>
						</div>
						<div>
							<p>{seconds}</p>
							<p>секунд(а)</p>
						</div>
					</div>
					{/* <p className="page-desc">В кінці буде феєрверк!</p> */}
				</div>
				<p className="page-title">З любов’ю,</p>
				<p>
					{envelope.mother_name} та {envelope.father_name}
				</p>
			</main>
		</>
	);
};

export default ChristeningBronze;
