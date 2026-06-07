"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import languages from "@/data/languages.json";
import classNames from "classnames";
import "./styles.scss";

export default function LngBanner() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const t = useTranslations();

	const [lngBannerVisible, setLngBannerVisible] = useState(false);

	useEffect(() => {
		const preferredLng = localStorage.getItem("preferredLng");
		const shortPreferredLng = navigator.language.split("-")[0];

		// Already made a choice, or is a Ukrainian speaker — no banner needed
		if (preferredLng || shortPreferredLng === "uk") return;

		const timeout = setTimeout(() => setLngBannerVisible(true), 1000);
		return () => clearTimeout(timeout);
	}, []);

	const currentLng =
		languages.find((lng) => lng.code === locale) || languages[0];

	const handleLngOption = (lngCode: string) => {
		// const newPathname = pathname.replace(`/${locale}`, `/${lngCode}`);
		// TODO: learn this
		router.replace(pathname, { locale: lngCode });
		localStorage.setItem("preferredLng", lngCode);
	};

	return (
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
					{languages.map((lng) => {
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
				<button onClick={() => setLngBannerVisible(false)}>{t("close")}</button>
			</div>
		</div>
	);
}
