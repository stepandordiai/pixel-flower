"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { testimonials } from "./testimonials";
import styles from "./Testimonials.module.scss";

const Testimonials = () => {
	const reviewSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "pixel flower",

		review: testimonials.map((t) => ({
			"@type": "Review",

			author: {
				"@type": "Person",
				name: t.client,
			},

			reviewBody: t.label,

			reviewRating: {
				"@type": "Rating",
				ratingValue: 5,
				bestRating: 5,
			},
		})),
	};

	// TODO: ?
	// 	export async function generateMetadata() {
	//   return {
	//     other: {
	//       "script:ld+json": JSON.stringify(reviewSchema),
	//     },
	//   };
	// }

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
			/>
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
							{/* TODO: learn this */}
							<figure>
								<blockquote
									style={{
										paddingBottom: 25,
										fontSize: "clamp(18px, 4vw, 24px)",
									}}
								>
									<p>{t.label}</p>
								</blockquote>
								<figcaption style={{ fontWeight: 500 }}>
									<cite>{t.client}</cite>
								</figcaption>
							</figure>
						</SwiperSlide>
					))}
				</Swiper>
			</section>
		</>
	);
};

export default Testimonials;
