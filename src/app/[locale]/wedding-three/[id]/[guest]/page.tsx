"use client";

import { useEffect } from "react";
import styles from "./WeddingThree.module.scss";
import { Alex_Brush, Montserrat } from "next/font/google";
import ScrollToTop from "@/app/utils/ScrollToTop";
// import { useRef, useEffect } from "react";
import templatesData from "@/app/assets/data/templates-data.json";
import { useParams, notFound } from "next/navigation";

const alexBrush = Alex_Brush({
	weight: ["400"],
	variable: "--font-caveat",
	subsets: ["latin"],
});

const montserrat = Montserrat({
	weight: ["400"],
	variable: "--font-montserrat",
	subsets: ["latin", "cyrillic"],
});

const guests = [
	{ slug: "kopilets", name: "Копилець" },
	{ slug: "bilusyak", name: "Білусяк" },
];

const WeddingThree = () => {
	const params = useParams();

	const template = templatesData.find((template) => template.id === params?.id);
	const guest = guests.find((g) => g.slug === params?.guest);

	if (!template) {
		return notFound();
	}

	const date: any = template.time.slice(8, 10).startsWith("0")
		? template.time.slice(9, 10)
		: template.time.slice(8, 10);

	const month = template.time.slice(5, 7).startsWith("0")
		? template.time.slice(6, 7)
		: template.time.slice(5, 7);

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
			<ScrollToTop />
			<main className={styles.main}>
				<section className={styles.hero}>
					<img src="/wedding-three/01.jpg" alt="" />
					<div className={styles["hero-container"]}>
						<p style={{ fontSize: "18px" }}>
							{template.time.slice(8, 10)} / {template.time.slice(5, 7)} /{" "}
							{template.time.slice(0, 4)}
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
					<p style={{ textAlign: "center", fontSize: "2rem" }}>
						{guest ? `Дорога сім'я ${guest.name}` : "Дорогі гості"}
					</p>
					<p>
						Щиро запрошуємо вас на свято, присвячене створенню нашої сім'ї, яке
						відбудеться:
					</p>
					{/* FIXME: */}
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
										className={day == date ? styles["target-time"] : ""}
									>
										{day}
										{day == date && (
											<img
												className={styles["calendar-heart"]}
												src="/wedding-one/heart.png"
												alt=""
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
				<section className={styles.section}>
					<p>Адреси святкування</p>
					<p>{template.location_time}</p>
					<div>
						{template.addresses.map((address, i) => {
							return (
								<div key={i}>
									<p>
										{/* <span>{address.title}</span> */}
										{/* <span>{address.time}</span> */}
									</p>
									<p>{address.address_title}</p>
									<p>{address.address}</p>
									<iframe src={address.address_url} loading="lazy"></iframe>
									<a href={address.address_destination_url} target="_blank">
										Отримати маршрут
									</a>
								</div>
							);
						})}
					</div>
				</section>
			</main>
		</>
	);
};

export default WeddingThree;
