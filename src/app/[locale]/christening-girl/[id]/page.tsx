"use client";

import { useEffect, useState } from "react";
import templatesData from "./../../../assets/data/templates-data.json";
import { useParams } from "next/navigation";
import Container from "@/app/components/Container/Container";
import { notFound } from "next/navigation";
import ScrollToTop from "@/app/utils/ScrollToTop";
import "./ChristeningGirl.scss";

const ChristeningGirl = () => {
	const params = useParams();
	const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

	// FIXME: template if no then real
	const template = templatesData.find((template) => template.id === id);

	if (!template) {
		return notFound();
	}

	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlayAudio = () => {
		setIsPlaying((prev) => !prev);
	};

	useEffect(() => {
		const audio = document.querySelector(
			".christening-girl__audio",
		) as HTMLAudioElement;

		if (!isPlaying) {
			audio?.pause();
		} else {
			audio?.play();
		}
	}, [isPlaying]);

	const date = template.time.slice(8, 10).startsWith("0")
		? template.time.slice(9, 10)
		: template.time.slice(8, 10);
	const month = template.time.slice(5, 7).startsWith("0")
		? template.time.slice(6, 7)
		: template.time.slice(5, 7);

	// TODO:
	const targetDate = new Date(template.time);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		let interval = setInterval(() => {
			const date = new Date();
			// TODO: ?
			const dateDifference = targetDate.getTime() - date.getTime();
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
		const scroll = document.querySelector(
			".christening-girl__scroll-chr",
		) as HTMLElement;
		const images = document.querySelectorAll(
			".christening-girl__gallery-masonry img",
		);

		window.addEventListener("scroll", () => {
			if (document.documentElement.scrollTop > 0) {
				scroll.classList.add("christening-girl__scroll-chr--hide");
			} else {
				scroll.classList.remove("christening-girl__scroll-chr--hide");
			}

			images.forEach((img) => {
				const imgRect = img.getBoundingClientRect();
				if (imgRect.top < window.innerHeight - 100) {
					img.classList.add("christening-girl__img--active");
				}
			});
		});
	}, []);

	useEffect(() => {
		const animatedElements = document.querySelectorAll(
			".christening-girl__animate",
		);

		animatedElements.forEach((el) => {
			el.classList.remove("christening-girl__animate--active");
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const el = entry.target;
						el.classList.add("christening-girl__animate--active");
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

	useEffect(() => {
		document.body.style.overflow = "hidden";
	}, []);

	const handleLoading = () => {
		document.body.style.overflow = "auto";
		const el = document.querySelector(
			".christening-girl__loading",
		) as HTMLElement;
		el.classList.add("christening-girl__loading--hide");
		const el2 = document.querySelector(".christening-girl") as HTMLElement;
		el2.style.display = "flex";
		setIsPlaying(true);
		setTimeout(() => {
			const hero = document.querySelector(
				".christening-girl__hero",
			) as HTMLElement;

			hero.classList.add("christening-girl__hero--active");

			const rainbow = document.querySelectorAll(".christening-girl__rainbow");

			rainbow.forEach((el) => {
				const rainbows = el.querySelectorAll(".christening-girl__rainbow div");
				document.addEventListener("scroll", () => {
					const elRect = el.getBoundingClientRect();
					rainbows.forEach((el, index) => {
						if (elRect.top < window.innerHeight) {
							setTimeout(() => {
								el.classList.add("christening-girl__rainbow--active");
							}, 100 * index);
						}
					});
				});
				const elRect = el.getBoundingClientRect();
				rainbows.forEach((el, index) => {
					if (elRect.top < window.innerHeight) {
						setTimeout(() => {
							el.classList.add("christening-girl__rainbow--active");
						}, 100 * index);
					}
				});
			});
		}, 1000);
	};

	const color = template.color;
	document.documentElement.style.setProperty("--color", color ?? "#000");

	const helper = (
		time: number,
		one: string,
		two: string,
		five: string,
	): string => {
		const lastDigit = time % 10;
		const lastTwoDigits = time % 100;

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
	};

	return (
		<>
			<ScrollToTop />
			<div onClick={handleLoading} className="christening-girl__loading">
				<img src="/christening-girl/01.webp" alt="" />
				<img src="/christening-girl/01.webp" alt="" />
				<img src="/christening-girl/01.webp" alt="" />
				<img src="/christening-girl/01.webp" alt="" />
				<img src="/christening-girl/01.webp" alt="" />
				<img src="/christening-girl/01.webp" alt="" />
				<img src="/christening-girl/01.webp" alt="" />
				<div>Торкніться екрана, щоб відкрити запрошення!</div>
			</div>
			<main className="christening-girl" style={{ display: "none" }}>
				<Container>
					<div className="christening-girl__hero">
						<div className="christening-girl__home__top-inner-chr">
							<img
								className="christening-girl__hero-img"
								src="/christening-girl/02.webp"
								alt=""
							/>
							<div className="christening-girl__hero-date">
								{template.date} {template.monthDeclined} {template.year} року
							</div>
							<p className="christening-girl__hero-title">
								Таїнство хрещення {template.child_name}
							</p>
						</div>
						<div className="christening-girl__rainbow">
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
						<img
							className="christening-girl__hero-img-2"
							src="/christening-girl/01.webp"
							alt=""
						/>
						<img
							className="christening-girl__hero-img-3"
							src="/christening-girl/01.webp"
							alt=""
						/>

						<div className="christening-girl__hero-scroll">
							Прокрутіть вниз, щоб дізнатися більше
						</div>
					</div>
					<div className="christening-girl__wrapper">
						<div className="christening-girl__swiper-cont christening-girl__animate">
							<img
								className="christening-girl__iimg"
								src={template.gallery[0]}
								alt=""
							/>
							<img
								className="christening-girl__gallery-float-img"
								src="/christening-girl/06.webp"
								alt=""
							/>
						</div>
						<img
							className="christening-girl__floated-img-3 christening-girl__animate"
							src="/christening-girl/03.webp"
							alt=""
						/>
						<p className="christening-girl__animate christening-girl__txt-decoration">
							<span className="christening-girl__font-l">Дорогі гості,</span>
							<br />з великою радістю та любов’ю запрошуємо Вас розділити з нами
							важливу подію
							<br />
							<br />
							{template.type} {template.child_name}
						</p>
					</div>
					<div className="christening-girl__calendar-wrapper christening-girl__animate">
						<p className="christening-girl__calendar-top">{`${template.monthName} ${template.time.slice(
							0,
							4,
						)}`}</p>
						<div className="christening-girl__calendar">
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
											day == Number(date)
												? "christening-girl__calendar-target-time"
												: ""
										}
									>
										{day}
										{day == Number(date) && (
											<div className="christening-girl__calendar-img-container">
												<img src="/christening-girl/07.png" alt="" />
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>
					<p className="christening-girl__pepe-chr christening-girl__animate christening-girl__txt-decoration">
						Ми не уявляємо цей радісний день без Вас - близьких і дорогих нам
						людей!
					</p>
					<div style={{ padding: 10 }} className="christening-girl__wrapper">
						<img
							className="christening-girl__floated-img-3 christening-girl__animate"
							src="/christening-girl/03.webp"
							alt=""
						/>
						<div className="christening-girl__addresses-container">
							<p className="christening-girl__animate christening-girl__txt-decoration christening-girl__font-l">
								Адреси святкування
							</p>
							<p
								style={{ marginBottom: 25 }}
								className=" christening-girl__font-m christening-girl__animate"
							></p>
							<div className="christening-girl__addresses-chr">
								{template.addresses.map((address, index) => {
									return (
										<div key={index} className="christening-girl__address-chr">
											<p className="christening-girl__address__title-chr christening-girl__animate christening-girl__txt-decoration">
												{"title" in address && address.title && (
													<span>{address.title}</span>
												)}
												{"time" in address && address.time && (
													<span>
														{address.time}({template.location_time})
													</span>
												)}
											</p>
											<p className="christening-girl__address__info-chr christening-girl__animate">
												{address.address_title}
											</p>
											<p
												style={{ marginBottom: 10 }}
												className="christening-girl__address__info-chr christening-girl__animate"
											>
												{address.address}
											</p>
											<iframe
												className="christening-girl__map christening-girl__animate"
												src={address.address_url}
												loading="lazy"
											></iframe>
											<a
												className="christening-girl__address__link-chr christening-girl__animate"
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
					</div>

					<div
						style={{ padding: "10px" }}
						className="christening-girl__wrapper"
					>
						<div className="christening-girl__swiper-cont-2 christening-girl__animate">
							<img
								className="christening-girl__iimg"
								src={template.gallery[1]}
								alt=""
								loading="lazy"
							/>
							<img
								className="christening-girl__gallery-float-img-2"
								src="/christening-girl/06.webp"
								alt=""
							/>
						</div>
					</div>
					<div className="christening-girl__wrapper">
						<div className="christening-girl__date-container-chr">
							<p className="christening-girl__font-l christening-girl__animate christening-girl__txt-decoration">
								Святкування почнеться через:
							</p>
							<div
								className="christening-girl__countdown christening-girl__animate"
								id="date"
							>
								<div>
									<p>{days}</p>
									<p>{helper(days, "день", "дні", "днів")}</p>
								</div>
								<div>
									<p>{hours}</p>
									<p>{helper(hours, "година", "години", "годин")}</p>
								</div>
								<div>
									<p>{minutes}</p>
									<p>{helper(minutes, "хвилина", "хвилини", "хвилин")}</p>
								</div>
								<div>
									<p>{seconds}</p>
									<p>{helper(seconds, "секунда", "секунди", "секунд")}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="christening-girl__wrapper">
						<img
							className="christening-girl__floated-img-3 christening-girl__animate"
							src="/christening-girl/04.webp"
							alt=""
						/>
						<p className="christening-girl__font-l christening-girl__animate christening-girl__txt-decoration">
							З любов’ю,
							<br />
							{template.father_name} та {template.mother_name}
						</p>
						<div style={{ padding: 10 }}>
							<div className="christening-girl__swiper-cont-2 christening-girl__animate">
								<img
									className="christening-girl__iimg"
									src={template.gallery[2]}
									alt=""
									loading="lazy"
								/>
								<img
									className="christening-girl__gallery-float-img-2"
									src="/christening-girl/05.webp"
									alt=""
								/>
							</div>
						</div>

						<div>
							<div className="christening-girl__rainbow-bottom christening-girl__animate">
								<div className="christening-girl__rainbow">
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
							<img
								className="christening-girl__rainbow-img-3 christening-girl__animate"
								src="/christening-girl/01.webp"
								alt=""
							/>
						</div>
					</div>
				</Container>
			</main>
			<button onClick={handlePlayAudio} className="christening-girl__audio-btn">
				{!isPlaying ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50%"
						height="50%"
						fill="currentColor"
						className="bi bi-play-fill"
						viewBox="0 0 16 16"
					>
						<title>Play</title>
						<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="50%"
						height="50%"
						fill="currentColor"
						className="bi bi-pause-fill"
						viewBox="0 0 16 16"
					>
						<title>Pause</title>
						<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
					</svg>
				)}
			</button>
			<audio
				className="christening-girl__audio"
				autoPlay
				src={template.song}
			></audio>
		</>
	);
};

export default ChristeningGirl;
