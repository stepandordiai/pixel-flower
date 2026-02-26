"use client";

import { useParams, notFound } from "next/navigation";
import invitations from "@/app/assets/data/invitations/wedding-1.json";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import styles from "../WeddingOne.module.scss";

export default function WeddingOne() {
	const params = useParams();

	const template = invitations.find(
		(invitation) => invitation.id === params?.id,
	);

	if (!template) {
		return notFound();
	}

	const date: string = template.time.slice(8, 10);
	const month: string = template.time.slice(5, 7);

	// TODO:
	function getDaysOfMonth(year: any, month: any) {
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

	return (
		<main className={styles.main}>
			<div className={styles.hero}>
				<img
					className={styles["hero__img"]}
					src="/wedding-one/bg-c.jpg"
					alt=""
				/>
				<div className={styles["hero-inner"]}>
					<div style={{ fontSize: "2rem", color: "rgb(211, 201, 87)" }}>
						{template.hisName?.[0]}
						<span
							style={{
								display: "inline-block",
								fontSize: "1.5rem",
								padding: "0 5px",
							}}
						>
							&
						</span>
						{template.herName?.[0]}
					</div>
					<div className={styles["hero__divider"]}></div>
					<div className={styles["home__top-date"]}>
						<p>{date}</p>
						<span>&bull;</span>
						<p>{month}</p>
						<span>&bull;</span>
						<p>{template.time.slice(0, 4)}</p>
					</div>
					<h1 className={styles["home__top-title"]}>
						<span>{template.hisName}</span>
						<span> та </span>
						<span>{template.herName}</span>
					</h1>
				</div>
			</div>
			<div>
				<p className={styles.pepe}>
					<span>Дорогі гості,</span>
					<br />
					Щиро запрошуємо вас на свято, присвячене створенню нашої сім'ї, яке
					відбудеться:
				</p>
			</div>
			<div className={styles.calendar}>
				<p className="calendar-top">{`${template.monthName} ${template.time.slice(
					0,
					4,
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
							<div
								key={index}
								className={String(day) == date ? "target-time" : ""}
							>
								{day}
								{String(day) == date && (
									<img
										className="calendar-heart"
										src="/wedding-one/heart.png"
										alt=""
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<p className={styles.pepe}>
				І ми не уявляємо цей радісний день без Вас - близьких і дорогих нам
				людей!
			</p>
			<div className="addresses-container">
				<p className={styles["addresses__title"]}>Адреси святкування</p>
				<div className="addresses">
					{template.addresses.map((address, index) => {
						return (
							<div key={index} className="address">
								<p className={styles["address__title"]}>
									<span>{"title" in address ? address.title : ""}</span>
									<span>
										{"time" in address ? address.time : ""} (
										{template.location_time})
									</span>
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
				<p className={styles["page-title"]}>Галерея</p>
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
			<p className={styles["page-title"]}>Святкуйте з нами!</p>
			<div style={{ fontSize: "2rem", color: "rgb(211, 201, 87)" }}>
				{template.hisName?.[0]}
				<span
					style={{
						display: "inline-block",
						fontSize: "1.5rem",
						padding: "0 5px",
					}}
				>
					&
				</span>
				{template.herName?.[0]}
			</div>
		</main>
	);
}
