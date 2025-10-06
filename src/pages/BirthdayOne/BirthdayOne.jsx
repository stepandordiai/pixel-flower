import { useEffect, useState } from "react";
import templatesData from "../../assets/data/templates-data.json";

import lemonBranchImg from "/wedding-two/lemon.png";
import giftIcon from "/birthday-one/gift.png";
import build from "/wedding-two/build.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/effect-cards";
import "swiper/css/effect-fade";

// import required modules
import { Autoplay, EffectFade } from "swiper/modules";

import { useParams } from "react-router-dom";

import Container from "../../components/Container/Container";
import ContainerInner from "../../components/ContainerInner/ContainerInner";
import "./BirthdayOne.scss";

const BirthdayOne = () => {
	const { id } = useParams();

	const template = templatesData.find((template) => template.id == id);

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
			".birthday-one__animated-element"
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

	const firstDay = new Date(
		Number(template.time.slice(0, 4)),
		Number(month) - 1,
		1
	);

	let startWeekday = firstDay.getDay(); // 0 = Sunday, 1 = Monday, ...

	const febDayNumbers = getDaysOfMonth(
		Number(template.time.slice(0, 4)),
		Number(month) - 1
	).map((d) => d.getDate());

	startWeekday = (startWeekday + 6) % 7; // now Monday=0, Tuesday=1, ...

	for (let i = 0; i < startWeekday; i++) {
		days2.push(null); // empty slot
	}

	days2.push(...febDayNumbers);

	useEffect(() => {
		const scroll = document.querySelector(".birthday-one__scroll");

		window.addEventListener("scroll", () => {
			if (document.documentElement.scrollTop > 0) {
				scroll.classList.add("birthday-one__scroll--hide");
			} else {
				scroll.classList.remove("birthday-one__scroll--hide");
			}
		});
	}, []);

	let txtMonth;

	switch (Number(month)) {
		case 1:
			txtMonth = "Січня";
			break;
		case 2:
			txtMonth = "Лютого";
			break;
		case 3:
			txtMonth = "Березня";
			break;
		case 4:
			txtMonth = "Квітня";
			break;
		case 5:
			txtMonth = "Травня";
			break;
		case 6:
			txtMonth = "Червня";
			break;
		case 7:
			txtMonth = "Липня";
			break;
		case 8:
			txtMonth = "Серпня";
			break;
		case 9:
			txtMonth = "Вересня";
			break;
		case 10:
			txtMonth = "Жовтня";
			break;
		case 11:
			txtMonth = "Листопада";
			break;
		case 12:
			txtMonth = "Грудня";
			break;
	}

	return (
		<>
			<main className="birthday-one__envelope-silver">
				<Container>
					<div className="birthday-one__envelope-silver__top">
						<div className="birthday-one__top-title font-l font-accent">
							Birthday Party
						</div>
						<p>{`${date} / ${month} / ${template.time.slice(0, 4)}`}</p>
						{/* <img className="birthday-one__build" src={build} alt="" /> */}
						<div className="birthday-one__scroll">
							Прокрутіть вниз, щоб дізнатися більше
						</div>
					</div>
					<ContainerInner>
						<p className="birthday-one__animated-element birthday-one__font-m birthday-one__font-accent">
							Дорогі друзі
						</p>
						<div className="birthday-one__font-s">
							<p className="birthday-one__animated-element">
								Ми надзвичайно раді поділитися з Вами цим особливим днем!
							</p>
							<br />
							<p className="birthday-one__animated-element">
								Розпочинаючи нашу спільну подорож, ми будемо щасливі, якщо Ви
								приєднаєтеся до святкування нашого весілля.
							</p>
							<br />
							<p className="birthday-one__animated-element">
								Тут ви знайдете всю необхідну інформацію - розклад подій,
								зворотний відлік, інформацію про місце проведення, галерею та
								інше.
							</p>
							<br />
							<p className="birthday-one__animated-element">
								Ваша присутність для нас безцінна, і ми з нетерпінням чекаємо,
								щоб розділити радість, сміх і любов цього дня.
							</p>
						</div>
						<p className="birthday-one__animated-element birthday-one__font-m birthday-one__font-accent">
							Неділя, {date} {txtMonth}, {template.time.slice(0, 4)}
						</p>
						<div className="birthday-one__silver-calendar-wrapper birthday-one__animated-element birthday-one__font-s">
							<div className="birthday-one__silver-calendar">
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
											className={day == date ? "birthday-one__target-time" : ""}
										>
											{day}
											{day == date && (
												<img
													className="birthday-one__calendar-img "
													src={giftIcon}
													alt=""
												/>
											)}
										</div>
									);
								})}
							</div>
						</div>
						<p className="birthday-one__animated-element birthday-one__font-m birthday-one__font-accent">
							Давайте створимо спогади, які залишаться на все життя!
						</p>
					</ContainerInner>
					<ContainerInner>
						<img
							className="birthday-one__animated-element"
							src={lemonBranchImg}
							alt=""
						/>
						<p className="birthday-one__animated-element font-m font-accent">
							Зворотний відлік до мого Дня Народження
						</p>
						<div className="birthday-one__silver-date" id="date">
							<div className="birthday-one__animated-element">
								<span className="birthday-one__font-l">{days}</span>
								<span className="birthday-one__font-s">днів</span>
							</div>
							<div className="birthday-one__animated-element">
								<span className="birthday-one__font-l">{hours}</span>
								<span className="birthday-one__font-s">годин(а)</span>
							</div>
							<div className="birthday-one__animated-element">
								<span className="birthday-one__font-l">{minutes}</span>
								<span className="birthday-one__font-s">хвилин(а)</span>
							</div>
							<div className="birthday-one__animated-element">
								<span className="birthday-one__font-l">{seconds}</span>
								<span className="birthday-one__font-s">секунд(а)</span>
							</div>
						</div>
					</ContainerInner>
					<ContainerInner>
						<img
							className="birthday-one__animated-element"
							src={lemonBranchImg}
							alt=""
						/>
						<div>
							<p className="birthday-one__animated-element font-m font-accent">
								Місце проведення
							</p>
							<p className="birthday-one__animated-element font-s">
								{template.location_time}
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
									<p className="birthday-one__animated-element font-s">
										{address.address_title}
									</p>
									<p className="birthday-one__animated-element font-s">
										{address.address}
									</p>
									<iframe
										style={{ width: "100%", height: 400 }}
										className="birthday-one__animated-element"
										src={address.address_url}
										loading="lazy"
									></iframe>
									<a
										className="birthday-one__silver-address__link animated-element font-s"
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
							<p className="birthday-one__font-m font-accent birthday-one__animated-element">
								Дрес-код
							</p>
							<p className="birthday-one__font-s birthday-one__animated-element">
								Нам буде дуже приємно, якщо ви додасте у свій образ відтінки з
								нашої весільної палітри.
							</p>
							<div className="birthday-one__colors-container birthday-one__animated-element">
								<div style={{ background: "#bab86c" }}></div>
								<div style={{ background: "#ffffff" }}></div>
								<div style={{ background: "#F5F5DC" }}></div>
								<div style={{ background: "#7B3F00" }}></div>
							</div>
						</ContainerInner>
					)}
					<ContainerInner>
						<img
							className="birthday-one__animated-element"
							src={lemonBranchImg}
							alt=""
						/>
						<p className="birthday-one__animated-element font-m font-accent">
							Галерея
						</p>
						<Swiper
							effect={"fade"}
							loop={true}
							speed={1000}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
							}}
							modules={[EffectFade, Autoplay]}
							className="birthday-one__silver-swiper animated-element"
						>
							{template.gallery.map((img, index) => {
								return (
									<SwiperSlide key={index} className="birthday-one__slide">
										<img src={img} alt="" loading="lazy" />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</ContainerInner>
					<ContainerInner>
						<img
							className="birthday-one__animated-element"
							src={lemonBranchImg}
							alt=""
						/>
						<p className="birthday-one__animated-element font-m font-accent">
							Буду дуже рада бачити вас!
						</p>
						{/* <div className="birthday-one__envelope-silver__top-logo animated-element font-m">
							<span>{template.name_1[0]}</span>
							<span>{template.name_2[0]}</span>
						</div> */}
					</ContainerInner>
				</Container>
			</main>
		</>
	);
};

export default BirthdayOne;
