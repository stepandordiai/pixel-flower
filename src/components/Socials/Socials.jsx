import socialsData from "./../../assets/data/socials-data.json";
import "./Socials.scss";

const Socials = () => {
	return (
		<div className="socials">
			<h2 className="socials__title">Ми в соціальних мережах!</h2>
			<div className="socials__container">
				{socialsData.map((social, i) => {
					return (
						<a
							key={i}
							href={social.socialUrl}
							target="_blank"
							data-value={social.title}
							title={social.title}
						>
							<i className={social.fontIcon}></i>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default Socials;
