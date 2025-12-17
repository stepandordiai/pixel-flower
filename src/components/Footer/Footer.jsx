import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import logo from "/logo/pixel-flower-logo.svg";
import "./Footer.scss";

const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
};

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className="footer">
			<NavLink to="/">
				<img src={logo} width={128} height={128} alt="pixel flower logo" />
			</NavLink>
			<button onClick={scrollToTop} className="footer__btn">
				<span>{t("scrollToTop")}</span>
				<div className="footer__btn-icon-wrapper">
					<div className="footer__btn-icon-wrapper-inner">
						{[...Array(2)].map((_, i) => {
							return (
								<svg
									key={i}
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="currentColor"
									className="bi bi-arrow-up-short"
									viewBox="0 0 16 16"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"
									/>
								</svg>
							);
						})}
					</div>
				</div>
			</button>
			<p className="footer__author">
				Website created by{" "}
				<a href="https://www.heeeyooo.studio/" target="_blank">
					heeeyooo studio
				</a>
			</p>
		</footer>
	);
};

export default Footer;
