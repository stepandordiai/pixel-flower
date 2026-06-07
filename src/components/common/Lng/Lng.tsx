"use client";

import { useLocale } from "next-intl";
import { useState, CSSProperties } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import classNames from "classnames";
import GlobeIcon from "@/components/icons/GlobeIcon";
import languages from "@/data/languages.json";
import "./Lng.scss";

type LngProps = {
	styles?: CSSProperties;
};

const Lng = ({ styles }: LngProps) => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	const [lngVisible, setLngVisible] = useState(false);

	const currentLng =
		languages.find((lng) => lng.code === locale) || languages[0];

	const handleLngOption = (lngCode: string) => {
		// const newPathname = pathname.replace(`/${locale}`, `/${lngCode}`);
		// TODO: learn this
		router.replace(pathname, { locale: lngCode });
		localStorage.setItem("preferredLng", lngCode);
	};

	return (
		<div style={styles} className="lng">
			<button
				onClick={() => setLngVisible((prev) => !prev)}
				className="lng-btn"
			>
				<GlobeIcon size={24} />
			</button>
			<div
				className={classNames("lng-inner-parent", {
					"lng-inner-parent--visible": lngVisible,
				})}
			>
				<div className="lng-inner-child">
					{languages.map((lng) => {
						return (
							<button
								key={lng.code}
								onClick={() => {
									handleLngOption(lng.code);
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
			</div>
		</div>
	);
};

export default Lng;
