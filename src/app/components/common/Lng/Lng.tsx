"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import classNames from "classnames";
import "./Lng.scss";

const lngData = [
	{ code: "uk", name: "UA" },
	{ code: "cs", name: "CZ" },
];

const Lng = () => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const t = useTranslations();

	const [lngBannerVisible, setLngBannerVisible] = useState(false);

	useEffect(() => {
		// TODO: learn this
		const shortPreferredLng = navigator.language;

		const preferredLng = localStorage.getItem("preferredLng");

		if (shortPreferredLng.split("-")[0] === "uk" || preferredLng) {
			return;
		}

		const timeout = setTimeout(() => setLngBannerVisible(true), 1000);

		return () => clearTimeout(timeout);
	}, []);

	const currentLng = lngData.find((lng) => lng.code === locale) || lngData[0];

	const handleLngOption = (lngCode: string) => {
		const newPathname = pathname.replace(`/${locale}`, `/${lngCode}`);
		router.replace(newPathname);
		localStorage.setItem("preferredLng", lngCode);
	};

	return (
		<>
			<div
				className={`lng-banner ${
					lngBannerVisible ? "lng-banner--visible" : ""
				}`.trim()}
			>
				<div style={{ marginBottom: 10 }}>
					<p>Будь ласка, оберіть бажану мову зі списку нижче.</p>
					<p>Vyberte si prosím preferovaný jazyk ze seznamu níže.</p>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div style={{ display: "flex", gap: 5 }}>
						{lngData.map((lng) => {
							return (
								<button
									key={lng.code}
									onClick={() => {
										handleLngOption(lng.code);
										setLngBannerVisible(false);
									}}
									className={classNames("lng__btn", {
										"lng__btn--active": lng.code === currentLng.code,
									})}
								>
									{lng.name}
								</button>
							);
						})}
					</div>
					<button onClick={() => setLngBannerVisible(false)}>
						{t("close")}
					</button>
				</div>
			</div>
			<div style={{ display: "flex", gap: 5 }}>
				{lngData.map((lng) => {
					return (
						<button
							key={lng.code}
							onClick={() => {
								handleLngOption(lng.code);
								setLngBannerVisible(false);
							}}
							className={classNames("lng__btn", {
								"lng__btn--active": lng.code === currentLng.code,
							})}
						>
							{lng.name}
						</button>
					);
				})}
			</div>
		</>
	);
};

export default Lng;
