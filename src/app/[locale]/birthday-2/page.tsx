"use client";

import { useEffect, useState } from "react";
import templates from "@/app/assets/data/templates.json";
import Container from "@/app/components/Container/Container";
import "./BirthdayTwo.scss";

const template = templates.find((template) => template.id === "birthday-2")!;

const countdownHelper = (
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

// TODO: learn this
const getMonthName = (date: Date) => {
	const nominative = date.toLocaleDateString("uk-UA", { month: "long" });

	const genitive = date
		.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })
		.replace(/^\d+\s*/, "");

	return { nominative, genitive };
};

export default function BirthdayTwoTemplate() {
	const fakeDate = new Date();
	fakeDate.setDate(fakeDate.getDate() + 3);

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
		const scroll = document.querySelector(".scroll-chr") as HTMLElement;
		const images = document.querySelectorAll(".gallery-masonry img");

		window.addEventListener("scroll", () => {
			if (document.documentElement.scrollTop > 0) {
				scroll.classList.add("scroll-chr--hide");
			} else {
				scroll.classList.remove("scroll-chr--hide");
			}

			images.forEach((img) => {
				const imgRect = img.getBoundingClientRect();
				if (imgRect.top < window.innerHeight - 100) {
					img.classList.add("img--active");
				}
			});
		});
	}, []);

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

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	const handleLoading = () => {
		document.body.style.overflow = "";
		const el = document.querySelector(".loading-chr") as HTMLElement;
		el.classList.add("loading--hide");

		setTimeout(() => {
			const el3 = document.querySelector(".home__top-chr") as HTMLElement;

			el3.classList.add("home__top-chr--active");

			const rainbow = document.querySelectorAll(".rainbow");

			rainbow.forEach((el) => {
				const rainbows = el.querySelectorAll(".pp");
				document.addEventListener("scroll", () => {
					const elRect = el.getBoundingClientRect();
					rainbows.forEach((el, index) => {
						if (elRect.top < window.innerHeight) {
							setTimeout(() => {
								el.classList.add("rainbow-el--active");
							}, 100 * index);
						}
					});
				});
				const elRect = el.getBoundingClientRect();
				rainbows.forEach((el, index) => {
					if (elRect.top < window.innerHeight) {
						setTimeout(() => {
							el.classList.add("rainbow-el--active");
						}, 100 * index);
					}
				});
			});
		}, 1000);
	};

	// TODO: learn this
	const { nominative, genitive } = getMonthName(fakeDate);

	return (
		<>
			<div onClick={handleLoading} className="loading-chr">
				<img src="/christening-boy/01.webp" alt="" />
				<img src="/christening-boy/01.webp" alt="" />
				<img src="/christening-boy/01.webp" alt="" />
				<img src="/christening-boy/01.webp" alt="" />
				<img src="/christening-boy/01.webp" alt="" />
				<img src="/christening-boy/01.webp" alt="" />
				<img src="/christening-boy/01.webp" alt="" />
				<div className="loading-txt">
					Торкніться екрана, щоб відкрити запрошення!
				</div>
			</div>
			<main className="birthday-2">
				<Container>
					<div className="home__top-chr">
						<div className="home__top-inner-chr">
							<img
								className="floated-img"
								src="/christening-boy/02.webp"
								alt=""
							/>
							<div className="home__top-date-chr">
								{fakeDate.getDate()}{" "}
								{genitive.charAt(0).toUpperCase() + genitive.slice(1)}{" "}
								{fakeDate.getFullYear()} року
							</div>
							<p className="home__top-title-chr">
								День народження {template.child_name}
							</p>
						</div>
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
						<img
							className="floated-img-1"
							src="/christening-boy/01.webp"
							alt=""
						/>
						<img
							className="floated-img-2"
							src="/christening-boy/01.webp"
							alt=""
						/>

						<div className="scroll-chr">
							Прокрутіть вниз, щоб дізнатися більше
						</div>
					</div>
					<div className="wrapper">
						<div className="swiper-cont animated-element1">
							<img className="iimg" src={template.gallery[0]} alt="" />
							<img
								className="gallery-float-img"
								src="/christening-boy/06.webp"
								alt=""
							/>
						</div>
						<img
							className="floated-img-3 animated-element1"
							src="/christening-boy/03.webp"
							alt=""
						/>
						<p className="pepe-chr animated-element1">
							<span>Дорогі гості,</span>
							<br />
							зі щирою любов’ю запрошуємо Вас приєднатися до святкування, що має
							для нас велике значення.
							<br />
							<br />
							День народження нашого сина {template.child_name}
						</p>
					</div>

					<div className="calendar-wrapper-chr animated-element1">
						<p className="calendar-top-christening">
							{nominative.charAt(0).toUpperCase() + nominative.slice(1)}{" "}
							{fakeDate.getFullYear()}
						</p>
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
											day == fakeDate.getDate() ? "target-time-chr" : ""
										}
									>
										{day}
										{day == fakeDate.getDate() && (
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
						Ваше тепло і присутність роблять цей день незабутнім - ми щиро
						хочемо розділити його саме з Вами!
					</p>
					<div style={{ padding: 10 }} className="wrapper">
						<img
							className="floated-img-3 animated-element1"
							src="/christening-boy/03.webp"
							alt=""
						/>
						<div className="addresses-container">
							<p className="addresses__title-chr animated-element1">
								Адреса святкування
							</p>
							<div className="addresses-chr">
								{template.addresses.map((address, index) => {
									return (
										<div key={index} className="address-chr">
											<p
												style={{
													fontSize: "18px",
													fontWeight: 500,
													display: "flex",
													justifyContent: "space-between",
												}}
												className="animated-element1"
											>
												<span>{address.title}</span>
												<span>
													{address.time} ({template.location_time})
												</span>
											</p>
											<p className="address__info-chr animated-element1">
												{address.address_title}
											</p>
											<a
												style={{ marginBottom: 10, color: "#000" }}
												className="address__info-chr animated-element1"
												href={address.address_destination_url}
												target="_blank"
											>
												{address.address}
											</a>
											<iframe
												className="birthday-1-address-map animated-element1"
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
						</div>
					</div>

					<div style={{ padding: "10px" }} className="wrapper">
						<div className="swiper-cont-2 animated-element1">
							<img className="iimg" src={template.gallery[1]} alt="" />
							<img
								className="gallery-float-img-2"
								src="/christening-boy/06.webp"
								alt=""
							/>
						</div>
					</div>
					<div className="wrapper">
						<div className="date-container-chr">
							<p className="page-title-chr animated-element1">
								Святкування почнеться через:
							</p>
							<div className="date-chr animated-element1" id="date">
								<div>
									<p>{days}</p>
									<p>{countdownHelper(days, "день", "дні", "днів")}</p>
								</div>
								<div>
									<p>{hours}</p>
									<p>{countdownHelper(hours, "година", "години", "годин")}</p>
								</div>
								<div>
									<p>{minutes}</p>
									<p>
										{countdownHelper(minutes, "хвилина", "хвилини", "хвилин")}
									</p>
								</div>
								<div>
									<p>{seconds}</p>
									<p>
										{countdownHelper(seconds, "секунда", "секунди", "секунд")}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="wrapper">
						<img
							className="floated-img-3 animated-element1"
							src="/christening-boy/04.webp"
							alt=""
						/>
						<p className="page-title-chr animated-element1">
							З любов’ю,
							<br />
							{template.father_name} та {template.mother_name}
						</p>
						<div style={{ padding: 10 }}>
							<div className="swiper-cont-2 animated-element1">
								<img className="iimg" src={template.gallery[2]} alt="" />
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
