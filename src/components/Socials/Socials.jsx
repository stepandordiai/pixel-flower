import socialsData from "../../assets/data/socialsData";
import "./Socials.scss";

const Socials = () => {
	return (
		<div className="socials">
			<h2 className="socials__title">Ми в соціальних мережах!</h2>
			<div className="socials__container">
				{socialsData.map((social, i) => {
					const Icon = social.icon;
					return (
						<a
							key={i}
							href={social.socialUrl}
							target="_blank"
							data-value={social.title}
							title={social.title}
						>
							<Icon size={32} />
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default Socials;
