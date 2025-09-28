import packagesData from "./../../assets/data/packages-data.json";
import checkGrayIcon from "/icons/check-gray.png";
import checkAccentIcon from "/icons/check-accent.png";
import arrowIcon from "/top.png";
import "./Packages.scss";

const Packages = () => {
	const instaUrl = "https://www.instagram.com/pixelflower.studio/";

	return (
		<div className="packages-container" id="packages">
			<p className="packages__title">Пакети та Вартість</p>
			<div className="packages">
				{packagesData.map((pack) => {
					return (
						<div key={pack.name} className="package">
							<p className="package__title">{pack.name}</p>
							<p className="package__price">₴{pack.price}</p>
							<a className="package__link" href={instaUrl} target="_blank">
								<span>Залишити заявку</span>
								<span className="package__link-img-container">
									<span className="package__link-img-container-inner">
										<img src={arrowIcon} width={16} height={16} alt="" />
										<img src={arrowIcon} width={16} height={16} alt="" />
									</span>
								</span>
							</a>
							<div className="package__info">
								<p className="package__info-title">
									Опції, які входять в пакет:
								</p>
								<div className="package__info-list">
									{pack.options.map((option, index) => {
										return (
											<p key={index}>
												<img
													src={
														option.isIncluded ? checkAccentIcon : checkGrayIcon
													}
													width={20}
													height={20}
													alt=""
												/>{" "}
												<span>{option.name}</span>
											</p>
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
