import { useTranslation } from "react-i18next";
import packagesData from "./../../assets/data/packages-data.json";
import socialsData from "../../assets/data/socialsData";
import ArrowRightIcon from "../../icons/ArrowRightIcon";
import "./Packages.scss";

const Packages = () => {
	const { t } = useTranslation();

	return (
		<div className="packages-container" id="packages">
			<p className="packages__title">{t("packagesAndPricingTitle")}</p>
			<div className="packages">
				{packagesData.map((pack) => {
					return (
						<div key={pack.name} className="package">
							<p className="package__title">{t(pack.name)}</p>
							<p className="package__price">
								<span
									style={{ textDecoration: "line-through", fontWeight: 400 }}
								>
									{t(pack.price)}
								</span>{" "}
								<span>{t(pack.priceDiscount)}</span>
							</p>
							<a
								className="package__link"
								href={socialsData[0].socialUrl}
								target="_blank"
							>
								<span>{t("packagesAndPricing.chooseThisPackage")}</span>
								<span className="package__link-img-container">
									<span className="package__link-img-container-inner">
										{[...Array(2)].map((_, i) => {
											return <ArrowRightIcon key={i} />;
										})}
									</span>
								</span>
							</a>
							<div className="package__info">
								<p className="package__info-title">
									{t("packagesAndPricing.optionsTitle")}
								</p>
								<div className="package__info-list">
									{pack.options.map((option, index) => {
										return (
											<div className="package__info-item" key={index}>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="20"
													fill={option.isIncluded ? "#0f0" : "#f00"}
													className="bi bi-check"
													viewBox="0 0 16 16"
												>
													<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
												</svg>{" "}
												<span>{t(option.name)}</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Packages;
