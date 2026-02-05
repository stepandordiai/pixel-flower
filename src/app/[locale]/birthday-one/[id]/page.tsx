"use client";

import { useEffect, useState } from "react";
import templatesData from "./../../../assets/data/templates-data.json";

import { useParams } from "next/navigation";
import Container from "@/app/components/Container/Container";
import ContainerInner from "@/app/components/ContainerInner/ContainerInner.";
import { notFound } from "next/navigation";
import AnimatedTxt from "@/app/components/AnimatedTxt/AnimatedTxt";
import ScrollToTop from "@/app/utils/ScrollToTop";
import "./BirthdayOne.scss";

export default function BirthdayOne() {
	const { id } = useParams();

	const template = templatesData.find((template) => template.id === id);

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
	const targetDate: any = new Date(template.time);
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

		const animatedElements = document.querySelectorAll(
			".birthday-one__animated-element",
		);

		window.addEventListener("scroll", () => {
			animatedElements.forEach((el) => {
				const elRect = el.getBoundingClientRect();

				if (elRect.top < window.innerHeight) {
					el.classList.add("birthday-one__animated-element--active");
				}
			});
		});

		animatedElements.forEach((el) => {
			const elRect = el.getBoundingClientRect();

			if (elRect.top < window.innerHeight) {
				el.classList.add("birthday-one__animated-element--active");
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
		const scroll = document.querySelector(
			".birthday-one__scroll",
		) as HTMLElement;

		window.addEventListener("scroll", () => {
			if (document.documentElement.scrollTop > 0) {
				scroll.classList.add("birthday-one__scroll--hide");
			} else {
				scroll.classList.remove("birthday-one__scroll--hide");
			}
		});
	}, []);

	return (
		<>
			<ScrollToTop />
			<main className="birthday-one__envelope-silver">
				<Container>
					<section className="birthday-one__hero">
						<img
							className="birthday-one__hero-bg"
							src="/birthday-one/17.jpg"
							alt=""
						/>
						<p className="birthday-one__hero-date">
							<AnimatedTxt>
								{`${date} - ${month} - ${template.time.slice(0, 4)}`}
							</AnimatedTxt>
						</p>
						<div className="birthday-one__top-title font-accent">
							<AnimatedTxt>Birthday Party</AnimatedTxt>
						</div>
						<p style={{ padding: "25px 0" }}>
							<AnimatedTxt>at 19:00</AnimatedTxt>
						</p>
						<p style={{ fontSize: "1.5rem" }}>
							<AnimatedTxt>Diana is turning 18!</AnimatedTxt>
						</p>
						<div className="birthday-one__scroll">
							Прокрутіть вниз, щоб дізнатися більше
						</div>
					</section>
					<div className="lolo">
						<ContainerInner>
							<p className="birthday-one__font-m birthday-one__font-accent">
								<AnimatedTxt>Дорогі друзі</AnimatedTxt>
							</p>
							<div className="birthday-one__font-s">
								<p style={{ fontSize: "1.2rem" }}>
									<AnimatedTxt>
										Хочу запросити вас на святкування мого дня народження! Для
										мене буде дуже важливо провести цей день разом з людьми, які
										роблять моє життя яскравішим. Буду дуже рада бачити вас,
										поспілкуватися, посміятися й просто чудово провести час
										разом!
									</AnimatedTxt>
								</p>
							</div>
							<p className="birthday-one__font-m birthday-one__font-accent">
								<AnimatedTxt>
									Неділя, {date} {template.monthDeclined},{" "}
									{template.time.slice(0, 4)}
								</AnimatedTxt>
							</p>
							<div className="birthday-one__silver-calendar-wrapper birthday-one__font-s">
								<div className="birthday-one__silver-calendar">
									<div>
										<AnimatedTxt>Пн</AnimatedTxt>
									</div>
									<div>
										<AnimatedTxt>Вт</AnimatedTxt>
									</div>
									<div>
										<AnimatedTxt>Ср</AnimatedTxt>
									</div>
									<div>
										<AnimatedTxt>Чт</AnimatedTxt>
									</div>
									<div>
										<AnimatedTxt>Пт</AnimatedTxt>
									</div>
									<div>
										<AnimatedTxt>Сб</AnimatedTxt>
									</div>
									<div>
										<AnimatedTxt>Нд</AnimatedTxt>
									</div>
									{/* {days2.map((day, index) => {
										return (
											<div
												key={index}
												className={
													day == date ? "birthday-one__target-time" : ""
												}
											>
												<AnimatedTxt>{day}</AnimatedTxt>
												{day == date && (
													<img
														className="birthday-one__calendar-img "
														src="/birthday-one/5.webp"
														alt=""
													/>
												)}
											</div>
										);
									})} */}
								</div>
							</div>
							<p className="birthday-one__font-m birthday-one__font-accent">
								<AnimatedTxt>
									Давайте створимо спогади, які залишаться на все життя!
								</AnimatedTxt>
							</p>
						</ContainerInner>
						<ContainerInner>
							<img src="/birthday-one/4.webp" width={100} height={100} alt="" />
							<p className="font-m font-accent">
								<AnimatedTxt>Зворотний відлік до Дня Народження</AnimatedTxt>
							</p>
							<div className="birthday-one__silver-date" id="date">
								<AnimatedTxt>
									<div>
										<span className="birthday-one__font-l">{days}</span>
										<span className="birthday-one__font-s"> днів</span>
									</div>
								</AnimatedTxt>
								<AnimatedTxt>
									<div>
										<span className="birthday-one__font-l">{hours}</span>
										<span className="birthday-one__font-s"> годин(а)</span>
									</div>
								</AnimatedTxt>
								<AnimatedTxt>
									<div>
										<span className="birthday-one__font-l">{minutes}</span>
										<span className="birthday-one__font-s"> хвилин(а)</span>
									</div>
								</AnimatedTxt>
								<AnimatedTxt>
									<div>
										<span className="birthday-one__font-l">{seconds}</span>
										<span className="birthday-one__font-s"> секунд(а)</span>
									</div>
								</AnimatedTxt>
							</div>
						</ContainerInner>
						<ContainerInner>
							<img src="/birthday-one/8.webp" width={100} height={100} alt="" />
							<div>
								<p className="font-m font-accent">
									<AnimatedTxt>Місце проведення</AnimatedTxt>
								</p>
								<p className=" font-s">
									<AnimatedTxt>{template.location_time}</AnimatedTxt>
								</p>
							</div>
							{template.adresess.map((address, index) => {
								return (
									<div key={index} className="birthday-one__container-inner">
										{/* <p
										style={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
										}}
										className="birthday-one__animated-element font-m font-accent"
									>
										<span>{address.title}</span>
										<span>{address.time}</span>
									</p> */}
										<p className="font-s">
											<AnimatedTxt>{address.address_title}</AnimatedTxt>
										</p>
										<p className="font-s">
											<AnimatedTxt>{address.address}</AnimatedTxt>
										</p>
										<iframe
											style={{ width: "100%", height: 400 }}
											src={address.address_url}
											loading="lazy"
										></iframe>
										<a
											className="birthday-one__silver-address__link font-s"
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
								<p className="birthday-one__font-m font-accent">
									<AnimatedTxt>Дрес-код</AnimatedTxt>
								</p>
								<p className="birthday-one__font-s">
									<AnimatedTxt>
										Мені буде дуже приємно, якщо ви підтримаєте мій дрес-код.
									</AnimatedTxt>
								</p>
								<div className="birthday-one__colors-container">
									<img src="/birthday-one/10.webp" alt="" />
									<img src="/birthday-one/11.webp" alt="" />
									<img src="/birthday-one/12.webp" alt="" />
									<img src="/birthday-one/13.webp" alt="" />
								</div>
							</ContainerInner>
						)}
						<ContainerInner>
							<p className="font-m font-accent">
								<AnimatedTxt>Буду дуже рада бачити вас!</AnimatedTxt>
							</p>
							<div>
								<img
									src="/birthday-one/14.webp"
									width={100}
									height={100}
									alt=""
								/>
								<img
									src="/birthday-one/9.webp"
									width={150}
									height={150}
									alt=""
								/>
							</div>
						</ContainerInner>
					</div>
				</Container>
			</main>
		</>
	);
}
