"use client";

import { useTranslations } from "next-intl";
import templates from "./../../../assets/data/templates.json";
import ArrowRightIcon from "@/app/icons/ArrowRightIcon";
import { Link } from "@/i18n/navigation";
import styles from "./Templates.module.scss";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

export default function Templates() {
	const t = useTranslations();

	return (
		<div className={styles["templates"]} id="templates">
			<h2 className={styles["templates__title"]}>{t("home.templatesTitle")}</h2>
			<div className={styles["templates-grid"]}>
				<Swiper
					breakpoints={{
						0: {
							slidesPerView: 1.25, // mobile
						},
						800: {
							slidesPerView: 2.25, // tablet+
						},
						1200: {
							slidesPerView: 3.25, // tablet+
						},
					}}
					slidesPerView={1.25}
					spaceBetween={10}
					modules={[Navigation]}
					navigation={true}
					className={styles["templates-swiper"]}
				>
					{templates.slice(0, 4).map((template, index) => (
						<SwiperSlide>
							<div key={template.id} className={styles["template"]}>
								<Link
									href={`/${template.id}`}
									className={styles["template__img-container"]}
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										padding: 25,
									}}
								>
									{template.ss ? (
										<img key={index} src={template.ss} alt="" />
									) : (
										<span style={{ fontSize: "1.5rem" }}>
											{t("templates.comingSoon")}
										</span>
									)}
									<div className={styles["template__link"]}>
										<span>{t("templates.viewTheTemplate")}</span>
										<span className={styles["template__link-img-container"]}>
											<span
												className={styles["template__link-img-container-inner"]}
											>
												{[...Array(2)].map((_, i) => {
													return <ArrowRightIcon key={i} size={24} />;
												})}
											</span>
										</span>
									</div>
								</Link>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<p style={{ fontSize: "18px", fontWeight: 500 }}>
										{t(template.type)}
									</p>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
				<Link className={styles["templates__link"]} href={"/templates"}>
					<span>{t("home.allTemplates")}</span>
					<span className={styles["template__link-img-container"]}>
						<span className={styles["template__link-img-container-inner"]}>
							{[...Array(2)].map((_, i) => {
								return <ArrowRightIcon key={i} size={24} />;
							})}
						</span>
					</span>
				</Link>
			</div>
		</div>
	);
}
