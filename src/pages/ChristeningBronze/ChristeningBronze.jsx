import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import img from "/christening/02.webp";
import img1 from "/christening/04.webp";
import img2 from "/christening/06.webp";
import img4 from "/christening/07.webp";
import img5 from "/christening/05.webp";
import img6 from "/christening/01.webp";
import baloonIcon from "/icons/balloon.png";
import data from "./../../assets/data/data.json";
import playIcon from "/icons/mute.png";
import pauseIcon from "/icons/unmute.png";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ChristeningBronze.scss";

const ChristeningBronze = () => {
	const { id } = useParams();
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlayAudio = () => {
		setIsPlaying((prev) => !prev);
	};

	useEffect(() => {
		const audio = document.querySelector(".audio");

		if (!isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
	}, [isPlaying]);

	const envelope = data.find((envelope) => envelope.id == id);

	// TODO:
	const targetDate = new Date(envelope.countdown);
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
				handleClick();
				setShowHeader(true);
			}
		}, 1000);
	}, []);

	const handleClick = () => {
		const duration = 5 * 1000;
		const animationEnd = Date.now() + duration;
		const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		const randomInRange = (min, max) => Math.random() * (max - min) + min;

		const interval = window.setInterval(() => {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			});
		}, 250);
	};

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

	switch (envelope.month) {
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
		const scroll = document.querySelector(".scroll-chr");
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

		window.addEventListener("scroll", () => {
			animatedElements.forEach((el) => {
				const elRect = el.getBoundingClientRect();

				if (elRect.top < window.innerHeight - 100) {
					el.classList.add("animated-element1--active");
				}
			});
		});

		const rainbow = document.querySelectorAll(".rainbow");

		rainbow.forEach((el) => {
			const rainbows = el.querySelectorAll(".pp");
			window.addEventListener("scroll", () => {
				const elRect = el.getBoundingClientRect();
				if (elRect.top < window.innerHeight) {
					rainbows.forEach((el, index) => {
						setTimeout(() => {
							el.classList.add("rainbow-el--active");
						}, 100 * index);
					});
				}
			});
		});
	}, []);

	useEffect(() => {
		document.body.style.overflow = "hidden";
	}, []);

	const handleLoading = () => {
		document.body.style.overflow = "auto";
		document.querySelector(".loading-chr").classList.add("loading--hide");
		document.querySelector(".home-chr").style.display = "flex";
		setIsPlaying(true);
		setTimeout(() => {
			document
				.querySelector(".home__top-chr")
				.classList.add("home__top-chr--active");

			const rainbow = document.querySelectorAll(".rainbow");

			rainbow.forEach((el) => {
				const rainbows = el.querySelectorAll(".pp");

				const elRect = el.getBoundingClientRect();
				if (elRect.top < window.innerHeight) {
					rainbows.forEach((el, index) => {
						setTimeout(() => {
							el.classList.add("rainbow-el--active");
						}, 100 * index);
					});
				}
			});
		}, 1000);
	};

	return (
		<>
			{showHeader && <Header />}
			<div onClick={handleLoading} className="loading-chr">
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<img src={img1} alt="" />
				<div className="loading-txt">
					Торкніться екрана, щоб відкрити запрошення!
				</div>
			</div>
			<main className="home-chr" style={{ display: "none" }}>
				<div className="home__top-chr">
					<div className="home__top-inner-chr">
						<img className="floated-img" src={img} alt="" />
						<div className="home__top-date-chr">
							{envelope.date} Вересня {envelope.year} року
						</div>
						<p className="home__top-title-chr">
							Таїнство хрещення {envelope.child_name}
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
					<img className="floated-img-1" src={img1} alt="" />
					<img className="floated-img-2" src={img1} alt="" />

					<div className="scroll-chr">
						Прокрутіть вниз, щоб дізнатися більше
					</div>
				</div>
				<div className="wrapper">
					<div className="swiper-cont animated-element1">
						<img
							className="iimg"
							src={envelope.gallery[0]}
							alt=""
							loading="lazy"
						/>
						<img className="gallery-float-img" src={img4} alt="" />
					</div>
					<img className="floated-img-3 animated-element1" src={img2} alt="" />
					<p className="pepe-chr animated-element1">
						<span>Дорогі гості,</span>
						<br />з великою радістю та любов’ю запрошуємо Вас розділити з нами
						важливу подію
						<br />
						<br />
						Таїнство Хрещення нашої донечки {envelope.child_name}
					</p>
				</div>

				<div className="calendar-wrapper-chr animated-element1">
					<p className="calendar-top-christening">{`${txtMonth} ${envelope.year}`}</p>
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
									className={day === envelope.date ? "target-time-chr" : ""}
								>
									{day}
									{day === envelope.date && (
										<div className="balloon-container">
											<img src={baloonIcon} alt="" />
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
				<p className="pepe-chr animated-element1">
					Ми не уявляємо цей радісний день без Вас - близьких і дорогих нам
					людей!
				</p>
				<div style={{ padding: 10 }} className="wrapper">
					<img className="floated-img-3 animated-element1" src={img2} alt="" />
					<div className="addresses-container">
						<p className="addresses__title-chr animated-element1">
							Адреси святкування
						</p>
						<p
							style={{ marginBottom: 25 }}
							className="page-desc-chr animated-element1"
						>
							Празький час
						</p>
						<div className="addresses-chr">
							{envelope.adresess.map((address, index) => {
								return (
									<div key={index} className="address-chr">
										<p className="address__title-chr animated-element1">
											<span>{address.title}</span>
											<span>{address.time}</span>
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
							src={envelope.gallery[1]}
							alt=""
							loading="lazy"
						/>
						<img className="gallery-float-img-2" src={img5} alt="" />
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
					<img className="floated-img-3 animated-element1" src={img2} alt="" />
					<p className="page-title-chr animated-element1">
						З любов’ю,
						<br />
						{envelope.father_name} та {envelope.mother_name}
					</p>
					<div style={{ padding: 10 }}>
						<div className="swiper-cont-2 animated-element1">
							<img
								className="iimg"
								src={envelope.gallery[2]}
								alt=""
								loading="lazy"
							/>
							<img className="gallery-float-img-2" src={img6} alt="" />
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
							src={img1}
							alt=""
						/>
					</div>
				</div>
			</main>
			<button onClick={handlePlayAudio} className="floating-btn-2">
				<img src={isPlaying === false ? playIcon : pauseIcon} alt="" />
			</button>
			<audio className="audio" autoPlay src={envelope.song}></audio>
		</>
	);
};

export default ChristeningBronze;
