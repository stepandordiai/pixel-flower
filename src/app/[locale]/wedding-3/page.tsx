"use client";

import { useEffect, useState } from "react";
import styles from "./WeddingThree.module.scss";
import { Alex_Brush, Montserrat } from "next/font/google";
import templates from "@/app/assets/data/templates.json";
import Image from "next/image";
import { useRef } from "react";

const alexBrush = Alex_Brush({
	weight: ["400"],
	variable: "--font-caveat",
	subsets: ["latin"],
});

const montserrat = Montserrat({
	weight: ["400", "500", "600"],
	variable: "--font-montserrat",
	subsets: ["latin", "cyrillic"],
});

const template = templates.find((template) => template.id === "wedding-3")!;

// TODO: learn this
function helper(time: number, one: string, two: string, five: string): string {
	const abs = Math.abs(time);
	const lastDigit = abs % 10;
	const lastTwoDigits = abs % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return five;
	}

	if (lastDigit === 1) {
		return one;
	}

	if (lastDigit >= 2 && lastDigit <= 4) {
		return two;
	}

	return five;
}

// TODO: learn this
const getMonthName = (date: Date) => {
	const nominative = date.toLocaleDateString("uk-UA", { month: "long" });

	const genitive = date
		.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })
		.replace(/^\d+\s*/, "");

	return { nominative, genitive };
};

export default function WeddingThreeTemplate() {
	const fakeDate = new Date();
	fakeDate.setDate(fakeDate.getDate() + 3);

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

	useEffect(() => {
		document.body.classList.add(styles.black);

		return () => document.body.classList.remove(styles.black);
	}, []);
	// const leftRef = useRef<HTMLImageElement>(null);
	// const rightRef = useRef<HTMLImageElement>(null);

	// useEffect(() => {
	// 	let current = 0;
	// 	let target = 0;
	// 	let stopped = false;

	// 	const maxRotation = 180;
	// 	const speed = 0.2; // 10% smoothing

	// 	const onScroll = () => {
	// 		if (stopped) return;

	// 		const maxScroll = window.innerHeight * 1.5;
	// 		target = Math.min(window.scrollY / maxScroll, 1);
	// 	};

	// 	const animate = () => {
	// 		if (stopped) return;

	// 		current += (target - current) * speed;

	// 		// Clamp hard stop
	// 		if (current >= 0.999) {
	// 			current = 1;
	// 			stopped = true;

	// 			// final transform (safety)
	// 			leftRef.current!.style.transform = `rotateY(-180deg)`;
	// 			rightRef.current!.style.transform = `rotateY(180deg)`;

	// 			window.removeEventListener("scroll", onScroll);
	// 			return;
	// 		}

	// 		const rotation = current * maxRotation;

	// 		if (leftRef.current) {
	// 			leftRef.current.style.transform = `rotateY(${-rotation}deg)`;
	// 		}

	// 		if (rightRef.current) {
	// 			rightRef.current.style.transform = `rotateY(${rotation}deg)`;
	// 		}

	// 		requestAnimationFrame(animate);
	// 	};

	// 	window.addEventListener("scroll", onScroll);
	// 	animate();

	// 	return () => {
	// 		window.removeEventListener("scroll", onScroll);
	// 	};
	// }, []);

	const [animate, setAnimate] = useState(false);
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setAnimate(true);
					}
				});
			},
			{ threshold: 0 },
		);

		if (pathRef.current) {
			observer.observe(pathRef.current);
		}
		return () => observer.disconnect();
	}, []);

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

		return () => clearInterval(interval);
	}, []);

	const { nominative, genitive } = getMonthName(fakeDate);

	return (
		<>
			{/* <img
				// ref={leftRef}
				className={styles["paper-left"]}
				src="/wedding-three/paper.jpg"
				alt=""
			/>
			<img
				// ref={rightRef}
				className={styles["paper-right"]}
				src="/wedding-three/paper.jpg"
				alt=""
			/> */}
			<main className={styles.main}>
				<section className={styles.hero}>
					<img src="/wedding-three/01.jpg" alt="" />
					<div className={styles["hero-container"]}>
						<p style={{ fontSize: "18px" }}>
							{fakeDate.getDate()} / {fakeDate.getMonth() + 1} /{" "}
							{fakeDate.getFullYear()}
						</p>
						<div className={styles["hero__img-wrapper"]}>
							<img src="/wedding-three/heart.png" alt="" />
						</div>
						<p className={styles["hero__heading"]}>
							{template.hisName} & {template.herName}
						</p>
					</div>
				</section>
				<section className={styles.section}>
					<p style={{ fontSize: "1.5rem", fontWeight: 600 }}>
						Дорога сім'я Копилець
					</p>
					<p>
						Щиро запрошуємо вас на свято, присвячене створенню нашої сім'ї, яке
						відбудеться:
					</p>
					{/* FIXME: */}
					<div className={styles.calendar}>
						<p
							className={styles["calendar-top"]}
						>{`${nominative.charAt(0).toUpperCase() + nominative.slice(1)} ${fakeDate.getFullYear()}`}</p>
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
										className={
											day == fakeDate.getDate() ? styles["target-time"] : ""
										}
									>
										{day}
										{day == fakeDate.getDate() && (
											<Image
												className={styles["calendar-heart"]}
												src="/wedding-one/heart.png"
												width={40}
												height={40}
												alt="Heart"
											/>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<p>
						Ми не уявляємо цей радісний день без вас — наших близьких і дорогих
						людей!
					</p>
				</section>
				<div className={styles["wavy-divider"]}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 100"
						preserveAspectRatio="none"
					>
						<path
							ref={pathRef}
							className={`${styles["wavy-divider__path"]} ${animate ? styles["animate"] : ""}`}
							d="M0,50 C60,5 120,95 180,50 C240,5 300,95 360,50 C420,5 480,95 540,50 C600,5 660,95 720,50 C780,5 840,95 900,50 C960,5 1020,95 1080,50 C1140,5 1170,27 1200,50"
							fill="none"
							stroke="currentColor"
							strokeWidth="11"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<section className={styles.section}>
					<p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
						Адреси святкування
					</p>
					<div className={styles.addresses}>
						{template.addresses.map((address, i) => {
							return (
								<div key={i} className={styles.address}>
									<p
										style={{ display: "flex", justifyContent: "space-between" }}
									>
										{/* <span>{address.title}</span> */}
										{/* <span>
											{address.time}({template.location_time})
										</span> */}
									</p>
									<p>{address.address_title}</p>
									<p>{address.address}</p>
									<iframe
										className={styles["address__map"]}
										src={address.address_url}
										loading="lazy"
									></iframe>
									<a
										className={styles.link}
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
					<p className="animated-element font-m font-accent">
						Зворотний відлік до нашого Великого дня
					</p>
					<div className="silver-date" id="date">
						<div className="animated-element">
							<span className="font-l">{days}</span>
							<span className="font-s">
								{helper(hours, "день", "дні", "днів")}
							</span>
						</div>
						<div className="animated-element">
							<span className="font-l">{hours}</span>
							<span className="font-s">
								{helper(hours, "година", "години", "годин")}
							</span>
						</div>
						<div className="animated-element">
							<span className="font-l">{minutes}</span>
							<span className="font-s">
								{helper(minutes, "хвилина", "хвилини", "хвилин")}
							</span>
						</div>
						<div className="animated-element">
							<span className="font-l">{seconds}</span>
							<span className="font-s">
								{helper(seconds, "секунда", "секунди", "секунд")}
							</span>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
