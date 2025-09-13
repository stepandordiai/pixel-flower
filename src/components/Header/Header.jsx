import { HashLink } from "react-router-hash-link";
import logo from "/Frame.svg";
import arrowTopIcon from "/top.png";
import "./Header.scss";
import { useState } from "react";

const Header = () => {
	const [isMenuActive, setIsMenuActive] = useState(false);

	function toggleBurgerBtn() {
		setIsMenuActive((prev) => !prev);
	}

	return (
		<>
			<header className="header">
				<a className="header__logo" href="">
					<img src={logo} width={35} height={35} alt="" />
					<span>pixel flower</span>
				</a>
			</header>
			<div className="menu">
				<button onClick={toggleBurgerBtn} className="burger-btn-wrapper">
					<div
						className={
							isMenuActive ? "burger-btn burger-btn--active" : "burger-btn"
						}
					>
						<span
							className={
								isMenuActive
									? "burger-btn__top-line burger-btn__top-line--active"
									: "burger-btn__top-line"
							}
						></span>
						<span
							className={
								isMenuActive
									? "burger-btn__bottom-line burger-btn__bottom-line--active"
									: "burger-btn__bottom-line"
							}
						></span>
					</div>
				</button>
				<div className={isMenuActive ? "menu-dd menu-dd--active" : "menu-dd"}>
					<nav className="menu-dd-nav">
						<HashLink
							onClick={() => setIsMenuActive(false)}
							className="menu-dd-nav__link"
							to="/#templates"
							smooth
						>
							<span>Шаблони</span>
							<div className="menu-icon-container">
								<div className="menu-icon-wrapper">
									<img src={arrowTopIcon} width={16} height={16} alt="" />
									<img src={arrowTopIcon} width={16} height={16} alt="" />
								</div>
							</div>
						</HashLink>
						<HashLink
							onClick={() => setIsMenuActive(false)}
							className="menu-dd-nav__link"
							to="/#options"
							smooth
						>
							<span>Вартість</span>
							<div className="menu-icon-container">
								<div className="menu-icon-wrapper">
									<img src={arrowTopIcon} width={16} height={16} alt="" />
									<img src={arrowTopIcon} width={16} height={16} alt="" />
								</div>
							</div>
						</HashLink>
						<HashLink
							onClick={() => setIsMenuActive(false)}
							className="menu-dd-nav__link"
							to="/#qa"
							smooth
						>
							<span>Питання та відповіді</span>
							<div className="menu-icon-container">
								<div className="menu-icon-wrapper">
									<img src={arrowTopIcon} width={16} height={16} alt="" />
									<img src={arrowTopIcon} width={16} height={16} alt="" />
								</div>
							</div>
						</HashLink>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Header;
