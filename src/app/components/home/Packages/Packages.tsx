"use client";

import { useTranslations } from "next-intl";
import packagesData from "./../../../assets/data/packages-data.json";
import socialsData from "./../../../assets/data/socialsData";
import contactsData from "./../../../assets/data/contacts-data";
import ArrowRightIcon from "@/app/icons/ArrowRightIcon";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import "./Packages.scss";

const mergedData = [...contactsData, ...socialsData];

const Packages = () => {
	const t = useTranslations();

	const [bannerVisible, setBannerVisible] = useState(false);
	const banner = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!bannerVisible) return;

		const handleClickNotOnBanner = (e: any) => {
			if (banner.current && !banner.current.contains(e.target)) {
				setBannerVisible(false);
			}
		};

		document.addEventListener("click", handleClickNotOnBanner);

		return () => document.removeEventListener("click", handleClickNotOnBanner);
	}, [bannerVisible]);

	return (
		<>
			<div
				ref={banner}
				className={classNames("contact-banner", {
					"contact-banner--visible": bannerVisible,
				})}
			>
				<div className="contact-banner__conic-bg"></div>
				<p style={{ fontWeight: 600 }}>{t("packagesAndPricing.contactUs")}</p>
				<div className="contact-banner-container">
					{mergedData.map((el, i) => {
						const Icon = el.icon;
						return (
							<a
								key={i}
								className="contact-banner__btn"
								href={el.socialUrl}
								target="_blank"
							>
								<Icon size={24} />
								<span>{el.title}</span>
								<span className="package__link-img-container">
									<span className="package__link-img-container-inner">
										{[...Array(2)].map((_, i) => {
											return <ArrowRightIcon key={i} size={24} />;
										})}
									</span>
								</span>
							</a>
						);
					})}
				</div>
				<p>{t("packagesAndPricing.freeConsultation")}</p>
				<button
					onClick={() => setBannerVisible(false)}
					className="contact-banner__btn"
				>
					<span>{t("close")}</span>
					<span className="package__link-img-container">
						<span className="package__link-img-container-inner">
							{[...Array(2)].map((_, i) => {
								return <ArrowRightIcon key={i} size={24} />;
							})}
						</span>
					</span>
				</button>
			</div>
			<section className="packages-container" id="packages">
				<p className="packages__title">{t("packagesAndPricingTitle")}</p>
				<div className="packages">
					{packagesData.map((pack) => {
						return (
							<div key={pack.name} className="package">
								<p className="package__title">{pack.name}</p>
								<p className="package__price">
									<span
										style={{ textDecoration: "line-through", fontWeight: 400 }}
									>
										{t(pack.price)}
									</span>{" "}
									<span>{t(pack.priceDiscount)}</span>
								</p>
								<button
									// TODO: learn this
									onClick={(e) => {
										e.stopPropagation();
										setBannerVisible(true);
									}}
									className="package__link"
								>
									<span>{t("packagesAndPricing.chooseThisPackage")}</span>
									<span className="package__link-img-container">
										<span className="package__link-img-container-inner">
											{[...Array(2)].map((_, i) => {
												return <ArrowRightIcon key={i} size={24} />;
											})}
										</span>
									</span>
								</button>
								<div className="package__info">
									<p className="package__info-title">
										{t("packagesAndPricing.optionsTitle")}
									</p>
									<div className="package__info-list">
										{pack.options.map((option, index) => {
											return (
												<div className="package__info-item" key={index}>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														fill={option.isIncluded ? "#0f0" : "#f00"}
														className="bi bi-check"
														viewBox="0 0 16 16"
													>
														<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
													</svg>{" "}
													<span>{t(option.name)}</span>
												</div>
											);
										})}
									</div>
								</div>
								<p>{t("packagesAndPricing.freeConsultation")}</p>
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
};

export default Packages;
