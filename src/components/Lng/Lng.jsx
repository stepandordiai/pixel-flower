import { useState } from "react";
import { changeLanguage } from "i18next";
import classNames from "classnames";
import "./Lng.scss";

const lngData = [
	{ code: "uk", name: "UA" },
	{ code: "cs", name: "CZ" },
];

const storedLngData = localStorage.getItem("i18nextLng") || "uk";

// TODO: learn this
const Lng = ({ click = () => {} }) => {
	const [lngCode, setLngCode] = useState(storedLngData);

	const changeLngOnClick = (lngCode) => {
		changeLanguage(lngCode);
		setLngCode(lngCode);
	};

	const closeLngBanner = (lngCode) => {
		changeLngOnClick(lngCode);
		// TODO: learn this
		click();
		// TODO: learn this
		// FIXME:
		window.location.reload();
	};

	return (
		<div style={{ display: "flex", gap: 5 }}>
			{lngData.map((lng) => {
				return (
					<button
						key={lng.code}
						onClick={() => closeLngBanner(lng.code)}
						className={classNames("lng__btn", {
							"lng__btn--active": lng.code === lngCode,
						})}
					>
						{lng.name}
					</button>
				);
			})}
		</div>
	);
};

export default Lng;
