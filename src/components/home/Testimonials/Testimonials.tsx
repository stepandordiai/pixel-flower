"use client";

import { testimonials } from "@/data/testimonials";
import Image from "next/image";
import StarIcon from "./../../icons/StarIcon";
import styles from "./Testimonials.module.scss";

export default function Testimonials() {
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

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
			/>
			<section className={styles.section} id="testimonials">
				<h2 className={styles["section__title"]}>Відгуки наших клієнтів 💌</h2>
				<div className={styles["testimonials-grid"]}>
					{testimonials.map((t, i) => (
						<figure className={styles["testimonial"]} key={i}>
							<Image
								className={styles["testimonial-img"]}
								src={t.img}
								width={50}
								height={50}
								alt={t.client}
							/>
							<figcaption style={{ fontWeight: 500 }}>{t.client}</figcaption>
							<div className={styles["testimonial-rating"]}>
								{Array.from({ length: t.rating }).map((_, index) => {
									return (
										<span key={index}>
											<StarIcon />
										</span>
									);
								})}
							</div>
							<blockquote>
								<cite>"{t.label}"</cite>
							</blockquote>
						</figure>
					))}
				</div>
			</section>
		</>
	);
}
