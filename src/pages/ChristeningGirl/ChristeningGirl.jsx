import { useEffect, useState } from "react";
import templatesData from "../../assets/data/templates-data.json";
import playIcon from "/icons/mute.png";
import pauseIcon from "/icons/unmute.png";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import img1 from "/christening-girl/01.webp";
import img2 from "/christening-girl/02.webp";
import img3 from "/christening-girl/03.webp";
import img4 from "/christening-girl/04.webp";
import img5 from "/christening-girl/05.webp";
import img6 from "/christening-girl/06.webp";
import img7 from "/christening-girl/07.png";
import Container from "../../components/Container/Container";
import "./ChristeningGirl.scss";

const ChristeningGirl = () => {
	const { id } = useParams();
	const template = templatesData.find((template) => template.id === id);

	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlayAudio = () => {
		setIsPlaying((prev) => !prev);
	};

	useEffect(() => {
		const audio = document.querySelector(".christening-girl__audio");

		if (!isPlaying) {
			audio.pause();
		} else {
			audio.play();
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
	const [days, setDays] = useState("0");
	const [hours, setHours] = useState("0");
	const [minutes, setMinutes] = useState("0");
	const [seconds, setSeconds] = useState("0");
	const [showHeader, setShowHeader] = useState(false);

	useEffect(() => {
		let interval = setInterval(() => {
			const date = new Date();
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
	function getDaysOfMonth(year, month) {
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

	let txtMonth;

	switch (template.month) {
		case 1:
			txtMonth = "Січень";
			break;
		case 2:
			txtMonth = "Лютий";
			break;
		case 3:
			txtMonth = "Березень";
			break;
		case 4:
			txtMonth = "Квітень";
			break;
		case 5:
			txtMonth = "Травень";
			break;
		case 6:
			txtMonth = "Червень";
			break;
		case 7:
			txtMonth = "Липень";
			break;
		case 8:
			txtMonth = "Серпень";
			break;
		case 9:
			txtMonth = "Вересень";
			break;
		case 10:
			txtMonth = "Жовтень";
			break;
		case 11:
			txtMonth = "Листопад";
			break;
		case 12:
			txtMonth = "Грудень";
			break;
	}

	useEffect(() => {
		const scroll = document.querySelector(".christening-girl__scroll-chr");
		const images = document.querySelectorAll(
			".christening-girl__gallery-masonry img"
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
			".christening-girl__animate"
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
			{ threshold: 0 }
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
		document
			.querySelector(".christening-girl__loading")
			.classList.add("christening-girl__loading--hide");
		document.querySelector(".christening-girl").style.display = "flex";
		setIsPlaying(true);
		setTimeout(() => {
			document
				.querySelector(".christening-girl__hero")
				.classList.add("christening-girl__hero--active");

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
	document.documentElement.style.setProperty("--color", color);

	return (
		<>
			{showHeader && <Header />}
			<div onClick={handleLoading} className="christening-girl__loading">
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<div>Торкніться екрана, щоб відкрити запрошення!</div>
			</div>
			<main className="christening-girl" style={{ display: "none" }}>
				<Container>
					<div className="christening-girl__hero">
						<div className="christening-girl__home__top-inner-chr">
							<img className="christening-girl__hero-img" src={img2} alt="" />
							<div className="christening-girl__hero-date">
								{template.date} Вересня {template.year} року
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
						<img className="christening-girl__hero-img-2" src={img1} alt="" />
						<img className="christening-girl__hero-img-3" src={img1} alt="" />

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
								loading="lazy"
							/>
							<img
								className="christening-girl__gallery-float-img"
								src={img6}
								alt=""
							/>
						</div>
						<img
							className="christening-girl__floated-img-3 christening-girl__animate"
							src={img3}
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
						<p className="christening-girl__calendar-top">{`${txtMonth} ${template.time.slice(
							0,
							4
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
											day == date
												? "christening-girl__calendar-target-time"
												: ""
										}
									>
										{day}
										{day == date && (
											<div className="christening-girl__calendar-img-container">
												<img src={img7} alt="" />
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
							src={img3}
							alt=""
						/>
						<div className="christening-girl__addresses-container">
							<p className="christening-girl__animate christening-girl__txt-decoration christening-girl__font-l">
								Адреси святкування
							</p>
							<p
								style={{ marginBottom: 25 }}
								className=" christening-girl__font-m christening-girl__animate"
							>
								{template.location_time}
							</p>
							<div className="christening-girl__addresses-chr">
								{template.adresess.map((address, index) => {
									return (
										<div key={index} className="christening-girl__address-chr">
											<p className="christening-girl__address__title-chr christening-girl__animate christening-girl__txt-decoration">
												<span>{address.title}</span>
												<span>{address.time}</span>
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
								src={img6}
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
					<div className="christening-girl__wrapper">
						<img
							className="christening-girl__floated-img-3 christening-girl__animate"
							src={img4}
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
									src={img5}
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
								src={img1}
								alt=""
							/>
						</div>
					</div>
				</Container>
			</main>
			<button onClick={handlePlayAudio} className="christening-girl__audio-btn">
				<img src={isPlaying === false ? playIcon : pauseIcon} alt="" />
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
