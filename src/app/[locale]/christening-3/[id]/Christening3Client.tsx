"use client";

import { useEffect, useState } from "react";
import invitations from "@/data/invitations/christening-3.json";
import { notFound, useParams } from "next/navigation";
import ParallaxImage from "@/components/ParallaxImage/ParallaxImage";
import classNames from "classnames";
import "../../christening-2/ChristeningTwo.scss";
import styles from "../Christening3.module.scss";

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

export default function Christening3Client() {
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

	const firstDay = new Date(fakeDate.getFullYear(), fakeDate.getMonth(), 1); // August 1, 2025
	let startWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...

	const febDayNumbers = getDaysOfMonth(
		fakeDate.getFullYear(),
		fakeDate.getMonth(),
	).map((d) => d.getDate());

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
			<main className={styles.main}>
				<section className={styles.hero}>
					<div className={styles["hero__date"]}>
						{fakeDate.getDate()}{" "}
						{genitive.charAt(0).toUpperCase() + genitive.slice(1)}{" "}
						{fakeDate.getFullYear()} року
					</div>
					<p
						style={{
							fontSize: "1.5rem",
							fontWeight: 500,
							textAlign: "center",
							padding: "0 20px",
						}}
					>
						Таїнство хрещення {invitation.genitiveName}
					</p>
					<img src="/christening-3/03.png" width={300} alt="" />
				</section>
				<section className={styles.section}>
					<img
						className="animated-element1"
						src="/christening-3/04.png"
						width={250}
						height={250}
						alt=""
					/>
					<p className={`${styles["section__title"]} animated-element1`}>
						Дорогі гості!
					</p>
					<p className={`${styles.txt} animated-element1`}>
						Я ще зовсім маленький, але в моєму житті скоро станеться дуже
						важлива подія — мої хрестини. 🕊️
					</p>
					<div className={`${styles["calendar-section"]} animated-element1`}>
						<p
							style={{
								position: "absolute",
								top: 0,
								left: "50%",
								transform: "translate(-50%, -50%)",
								fontSize: "18px",
								fontWeight: 600,
								background: "#fff",
								padding: "0 20px",
								width: "max-content",
							}}
						>{`${nominative.charAt(0).toUpperCase() + nominative.slice(1)} ${fakeDate.getFullYear()}`}</p>
						<div className={styles.calendar}>
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
											day == Number(fakeDate.getDate())
												? styles["calendar__date"]
												: ""
										}
									>
										{day}
										{day == Number(fakeDate.getDate()) && (
											<img
												className={styles["calendar__img"]}
												src="/christening-3/05.png"
												alt=""
											/>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<p className={`${styles.txt} animated-element1`}>
						Я буду дуже радий, якщо Ви прийдете розділити цей світлий день разом
						зі мною та моєю сім’єю.
					</p>
				</section>
				<section className={styles.section}>
					<img
						className="animated-element1"
						src="/christening-3/04.png"
						width={250}
						height={250}
						alt=""
					/>
					<p className={`${styles["section__title"]} animated-element1`}>
						Адреси святкування
					</p>
					<div className={styles.addresses}>
						{invitation.addresses.map((address, index) => {
							return (
								<div key={index} className={styles.address}>
									<p
										style={{
											display: "flex",
											justifyContent: "space-between",
											fontSize: "18px",
											fontWeight: 500,
										}}
										className={`${styles.txt} animated-element1`}
									>
										{/* TODO: ? */}
										<span>{"title" in address ? address.title : ""}</span>
										<span>{"time" in address ? address.time : ""} м.ч.</span>
									</p>
									<p className="animated-element1">{address.address_title}</p>
									<a
										className={`${styles.link} animated-element1`}
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
										className={`${styles.btn} animated-element1`}
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
				<section className={styles.section}>
					<img
						className="animated-element1"
						src="/christening-3/04.png"
						width={250}
						height={250}
						alt=""
					/>
					<p className={`${styles["section__title"]} animated-element1`}>
						Хрещення почнеться через:
					</p>
					<div className={`${styles.countdown} animated-element1`} id="date">
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
				<section className={styles.section}>
					<img
						className="animated-element1"
						src="/christening-3/06.png"
						width={250}
						height={250}
						alt=""
					/>
					<p className={`${styles.txt} animated-element1`}>
						З нетерпінням чекаю на зустріч!
						<br />
						Ваш {invitation.nominativeName}!
					</p>
				</section>
			</main>
			<ParallaxImage
				src="/christening-3/01.png"
				alt="lol"
				threshold={900}
				left={20}
			/>
			<ParallaxImage
				src="/christening-3/01.png"
				alt="lol"
				threshold={2100}
				right={20}
			/>
		</>
	);
}
