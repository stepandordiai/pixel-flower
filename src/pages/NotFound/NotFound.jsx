import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
	const { t } = useTranslation();

	return (
		<>
			<Helmet>
				<meta name="robots" content="noindex, nofollow" />
				<title>{t("pageNotFound")} | pixel flower</title>
			</Helmet>
			<div className="not-found">
				<span className="not-found__title">404</span>
				<span>{t("pageNotFound")}</span>
				<NavLink className="not-found__link" to="/">
					<span>{t("backToHome")}</span>
					<span className="not-found__link-img-container">
						<span className="not-found__link-img-container-inner">
							{[...Array(2)].map((_, i) => {
								return (
									<svg
										key={i}
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										className="bi bi-arrow-right-short"
										viewBox="0 0 16 16"
									>
										<path
											fillRule="evenodd"
											d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
										/>
									</svg>
								);
							})}
						</span>
					</span>
				</NavLink>
			</div>
		</>
	);
};

export default NotFound;
