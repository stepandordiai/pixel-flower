import { useState } from "react";
import { changeLanguage } from "i18next";
import classNames from "classnames";
import "./Lng.scss";

const lngData = [
	{ code: "uk", name: "UA" },
	{ code: "cs", name: "CZ" },
];

const storedLngData = localStorage.getItem("i18nextLng") || lngData[0].code;

const Lng = () => {
	const [lngCode, setLngCode] = useState(storedLngData);

	const changeLngOnClick = (lngCode) => {
		setLngCode(lngCode);
		changeLanguage(lngCode);
	};

	return (
		<div style={{ display: "flex", gap: 5 }}>
			{lngData.map((lng) => {
				return (
					<button
						onClick={() => changeLngOnClick(lng.code)}
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
