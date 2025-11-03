import { useState } from "react";
import socialsData from "./../../assets/data/socials-data.json";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "/logo/pixel-flower-logo.svg";
import arrowTopIcon from "/icons/top.png";
import "./Header.scss";

const linksData = [
	{ name: "Головна", path: "/#home" },
	{ name: "Шаблони", path: "/#templates" },
	{ name: "Пакети та Вартість", path: "/#packages" },
	{ name: "Питання та відповіді", path: "/#qa" },
];

const Header = () => {
	const [isMenuActive, setIsMenuActive] = useState(false);

	const toggleBurgerBtn = () => setIsMenuActive((prev) => !prev);

	return (
		<>
			<header className="header">
				<NavLink className="header__logo" to="/">
					<img src={logo} width={35} height={35} alt="pixel flower logo" />
					<span>pixel flower</span>
				</NavLink>
			</header>
			<div className="menu">
				<button onClick={toggleBurgerBtn} className="burger-btn-wrapper">
					<div
						className={`burger-btn ${isMenuActive ? "burger-btn--active" : ""}`}
					>
						<span
							className={`burger-btn__top-line ${
								isMenuActive ? "burger-btn__top-line--active" : ""
							}`}
						></span>
						<span
							className={`burger-btn__bottom-line ${
								isMenuActive ? "burger-btn__bottom-line--active" : ""
							}`}
						></span>
					</div>
				</button>
				<div className={`menu-dd ${isMenuActive ? "menu-dd--active" : ""}`}>
					<div className="menu-dd-inner">
						<nav className="menu-dd-nav">
							{linksData.map((link, index) => {
								return (
									<HashLink
										key={index}
										onClick={() => setIsMenuActive(false)}
										className="menu-dd-nav__link"
										to={link.path}
										smooth
									>
										<span>{link.name}</span>
										<div className="menu-icon-container">
											<div className="menu-icon-wrapper">
												<img src={arrowTopIcon} width={16} height={16} alt="" />
												<img src={arrowTopIcon} width={16} height={16} alt="" />
											</div>
										</div>
									</HashLink>
								);
							})}
						</nav>
						<div className="menu-dd-socials">
							{socialsData.map((social, index) => {
								return (
									<a
										key={index}
										href={social.socialUrl}
										target="_blank"
										title={social.title}
									>
										<i className={social.fontIcon}></i>
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
