import { NavLink } from "react-router-dom";
import templatesData from "./../../assets/data/templates-data.json";
import { useState } from "react";
import arrowIcon from "/icons/top.png";
import "./Templates.scss";

const Templates = () => {
	const uniqueTemplateOptions = [
		...new Set(
			templatesData
				.filter((template) => template.isTemplate)
				.map((template) => template.option)
		),
	];

	const uniqueTemplateTypes = [
		...new Set(
			templatesData
				.filter((template) => template.isTemplate)
				.map((template) => template.type)
		),
	];
	const [option, setOption] = useState("Всі");
	const [type, setType] = useState("Всі");

	const handleTemplatesBtn = (props) => {
		setOption((prev) => (prev = props));
	};

	const handleTemplateType = (props) => {
		setType((prev) => (prev = props));
	};

	const filteredTemplates = templatesData.filter((template) => {
		// Filtering option or type "all"
		if (
			((option === "Всі" && template.type === type) ||
				(type === "Всі" && template.option === option)) &&
			template.isTemplate
		) {
			return template;
			// Filtering option and type "all"
		} else if (option === "Всі" && type === "Всі" && template.isTemplate) {
			return template;
			// Filtering option and type
		} else
			return (
				template.option === option &&
				template.type === type &&
				template.isTemplate
			);
	});

	return (
		<div className="templates" id="templates">
			<h2 className="templates__title">Шаблони запрошень</h2>
			<div className="filters-container">
				<div className="filter-container">
					<p>Виберіть пакет запрошення</p>
					<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
						{["Всі", "Bronze", "Silver", "Gold"].map((templateOption) => {
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
						{["Всі", ...uniqueTemplateTypes].map((templateType) => {
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
								<p>{`0${index + 1}`}</p>
								<NavLink
									className="template__link"
									to={`/${envelope.type_code}/${envelope.id}`}
								>
									<span>Дивитись шаблон</span>
									<span className="template__link-img-container">
										<span className="template__link-img-container-inner">
											<img src={arrowIcon} width={16} height={16} alt="" />
											<img src={arrowIcon} width={16} height={16} alt="" />
										</span>
									</span>
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
