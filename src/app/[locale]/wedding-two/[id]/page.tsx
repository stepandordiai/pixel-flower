"use client";

import { useEffect, useState } from "react";
import templatesData from "./../../../assets/data/templates-data.json";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/effect-cards";
import "swiper/css/effect-fade";

// import required modules
import { Autoplay, EffectFade } from "swiper/modules";

import { useParams } from "next/navigation";
import Container from "@/app/components/Container/Container";
import ContainerInner from "@/app/components/ContainerInner/ContainerInner.";
import { notFound } from "next/navigation";
import ScrollToTop from "@/app/utils/ScrollToTop";
import "./WeddingTwo.scss";

export default function WeddingTwo() {
	const params = useParams();

	const template = templatesData.find((template) => template.id === params?.id);

	if (!template) {
		return notFound();
	}

	const date = template.time.slice(8, 10);
	const month = template.time.slice(5, 7);

	// TODO:
	const targetDate: any = new Date(template.time);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [playAudio, setPlayAudio] = useState(false);

	const handlePlayAudio = () => {
		setPlayAudio((prev) => !prev);
	};

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

		const animatedElements = document.querySelectorAll(".animated-element");

		window.addEventListener("scroll", () => {
			animatedElements.forEach((el) => {
				const elRect = el.getBoundingClientRect();

				if (elRect.top < window.innerHeight) {
					el.classList.add("animated-element--active");
				}
			});
		});

		animatedElements.forEach((el) => {
			const elRect = el.getBoundingClientRect();

			if (elRect.top < window.innerHeight) {
				el.classList.add("animated-element--active");
			}
		});
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

	const firstDay = new Date(
		Number(template.time.slice(0, 4)),
		Number(month) - 1,
		1,
	);

	let startWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...

	const febDayNumbers = getDaysOfMonth(
		Number(template.time.slice(0, 4)),
		Number(month) - 1,
	).map((d) => d.getDate());

	startWeekday = (startWeekday + 6) % 7; // now Monday=0, Tuesday=1, ...

	for (let i = 0; i < startWeekday; i++) {
		days2.push(null); // empty slot
	}

	days2.push(...febDayNumbers);

	useEffect(() => {
		const scroll = document.querySelector(".scroll");

		window.addEventListener("scroll", () => {
			if (document.documentElement.scrollTop > 0) {
				scroll?.classList.add("scroll--hide");
			} else {
				scroll?.classList.remove("scroll--hide");
			}
		});

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	const handleEnvelope = (e: any) => {
		e.currentTarget.classList.add("envelope--stop-animation");
		const envTop = document.querySelector(".env-top") as HTMLElement;
		envTop.classList.add("env-top--active");
		const card = document.querySelector(".card") as HTMLElement;
		card.classList.add("card--active");
		const envelopeTxt = document.querySelector(".envelope-txt") as HTMLElement;
		envelopeTxt.style.display = "none";
		setPlayAudio((prev) => !prev);

		setTimeout(() => {
			const loading = document.querySelector(".loading") as HTMLElement;
			loading.classList.add("loading--hide");
			document.body.style.overflow = "auto";
		}, 4000);
	};

	// TODO: learn this
	function helper(
		time: number,
		one: string,
		two: string,
		five: string,
	): string {
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
	}

	return (
		<>
			<ScrollToTop />
			<div className="loading">
				<div onClick={handleEnvelope} className="envelope">
					<img
						className="env-base"
						src="/wedding-two/envelope-base.svg"
						alt=""
					/>
					<img
						className="env-bottom"
						src="/wedding-two/envelope-bottom.svg"
						alt=""
					/>
					<img
						className="env-left"
						src="/wedding-two/envelope-left.svg"
						alt=""
					/>
					<img
						className="env-right"
						src="/wedding-two/envelope-right.svg"
						alt=""
					/>
					<img className="env-top" src="/wedding-two/envelope-top.svg" alt="" />
					<img className="card" src={template.envelope_img} alt="" />
				</div>
				<div className="envelope-txt">
					Натисніть на конверт, щоб відкрити запрошення!
				</div>
			</div>
			<main className="envelope-silver">
				<Container>
					<div className="envelope-silver__top">
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<div className="envelope-silver__top-logo font-m">
								<span>{template.hisName?.[0]}</span>
								<span>{template.herName?.[0]}</span>
							</div>
							<img className="top-img" src="/wedding-two/lemon.png" alt="" />
						</div>
						<div className="envelope-silver__top-title font-l font-accent">
							<span>{template.hisName}</span>
							<span className="font-m">та</span>
							<span>{template.herName}</span>
						</div>
						<img className="build" src="/wedding-two/build.png" alt="" />
						<div className="scroll">Прокрутіть вниз, щоб дізнатися більше</div>
					</div>
					<ContainerInner>
						<p className="animated-element font-m font-accent">Дорогі гості</p>
						<div className="font-s">
							<p className="animated-element">
								Ми надзвичайно раді поділитися з Вами цим особливим днем!
							</p>
							<br />
							<p className="animated-element">
								Розпочинаючи нашу спільну подорож, ми будемо щасливі, якщо Ви
								приєднаєтеся до святкування нашого весілля.
							</p>
							<br />
							<p className="animated-element">
								Тут ви знайдете всю необхідну інформацію - розклад подій,
								зворотний відлік, інформацію про місце проведення, галерею та
								інше.
							</p>
							<br />
							<p className="animated-element">
								Ваша присутність для нас безцінна, і ми з нетерпінням чекаємо,
								щоб розділити радість, сміх і любов цього дня.
							</p>
						</div>
						<p className="animated-element font-m font-accent">
							Неділя, {date} {template.monthDeclined},{" "}
							{template.time.slice(0, 4)}
						</p>
						<div className="silver-calendar-wrapper animated-element font-s">
							<div className="silver-calendar">
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
											className={day == Number(date) ? "target-time" : ""}
										>
											{day}
											{day == Number(date) && (
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
						<p className="animated-element font-m font-accent">
							Давайте створимо спогади, які залишаться на все життя!
						</p>
					</ContainerInner>
					<ContainerInner>
						<img
							className="animated-element"
							src="/wedding-two/lemon.png"
							alt=""
						/>
						<p className="animated-element font-m font-accent">
							Зворотний відлік до нашого Великого дня
						</p>
						<div className="silver-date" id="date">
							<div className="animated-element">
								<span className="font-l">{days}</span>
								<span className="font-s">
									{helper(days, "день", "дні", "днів")}
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
					</ContainerInner>
					<ContainerInner>
						<img
							className="animated-element"
							src="/wedding-two/lemon.png"
							alt=""
						/>
						<div>
							<p className="animated-element font-m font-accent">
								Адреси святкування
							</p>
						</div>
						{template.addresses.map((address, index) => {
							return (
								<div key={index} className="container-inner">
									<p
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
										}}
										className="animated-element font-m font-accent"
									>
										{/* FIXME: */}
										<span>{(address as any).title || ""}</span>
										<span>
											{(address as any).time || ""}({template.location_time})
										</span>
									</p>
									<p className="animated-element font-s">
										{address.address_title}
									</p>
									<p className="animated-element font-s">{address.address}</p>
									<iframe
										style={{ width: "100%", height: 400 }}
										className="animated-element"
										src={address.address_url}
										loading="lazy"
									></iframe>
									<a
										className="silver-address__link animated-element font-s"
										href={address.address_destination_url}
										target="_blank"
									>
										Отримати маршрут
									</a>
								</div>
							);
						})}
					</ContainerInner>
					{template.dress_code && (
						<ContainerInner>
							<p className="font-m font-accent animated-element">Дрес-код</p>
							<p className="font-s animated-element">
								Нам буде дуже приємно, якщо ви додасте у свій образ відтінки з
								нашої весільної палітри.
							</p>
							<div className="colors-container animated-element">
								<div style={{ background: "#bab86c" }}></div>
								<div style={{ background: "#ffffff" }}></div>
								<div style={{ background: "#F5F5DC" }}></div>
								<div style={{ background: "#7B3F00" }}></div>
							</div>
						</ContainerInner>
					)}
					<ContainerInner>
						<img
							className="animated-element"
							src="/wedding-two/lemon.png"
							alt=""
						/>
						<p className="animated-element font-m font-accent">Галерея</p>
						<Swiper
							effect={"fade"}
							loop={true}
							speed={1000}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
							}}
							modules={[EffectFade, Autoplay]}
							className="silver-swiper animated-element"
						>
							{template.gallery.map((img, index) => {
								return (
									<SwiperSlide key={index} className="slide">
										<img src={img} alt="" loading="lazy" />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</ContainerInner>
					<ContainerInner>
						<img
							className="animated-element"
							src="/wedding-two/lemon.png"
							alt=""
						/>
						<p className="animated-element font-m font-accent">
							Ми з нетерпінням чекаємо, щоб відсвяткувати разом з вами!
						</p>
						<div className="envelope-silver__top-logo animated-element font-m">
							<span>{template.hisName?.[0]}</span>
							<span>{template.herName?.[0]}</span>
						</div>
					</ContainerInner>
				</Container>
			</main>
			<button onClick={handlePlayAudio} className="floating-btn">
				{!playAudio ? (
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
			{template.song && playAudio && (
				<audio autoPlay src={template.song}></audio>
			)}
		</>
	);
}
