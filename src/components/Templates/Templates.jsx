import { NavLink } from "react-router-dom";
import data from "./../../assets/data/data.json";
import { useState } from "react";
import "./Templates.scss";

const Templates = () => {
	const uniqueTemplateOptions = [
		...new Set(
			data
				.filter((template) => template.isTemplate)
				.map((template) => template.option)
		),
	];

	const uniqueTemplateTypes = [
		...new Set(
			data
				.filter((template) => template.isTemplate)
				.map((template) => template.type)
		),
	];
	const [option, setOption] = useState(uniqueTemplateOptions[0]);
	const [type, setType] = useState(uniqueTemplateTypes[0]);

	const handleTemplatesBtn = (props) => {
		setOption((prev) => (prev = props));
	};

	const handleTemplateType = (props) => {
		setType((prev) => (prev = props));
	};

	const filteredTemplates = data.filter((template) => {
		return (
			template.option === option &&
			template.type === type &&
			template.isTemplate
		);
	});

	return (
		<div className="templates" id="templates">
			<p className="options__title">Шаблони</p>
			<div className="filters-container">
				<div className="filter-container">
					<p>Виберіть опцію</p>
					<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
						{/* {uniqueTemplateOptions.map((templateOption) => { */}
						{["Bronze", "Silver", "Gold"].map((templateOption) => {
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
				</div>
				<div className="filter-container">
					<p>Виберіть тип запрошення</p>
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
				</div>
			</div>
			<div className="templates-grid">
				{filteredTemplates.length === 0 ? (
					<div className="no-data">
						Шаблони такої опції та типу поки-що відсутні 😣
					</div>
				) : (
					filteredTemplates.map((envelope, index) => (
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
					))
				)}
			</div>
		</div>
	);
};

export default Templates;
