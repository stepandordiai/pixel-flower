"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

import styles from "./Testimonials.module.scss";

const testimonials = [
	{
		client: "Емілія та Владислав",
		label:
			'"Дуже сподобалося наше запрошення на хрестини ніжне, стильне й атмосферне, саме так, як ми і хотіли. Дякуємо за увагу до деталей, врахування всіх побажань і швидку роботу. Було приємно співпрацювати, результат перевершив наші очікування! 😍😍🥰"',
		img: "/testimonial-1.svg",
	},
	{
		client: "Андрій та Наталія",
		label:
			'"Дуже вдячні вам за таке креативне весільне запрошення — усім воно дуже сподобалося! Це було надзвичайно практично, а також хочемо зазначити, що замовлення було виконано у неймовірно короткий термін. Щиро дякуємо! 🫂🎉 Моя рекомендація"',
		img: "/testimonial-2.svg",
	},
	{
		client: "Михайло та Мирослава",
		label:
			'"Щиро дякую за гарну роботу. Нам і нашим гостям  дуже сподобалося зроблене вами запрошення, на визначну для нас подію. Обов\'язково від нас буде рекомендація Вас, як професіонала своєї справи. Успіхів і усього найкращого. Приємно з вами працювати!!!"',
		img: "/testimonial-3.svg",
	},
];

const Testimonials = () => {
	return (
		<section className={styles.section} id="testimonials">
			<h2 className={styles["section__title"]}>Відгуки наших клієнтів</h2>
			<Swiper
				spaceBetween={100}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<img src="${testimonials[index].img}" class="${className}" alt="testimonial ${index}" />`;
					},
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				speed={1000}
				loop={true}
				modules={[Pagination, Autoplay]}
				className={styles["mySwiper"]}
			>
				{testimonials.map((t, i) => (
					<SwiperSlide key={i}>
						<div>
							<p
								style={{
									paddingBottom: 25,
									fontSize: "clamp(18px, 4vw, 24px)",
								}}
							>
								{t.label}
							</p>
							<p style={{ fontWeight: 500 }}>{t.client}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Testimonials;
