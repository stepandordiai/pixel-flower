import arrowTopIcon from "/icons/top.png";
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
				Сайт створено{" "}
				<a href="https://www.heeeyooo.studio/" target="_blank">
					heeeyooo studio
				</a>
			</p>
		</footer>
	);
};

export default Footer;
