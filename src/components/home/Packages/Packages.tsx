"use client";

import { useTranslations } from "next-intl";
import packages from "@/data/packages.json";
import socialsData from "@/data/socialsData";
import contacts from "@/data/contacts";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import XIcon from "@/components/icons/XIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import "./Packages.scss";

const mergedData = [...contacts, ...socialsData];

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
			<section className="section" id="packages">
				<p className="packages__title">{t("packagesAndPricingTitle")}</p>
				<div className="packages">
					{packages.map((pack) => {
						return (
							<div key={pack.name} className="package">
								<p className="package__title">{t(pack.name)}</p>
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
													{option.isIncluded ? (
														<CheckIcon size={20} />
													) : (
														<XIcon size={20} />
													)}{" "}
													<span style={{ fontWeight: 500 }}>
														{t(option.name)}
													</span>
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
