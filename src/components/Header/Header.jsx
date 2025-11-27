import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import socialsData from "../../assets/data/socialsData";
import logo from "/logo/pixel-flower-logo.svg";
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
				{/* menu-btn */}
				<button
					onClick={toggleBurgerBtn}
					className="burger-btn-wrapper"
					aria-label={isMenuActive ? "Закрити меню" : "Відкрити меню"}
				>
					<span
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
					</span>
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
												{/* TODO: LEARN THIS */}
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
											</div>
										</div>
									</HashLink>
								);
							})}
						</nav>
						<div className="menu-dd-socials">
							{socialsData.map((social, index) => {
								const Icon = social.icon;
								return (
									<a
										key={index}
										href={social.socialUrl}
										target="_blank"
										title={social.title}
									>
										<Icon size={24} />
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
