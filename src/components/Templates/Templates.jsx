import { NavLink } from "react-router-dom";
import data from "./../../assets/data/data.json";
import { useState } from "react";
import "./Templates.scss";

const Templates = () => {
	const [option, setOption] = useState("Bronze");
	const [type, setType] = useState("Весілля");

	const handleTemplatesBtn = (props) => {
		setOption((prev) => (prev = props));
	};

	const handleTemplateType = (props) => {
		setType((prev) => (prev = props));
	};

	const uniqueTemplateOptions = [
		...new Set(data.map((template) => template.option)),
	];

	const uniqueTemplateTypes = [
		...new Set(data.map((template) => template.type)),
	];

	return (
		<div className="templates">
			<p className="options__title">Шаблони</p>
			<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
				{uniqueTemplateOptions.map((templateOption) => {
					return (
						<button
							key={templateOption}
							onClick={() => handleTemplatesBtn(templateOption)}
							className={
								templateOption === option
									? "templates__btn templates__btn--active"
									: "templates__btn"
							}
						>
							{templateOption}
						</button>
					);
				})}
			</div>
			<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
				{uniqueTemplateTypes.map((templateType) => {
					return (
						<button
							key={templateType}
							onClick={() => handleTemplateType(templateType)}
							className={
								templateType === type
									? "templates__btn templates__btn--active"
									: "templates__btn"
							}
						>
							{templateType}
						</button>
					);
				})}
			</div>
			{/* TODO: */}
			{data
				.filter((envelope) => {
					return envelope.option === option && envelope.type === type;
				})
				.map((envelope, index) => (
					<div key={envelope.id} className="template">
						<div className="template__img-container">
							{envelope.ss.map((img, index) => {
								return <img key={index} src={img} alt="" />;
							})}
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							{/* <p className="template__type">{envelope.type}</p> */}
							<p>{`0${index + 1}`}</p>
							<NavLink
								className="option__link"
								to={`/${envelope.type_code}-${envelope.option_code}/${envelope.id}`}
							>
								Дивитись шаблон
							</NavLink>
						</div>
					</div>
				))}
		</div>
	);
};

export default Templates;
