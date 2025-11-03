import { NavLink } from "react-router-dom";
import arrowTopIcon from "/icons/top.png";
import logo from "/logo/pixel-flower-logo.svg";
import "./Footer.scss";

const Footer = () => {
	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<footer className="footer">
			<NavLink to="/">
				<img src={logo} width={128} height={128} alt="pixel flower logo" />
			</NavLink>
			<button onClick={handleScrollToTop} className="footer__btn">
				<span>Повернутись на початок</span>
				<div className="footer__btn-icon-wrapper">
					<div className="footer__btn-icon-wrapper-inner">
						<img src={arrowTopIcon} width={16} height={16} alt="" />
						<img src={arrowTopIcon} width={16} height={16} alt="" />
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
