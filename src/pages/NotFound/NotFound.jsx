import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import arrowIcon from "/icons/top.png";
import "./NotFound.scss";

const NotFound = () => {
	return (
		<>
			<Helmet>
				<title>Сторінку не знайдено &sim; pixel flower</title>
			</Helmet>
			<div className="not-found">
				<span className="not-found__title">404</span>
				<span>Сторінку не знайдено</span>
				<NavLink className="not-found__link" to="/">
					<span>Дивитись шаблон</span>
					<span className="not-found__link-img-container">
						<span className="not-found__link-img-container-inner">
							<img src={arrowIcon} width={16} height={16} alt="" />
							<img src={arrowIcon} width={16} height={16} alt="" />
						</span>
					</span>
				</NavLink>
			</div>
		</>
	);
};

export default NotFound;
