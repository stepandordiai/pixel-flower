"use client";

import { useEffect, useState } from "react";
import templatesData from "./../../../assets/data/templates-data.json";
import { useParams } from "next/navigation";
// import Header from "../../components/Header/Header";
import Container from "@/app/components/Container/Container";
import { notFound } from "next/navigation";
import ScrollToTop from "@/app/utils/ScrollToTop";
import "./BirthdayTwo.scss";

const BirthdayTwo = () => {
	const params = useParams();

	const template = templatesData.find((template) => template.id === params?.id);

	if (!template) {
		return notFound();
	}

	const date = template.time.slice(8, 10).startsWith("0")
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
	const [showHeader, setShowHeader] = useState(false);

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
				setShowHeader(true);
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
	}, []);

	const handleLoading = () => {
		document.body.style.overflow = "auto";
		const el = document.querySelector(".loading-chr") as HTMLElement;
		el.classList.add("loading--hide");
		const el2 = document.querySelector(".home-chr") as HTMLElement;
		el2.style.display = "flex";
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

	const color = template.color;
	document.documentElement.style.setProperty("--color", color ?? "#000");

	return (
		<>
			<ScrollToTop />
			{/* {showHeader && !template.isTemplate && <Header />} */}
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
			<main className="home-chr" style={{ display: "none" }}>
				<Container>
					<div className="home__top-chr">
						<div className="home__top-inner-chr">
							<img
								className="floated-img"
								src="/christening-boy/02.webp"
								alt=""
							/>
							<div className="home__top-date-chr">
								{date} {template.monthDeclined} {template.time.slice(0, 4)} року
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
							<img
								className="iimg"
								src={template.gallery[0]}
								alt=""
								loading="lazy"
							/>
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
							{template.text} {template.child_name}
						</p>
					</div>

					<div className="calendar-wrapper-chr animated-element1">
						<p className="calendar-top-christening">
							{template.monthName} {template.time.slice(0, 4)}
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
										className={day == Number(date) ? "target-time-chr" : ""}
									>
										{day}
										{day == Number(date) && (
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
							<p
								style={{ marginBottom: 25 }}
								className="page-desc-chr animated-element1"
							>
								Празький час
							</p>
							<div className="addresses-chr">
								{template.addresses.map((address, index) => {
									return (
										<div key={index} className="address-chr">
											<p className="address__title-chr animated-element1">
												{/* <span>{address.title}</span> */}
												{/* <span>{address.time}</span> */}
											</p>
											<p className="address__info-chr animated-element1">
												{address.address_title}
											</p>
											<p
												style={{ marginBottom: 10 }}
												className="address__info-chr animated-element1"
											>
												{address.address}
											</p>
											<iframe
												className="map animated-element1"
												src={address.address_url}
												loading="lazy"
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
							<img
								className="iimg"
								src={template.gallery[1]}
								alt=""
								loading="lazy"
							/>
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
									<p>днів</p>
								</div>
								<div>
									<p>{hours}</p>
									<p>годин(а)</p>
								</div>
								<div>
									<p>{minutes}</p>
									<p>хвилин(а)</p>
								</div>
								<div>
									<p>{seconds}</p>
									<p>секунд(а)</p>
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
								<img
									className="iimg"
									src={template.gallery[2]}
									alt=""
									loading="lazy"
								/>
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
};

export default BirthdayTwo;
