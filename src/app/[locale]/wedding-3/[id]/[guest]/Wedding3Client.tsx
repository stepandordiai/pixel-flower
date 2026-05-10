"use client";

import { useTranslations } from "next-intl";
import invitations from "@/data/invitations/wedding-3.json";
import { notFound, useParams } from "next/navigation";
import classNames from "classnames";
import { CSSProperties, useEffect, useState, useRef } from "react";
import { Cormorant_Infant, Alex_Brush } from "next/font/google";
import HandIcon from "@/components/icons/HandIcon";
import { useLocale } from "next-intl";
import styles from "../../WeddingThree.module.scss";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const cormorantInfant = Cormorant_Infant({
	weight: ["500"],
	variable: "--font-cormorant-infant",
	subsets: ["latin", "cyrillic"],
});

const alexBrush = Alex_Brush({
	weight: ["400"],
	variable: "--font-cormorant-infant",
	subsets: ["latin"],
});

const guests = [
	{ slug: "parents", name: "Дорогі батьки" },
	{ slug: "bogdan-angelika", name: "Дорогі\nБогдан та Анжеліка" },
	{ slug: "michael-evgenia", name: "Дорогі\nМихайло та Євгенія" },
	{ slug: "vasyl-kamila", name: "Дорогі\nВасиль та Каміла" },
	{ slug: "denis-roksolana", name: "Дорогі\nДенис та Роксолана" },
	{ slug: "vasyl-nika", name: "Дорогі\nВасиль та Ніка" },
	{ slug: "adriana", name: "Дорога Адріана" },
	{ slug: "andrii-natalia", name: "Дорогі\nАндрій та Наталія" },
	{ slug: "vasyl", name: "Дорогий Василь" },
	{ slug: "viktor-natalia", name: "Дорогі\nВіктор та Наталія" },
	{ slug: "vasyl-natalia", name: "Дорогі\nВасиль та Наталія" },
	{ slug: "alik-andriana", name: "Дорогі\nАлік та Андріана" },
	{ slug: "pavluk-family", name: "Дорога сім'я Павлюк" },
	{ slug: "bentsa-family", name: "Дорога сім'я Бенца" },
	{ slug: "gabor-family", name: "Дорога сім'я Габор" },
	{ slug: "karasov-family", name: "Дорога сім'я Карасьових" },
	{ slug: "kopilets-family", name: "Дорога сім'я Копилець" },
	{ slug: "bohdana", name: "Дорога Богданка" },
	{ slug: "tokar-family", name: "Дорога сім'я Токар" },
	{ slug: "storozenko-family", name: "Дорога сім'я Стороженко" },
	{ slug: "godmother", name: "Дорога Маточко" },
	{ slug: "janko", name: "Milí Kristián a Michaela" },
	{ slug: "bilanich-family", name: "Дорога сім'я Біланич" },
	{ slug: "shelemba-family", name: "Дорога сім'я Шелемба" },
	{ slug: "tsirik-family", name: "Дорога сім'я Цірик" },
	{ slug: "grandma", name: "Дорога Бабуся" },
	{ slug: "ivan-olesya", name: "Дорогі\nІван та Олеся" },
];

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

export default function Wedding3Client() {
	const t = useTranslations("wedding3");
	const params = useParams();
	const locale = useLocale();

	const invitation = invitations.find((i) => i.id === params.id)!;

	const guest = guests.find((g) => g.slug === params?.guest);

	if (!invitation) {
		return notFound();
	}

	// TODO: learn this
	const getMonthName = (date: Date) => {
		const nominative = date.toLocaleDateString(
			`${locale === "uk" ? "uk-UA" : "cs-CZ"}`,
			{ month: "long" },
		);

		const genitive = date
			.toLocaleDateString(`${locale === "uk" ? "uk-UA" : "cs-CZ"}`, {
				day: "numeric",
				month: "long",
			})
			.replace(/^\d+\s*/, "");

		return { nominative, genitive };
	};

	const [playing, setPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const date: Date = new Date(invitation.time);

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
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						// TODO: learn this
						entry.target.classList.add(styles["animate--active"]);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.5 },
		);

		document.querySelectorAll(`.${styles.animate}`).forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		let interval = setInterval(() => {
			const dateNow: Date = new Date();
			const dateDifference = date.getTime() - dateNow.getTime();
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

	const { nominative, genitive } = getMonthName(date);

	const togglePlay = () => {
		if (playing) {
			audioRef.current?.pause();
		} else {
			audioRef.current?.play();
		}

		setPlaying((prev) => !prev);
	};

	// const ringOuter = document.querySelector(
	// 	".logo",
	// ) as SVGGeometryElement | null;
	// console.log(ringOuter?.getTotalLength());
	const [preview, setPreview] = useState(true);
	const [envelopeClicked, setEnvelopeClicked] = useState(false);

	const handlePreview = () => {
		setEnvelopeClicked(true);
		audioRef.current?.play();

		setTimeout(() => {
			setPlaying(true);
			setPreview(false);
			document.documentElement.style.overflow = "";
		}, 6000);
	};

	useEffect(() => {
		document.documentElement.style.overflow = "hidden";

		return () => {
			document.documentElement.style.overflow = "";
		};
	}, []);

	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!imgRef.current) return;
			const scrollY = window.scrollY;
			// 0.4 = image moves at 40% of scroll speed (slower than page)
			imgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const logoRef = useRef<SVGPathElement | null>(null);

	useEffect(() => {
		if (!logoRef.current) return;

		console.log(logoRef.current.getTotalLength());
	}, []);

	return (
		<>
			<div
				className={classNames(styles.preview, {
					[styles["preview--hidden"]]: !preview,
				})}
			>
				<div
					onClick={handlePreview}
					className={classNames(styles.envelope, {
						[styles["envelope--disabled"]]: envelopeClicked,
					})}
				>
					<img
						className={styles["env-base"]}
						src="/wedding-three/envelope-base.svg"
						alt=""
					/>
					<img
						className={styles["env-bottom"]}
						src="/wedding-three/envelope-bottom.svg"
						alt=""
					/>
					<img
						className={styles["env-left"]}
						src="/wedding-three/envelope-left.svg"
						alt=""
					/>
					<img
						className={styles["env-right"]}
						src="/wedding-three/envelope-right.svg"
						alt=""
					/>
					<img
						className={classNames(styles.card, {
							[styles["card--active"]]: envelopeClicked,
						})}
						src={invitation.envelope_img}
						alt=""
					/>
					<img
						className={classNames(styles["env-top"], {
							[styles["env-top--active"]]: envelopeClicked,
						})}
						src="/wedding-three/envelope-top.svg"
						alt=""
					/>
				</div>
				<p
					className={classNames(styles["preview-hint"], {
						[styles["preview-hint--hidden"]]: envelopeClicked,
					})}
				>
					{t("previewHint")}
				</p>
			</div>
			<button onClick={togglePlay} className={styles["wedding-3__music-btn"]}>
				<div
					className={classNames(styles["music-btn-hint"], {
						[styles["music-btn-hint--active"]]: !preview,
					})}
				>
					<p
						style={{
							fontSize: "12px",
							whiteSpace: "nowrap",
							minWidth: 0,
							overflow: "hidden",
						}}
					>
						З любов’ю - натисніть, щоб слухати
					</p>
				</div>
				<div className={styles["equalizer-wrapper"]}>
					<div
						className={classNames(styles.equalizer, {
							[styles["paused"]]: !playing,
						})}
					>
						<span />
						<span />
						<span />
						<span />
					</div>
				</div>
			</button>
			<audio
				ref={audioRef}
				src={invitation.song}
				loop
				// TODO: learn this
				preload="auto"
			></audio>
			<main className={`${styles.main}  ${cormorantInfant.variable}`}>
				<section className={styles.hero}>
					<div className={styles["hero-hint"]}>
						<HandIcon size={32} />
					</div>
					<div className={`${styles["hero-container"]}`}>
						<p
							style={{ color: "#fff", opacity: 0 }}
							className={classNames(styles.txt, {
								[styles["active"]]: !preview,
							})}
						>
							{`${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`}
						</p>
						<p
							className={classNames(
								styles["setion__title"],
								alexBrush.className,
								{
									[styles["active"]]: !preview,
								},
							)}
							style={{ color: "#fff", fontSize: "3rem", opacity: 0 }}
						>
							Wedding day
						</p>

						<div
							className={classNames(styles["hero__img-wrapper"], {
								[styles["hero__img-wrapper--active"]]: !preview,
							})}
						>
							<img src="/wedding-three/heart-c.png" alt="" />
						</div>
						<svg
							width="700"
							viewBox={invitation.logoViewBox}
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<style>{`
								@keyframes drawK {
								0% { stroke-dashoffset: ${invitation.logoLength}; }
								100% { stroke-dashoffset: 0; }
								}

								.logo {
								stroke-dasharray: ${invitation.logoLength};
								stroke-dashoffset: ${invitation.logoLength};
								animation: ${!preview ? "drawK 25s 1s ease forwards" : "none"};
								}
							`}</style>
							<path
								ref={logoRef}
								className="logo"
								d={invitation.logoPath}
								stroke="#fff"
								strokeWidth="2.5"
							/>
						</svg>
					</div>
					<img
						className={styles["hero__img"]}
						ref={imgRef}
						src={invitation.heroImg}
						alt=""
						style={{
							willChange: "transform",
						}}
					/>
				</section>
				<section className={styles.section}>
					<img
						className={styles.animate}
						src="/wedding-three/02-c.png"
						width={256}
						height={256}
						alt=""
					/>
					<p
						style={{ whiteSpace: "pre-wrap" }}
						className={`${styles["section__title"]} ${styles.animate}`}
					>
						{guest ? `${guest.name}` : "Дорогі гості"}
					</p>
					<p className={`${styles.txt} ${styles.animate}`}>{t("text")}</p>
					<p style={{ fontSize: "24px" }} className={styles.animate}>
						{`${date.getDate()} ${genitive.charAt(0).toUpperCase() + genitive.slice(1)} ${date.getFullYear()}`}
					</p>
					<div className={`${styles.calendar} ${styles.animate}`}>
						<div className={styles["calendar-inner"]}>
							<div>{t("mon")}</div>
							<div>{t("tue")}</div>
							<div>{t("wed")}</div>
							<div>{t("thu")}</div>
							<div>{t("fri")}</div>
							<div>{t("sat")}</div>
							<div>{t("sun")}</div>
							{days2.map((day, index) => {
								return (
									<div
										key={index}
										className={
											day == date.getDate() ? styles["target-time"] : ""
										}
									>
										{day}
										{day == date.getDate() && (
											<svg
												style={{
													position: "absolute",
													transform: "translateY(2px)",
													width: "100%",
													height: "100%",
													color: "var(--accent-clr)",
												}}
												xmlns="http://www.w3.org/2000/svg"
												fill="currentColor"
												className="bi bi-heart"
												viewBox="0 0 16 16"
											>
												<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
											</svg>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<p className={`${styles.txt} ${styles.animate}`}>{t("text2")}</p>
				</section>
				<section className={styles.section}>
					<img
						className={styles.animate}
						src="/wedding-three/03-c.png"
						width={256}
						alt=""
					/>
					<p className={`${styles["section__title"]} ${styles.animate}`}>
						{t("addressesTitle")}
					</p>
					<div className={styles.addresses}>
						{invitation.addresses.map((address, i) => {
							// TODO: learn this
							const translated = t.has(address.title)
								? t(address.title)
								: address.title;

							return (
								<div key={i} className={styles.address}>
									<p
										style={{ display: "flex", flexDirection: "column" }}
										className={styles.animate}
									>
										<span className={styles.txt} style={{ fontSize: "2rem" }}>
											{translated}
										</span>
										<span style={{ fontSize: "24px" }} className={styles.txt}>
											{`${address.time} (${invitation.location_time})`}
										</span>
									</p>
									<span
										className={styles.animate}
										style={{
											border: "3px solid var(--accent-clr)",
											alignSelf: "center",
											width: "50px",
											height: "50px",
											borderRadius: "50%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											className="bi bi-building"
											viewBox="0 0 16 16"
										>
											<path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
											<path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
										</svg>
									</span>
									<p className={`${styles.txt} ${styles.animate}`}>
										{address.address_title}
									</p>
									<span
										style={{
											border: "3px solid var(--accent-clr)",
											alignSelf: "center",
											width: "50px",
											height: "50px",
											borderRadius: "50%",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
										className={styles.animate}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											className="bi bi-geo-alt"
											viewBox="0 0 16 16"
										>
											<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
											<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
										</svg>
									</span>
									<a
										className={`${styles.txt} ${styles.animate}`}
										style={{ color: "#000" }}
										href={address.address}
										target="_blank"
									>
										{address.address}
									</a>
									<iframe
										className={styles["address__map"]}
										src={address.address_url}
										// loading="lazy"
									></iframe>
									<a
										className={styles.link}
										href={address.address_destination_url}
										target="_blank"
									>
										{t("getDirection")}
									</a>
								</div>
							);
						})}
					</div>
				</section>
				<section className={styles.section}>
					<img
						className={styles.animate}
						src="/wedding-three/04-c.png"
						width={256}
						alt=""
					/>
					<p className={`${styles["section__title"]} ${styles.animate}`}>
						{t("countdownTitle")}
					</p>
					<div className={styles.countdown} id="date">
						<div className="animated-element">
							<span
								style={
									{
										"--procent": `${((days / 365) * 100).toFixed(1)}%`,
									} as CSSProperties
								}
								className={`${styles["countdown-circle"]} ${styles.animate}`}
							>
								{days}
							</span>
							<span className={`${styles.txt} ${styles.animate}`}>
								{helper(days, t("days.1"), t("days.2"), t("days.5"))}
							</span>
						</div>
						<div className="animated-element">
							<span
								style={
									{
										"--procent": `${((hours / 24) * 100).toFixed(1)}%`,
									} as CSSProperties
								}
								className={`${styles["countdown-circle"]} ${styles.animate}`}
							>
								{hours}
							</span>
							<span className={`${styles.txt} ${styles.animate}`}>
								{helper(hours, t("hours.1"), t("hours.2"), t("hours.5"))}
							</span>
						</div>
						<div>
							<span
								style={
									{
										"--procent": `${((minutes / 60) * 100).toFixed(1)}%`,
									} as CSSProperties
								}
								className={`${styles["countdown-circle"]} ${styles.animate}`}
							>
								{minutes}
							</span>
							<span className={`${styles.txt} ${styles.animate}`}>
								{helper(
									minutes,
									t("minutes.1"),
									t("minutes.2"),
									t("minutes.5"),
								)}
							</span>
						</div>
						<div className="animated-element">
							<span
								style={
									{
										"--procent": `${((seconds / 60) * 100).toFixed(1)}%`,
									} as CSSProperties
								}
								className={`${styles["countdown-circle"]} ${styles.animate}`}
							>
								{seconds}
							</span>
							<span className={`${styles.txt} ${styles.animate}`}>
								{helper(
									seconds,
									t("seconds.1"),
									t("seconds.2"),
									t("seconds.5"),
								)}
							</span>
						</div>
					</div>
				</section>
				{invitation.gallery && (
					<section
						className={styles.section}
						style={{ overflow: "hidden", padding: "0 50px" }}
					>
						<p className={`${styles["section__title"]} ${styles.animate}`}>
							Галерея
						</p>
						<Swiper
							effect={"cards"}
							grabCursor={true}
							modules={[EffectCards]}
							className={styles.swiper}
						>
							{invitation.gallery.map((img, index) => {
								return (
									<SwiperSlide key={index} className="slide">
										<img src={img} alt="" />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</section>
				)}
				<section className={styles.section}>
					<img
						className={styles.animate}
						src="/wedding-three/05-c.png"
						width={256}
						alt=""
					/>
					<p className={`${styles.txt} ${styles.animate}`}>
						{t("text3")}
						<br />
						{/* <span style={{ fontSize: "2rem" }}>{t("text4")}</span> */}
						<span style={{ fontSize: "2rem" }}>
							{invitation.hisName} & {invitation.herName}
						</span>
					</p>
				</section>
			</main>
		</>
	);
}
