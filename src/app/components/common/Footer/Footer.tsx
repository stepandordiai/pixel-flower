"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Lng from "../../Lng/Lng";
import "./Footer.scss";

const scrollToTop = () => {
	window.scrollTo(0, 0);
};

const Footer = () => {
	const t = useTranslations();

	return (
		<footer className="footer">
			<Link href="/">
				<Image
					src="/logo/pixel-flower-logo.svg"
					width={128}
					height={128}
					alt="Go to home page"
				/>
			</Link>
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
			<Lng />
			<p>&copy; {new Date().getFullYear()} pixel flower</p>
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
