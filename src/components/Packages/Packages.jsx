import packagesData from "./../../assets/data/packages-data.json";
import socialsData from "../../assets/data/socialsData";
import "./Packages.scss";

const Packages = () => {
	return (
		<div className="packages-container" id="packages">
			<p className="packages__title">Пакети та Вартість</p>
			<div className="packages">
				{packagesData.map((pack) => {
					return (
						<div key={pack.name} className="package">
							<p className="package__title">{pack.name}</p>
							<p className="package__price">{pack.price}₴</p>
							<a
								className="package__link"
								href={socialsData[0].socialUrl}
								target="_blank"
							>
								<span>Залишити заявку</span>
								<span className="package__link-img-container">
									<span className="package__link-img-container-inner">
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
												<span>{option.name}</span>
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
