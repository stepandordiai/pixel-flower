import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import socialsData from "../../assets/data/socialsData";
import classNames from "classnames";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import logo from "/logo/pixel-flower-logo.svg";
import "./Header.scss";

const linksData = [
	{ name: "homeTitle", path: "/#home" },
	{ name: "templatesTitle", path: "/#templates" },
	{ name: "packagesAndPricingTitle", path: "/#packages" },
	{ name: "questionsAndAnswersTitle", path: "/#qa" },
];

const Header = () => {
	const { t } = useTranslation();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	useEffect(() => {
		const closeMenuOnEsc = (e) => {
			if (e.key === "Escape") setIsMenuOpen(false);
		};

		document.addEventListener("keydown", closeMenuOnEsc);

		return () => document.removeEventListener("keydown", closeMenuOnEsc);
	}, []);

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
					onClick={toggleMenu}
					className="burger-btn-wrapper"
					//
					aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
					aria-expanded={isMenuOpen}
					aria-controls="menu"
				>
					<span
						className={classNames("burger-btn", {
							"burger-btn--active": isMenuOpen,
						})}
					>
						<span
							className={classNames("burger-btn__top-line", {
								"burger-btn__top-line--active": isMenuOpen,
							})}
						></span>
						<span
							className={classNames("burger-btn__bottom-line", {
								"burger-btn__bottom-line--active": isMenuOpen,
							})}
						></span>
					</span>
				</button>
				<div
					className={classNames("menu-dd", {
						"menu-dd--active": isMenuOpen,
					})}
					id="menu"
					aria-hidden={!isMenuOpen}
				>
					<div className="menu-dd-inner">
						<nav className="menu-dd-nav">
							{linksData.map((link, index) => {
								return (
									<HashLink
										key={index}
										onClick={() => setIsMenuOpen(false)}
										className="menu-dd-nav__link"
										to={link.path}
										smooth
									>
										<span>{t(link.name)}</span>
										<div className="menu-icon-container">
											<div className="menu-icon-wrapper">
												{/* TODO: learn this */}
												{[...Array(2)].map((_, i) => {
													return <ArrowRightIcon key={i} />;
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
						{/* <Lng /> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
