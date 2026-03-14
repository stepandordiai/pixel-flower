"use client";

import { useEffect, useState } from "react";
// import invitations from "@/app/assets/data/invitations.json";
import invitations from "@/app/assets/data/invitations/christening-3.json";
import Container from "@/app/components/Container/Container";
import styles from "../Christening3.module.scss";
import "../../christening-2/ChristeningTwo.scss";
import { notFound, useParams } from "next/navigation";

import classNames from "classnames";

const helper = (
	time: number,
	one: string,
	two: string,
	five: string,
): string => {
	const lastTwoDigits = time % 100;
	const lastDigit = time % 10;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return five;
	}

	if (lastDigit >= 2 && lastDigit <= 4) {
		return two;
	}

	if (lastDigit === 1) {
		return one;
	}

	return five;
};

// TODO: learn this
const getMonthName = (date: Date) => {
	const nominative = date.toLocaleDateString("uk-UA", { month: "long" });

	const genitive = date
		.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })
		.replace(/^\d+\s*/, "");

	return { nominative, genitive };
};

export default function Christening3() {
	const params = useParams();

	const invitation = invitations.find((i) => i.id === params.id);

	if (!invitation) {
		return notFound();
	}

	const fakeDate = new Date(invitation.time);

	// TODO:
	const targetDate: any = new Date(fakeDate);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		let interval = setInterval(() => {
			const date: any = new Date();
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
			}
		}, 1000);
	}, []);

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

	const firstDay = new Date(2025, 8, 1); // August 1, 2025
	let startWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...

	const febDayNumbers = getDaysOfMonth(2025, 8).map((d) => d.getDate());

	startWeekday = (startWeekday + 6) % 7; // now Monday=0, Tuesday=1, ...

	for (let i = 0; i < startWeekday; i++) {
		days2.push(null); // empty slot
	}

	days2.push(...febDayNumbers);

	useEffect(() => {
		const animatedElements = document.querySelectorAll(".animated-element1");

		animatedElements.forEach((el) => {
			el.classList.remove("animated-element1--active");
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target;
						el.classList.add("animated-element1--active");
					}
				});
			},
			{ threshold: 0 },
		);

		animatedElements.forEach((el) => observer.observe(el));

		return () => {
			animatedElements.forEach((el) => observer.unobserve(el));
		};
	}, []);

	const [previewHidden, setPreviewHidden] = useState(false);

	const handleLoading = () => {
		document.documentElement.style.overflow = "";

		setPreviewHidden(true);
		const el2 = document.querySelector(".home-chr") as HTMLElement;
		el2.style.display = "flex";
		setTimeout(() => {}, 2000);
	};

	useEffect(() => {
		document.documentElement.style.overflow = "hidden";

		return () => {
			document.documentElement.style.overflow = "";
		};
	}, []);

	const { nominative, genitive } = getMonthName(fakeDate);

	return (
		<>
			<div
				onClick={handleLoading}
				className={classNames(styles.preview, {
					[styles["preview--hidden"]]: previewHidden,
				})}
			>
				<img
					className={classNames(styles["preview__baloon"], {
						[styles["preview__baloon--active"]]: previewHidden,
					})}
					src="/christening-3/01.png"
					alt=""
				/>
				<span>Торкніться екрана, щоб відкрити запрошення!</span>
			</div>
			<main className="home-chr" style={{ display: "none" }}>
				<Container>
					<div className={styles.hero}>
						{/* <img
								className="floated-img"
								src="/christening-boy/02.webp"
								alt=""
							/> */}
						<div>
							{fakeDate.getDate()}{" "}
							{genitive.charAt(0).toUpperCase() + genitive.slice(1)}{" "}
							{fakeDate.getFullYear()} року
						</div>
						<p style={{ fontSize: "18px", fontWeight: 500 }}>
							Таїнство хрещення {invitation.name}a
						</p>
						<img src="/christening-3/03.png" width={300} alt="" />
					</div>
					<div className="wrapper">
						{/* FIXME: */}
						<img
							className="floated-img-3 animated-element1"
							src="/christening-boy/03.webp"
							alt=""
						/>
						<p className={styles["section__title"]}>Дорогі гості!</p>
						<p className="pepe-chr animated-element1">
							Я ще зовсім маленький, але в моєму житті скоро станеться дуже
							важлива подія — мої хрестини. 🕊️
						</p>
					</div>

					<div className="calendar-wrapper-chr animated-element1">
						<p className="calendar-top-christening">{`${nominative.charAt(0).toUpperCase() + nominative.slice(1)} ${fakeDate.getFullYear()}`}</p>
						<div className="calendar-christening">
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
										className={
											day == Number(fakeDate.getDate()) ? "target-time-chr" : ""
										}
									>
										{day}
										{day == Number(fakeDate.getDate()) && (
											<div className="balloon-container">
												<img src="/christening-boy/07.png" alt="" />
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<p className="pepe-chr animated-element1">
						Ми не уявляємо цей радісний день без Вас - близьких і дорогих нам
						людей!
					</p>
					<div style={{ padding: 10 }} className="wrapper">
						<img
							className="floated-img-3 animated-element1"
							src="/christening-boy/03.webp"
							alt=""
						/>
						<section>
							<p className={styles["section__title"]}>Адреси святкування</p>
							<div>
								{invitation.addresses.map((address, index) => {
									return (
										<div key={index} className="address-chr">
											<p className="address__title-chr animated-element1">
												{/* TODO: ? */}
												<span>{"title" in address ? address.title : ""}</span>
												<span>
													{"time" in address ? address.time : ""} (
													{invitation.location_time})
												</span>
											</p>
											<p className="animated-element1">
												{address.address_title}
											</p>
											<a
												style={{ marginBottom: 10, color: "#000" }}
												className="animated-element1"
												href={address.address_destination_url}
												target="_blank"
											>
												{address.address}
											</a>
											<iframe
												className="address-map animated-element1"
												src={address.address_url}
												// loading="lazy"
											></iframe>
											<a
												className="address__link-chr animated-element1"
												href={address.address_destination_url}
												target="_blank"
											>
												Отримати маршрут
											</a>
										</div>
									);
								})}
							</div>
						</section>
					</div>

					<div style={{ padding: "10px" }} className="wrapper">
						<div className="swiper-cont-2 animated-element1">
							{/* FIXME: */}
							{/* <img className="iimg" src="" alt="" loading="lazy" /> */}
							<img
								className="gallery-float-img-2"
								src="/christening-boy/06.webp"
								alt=""
							/>
						</div>
					</div>
					<div className="wrapper">
						<section>
							<p className={styles["section__title"]}>
								Хрещення почнеться через:
							</p>
							<div className={styles.countdown} id="date">
								<div>
									<span>{days}</span>
									<span>{helper(days, "день", "дні", "днів")}</span>
								</div>
								<div>
									<span>{hours}</span>
									<span>{helper(hours, "година", "години", "годин")}</span>
								</div>
								<div>
									<span>{minutes}</span>
									<span>{helper(minutes, "хвилина", "хвилини", "хвилин")}</span>
								</div>
								<div>
									<span>{seconds}</span>
									<span>{helper(seconds, "секунда", "секунди", "секунд")}</span>
								</div>
							</div>
						</section>
					</div>
					<div className="wrapper">
						<img
							className="floated-img-3 animated-element1"
							src="/christening-boy/04.webp"
							alt=""
						/>
						<p className="animated-element1">
							З нетерпінням чекаю на зустріч!
							<br />
							Ваш {invitation.name} !
						</p>
						<div style={{ padding: 10 }}>
							<div className="swiper-cont-2 animated-element1">
								{/* FIXME: */}
								{/* <img className="iimg" src="" alt="" loading="lazy" /> */}
								<img
									className="gallery-float-img-2"
									src="/christening-boy/05.webp"
									alt=""
								/>
							</div>
						</div>

						<div>
							<div className="rainbow-bottom animated-element1">
								<div className="rainbow">
									<div className="pp"></div>
									<div className="pp"></div>
									<div className="pp"></div>
									<div className="pp"></div>
									<div className="pp"></div>
									<div className="pp"></div>
									<div className="pp"></div>
									<div className="pp"></div>
									<div className="pp"></div>
								</div>
							</div>
							<img
								className="rainbow-img-3 animated-element1"
								src="/christening-boy/01.webp"
								alt=""
							/>
						</div>
					</div>
				</Container>
			</main>
		</>
	);
}
