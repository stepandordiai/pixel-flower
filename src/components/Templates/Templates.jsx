import templatesData from "./../../assets/data/templates-data.json";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Templates.scss";

const uniqueTemplateTypes = [
	...new Set(templatesData.map((template) => template.type)),
];

const Templates = () => {
	const [option, setOption] = useState("Всі");
	const [type, setType] = useState("Всі");

	// TODO:
	const filteredTemplates = templatesData.filter((template) => {
		// Filtering option or type "all"
		if (
			(option === "Всі" && template.type === type) ||
			(type === "Всі" && template.option === option)
		) {
			return template;
			// Filtering option and type "all"
		} else if (option === "Всі" && type === "Всі") {
			return template;
			// Filtering option and type
		} else return template.option === option && template.type === type;
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
									onClick={() => setOption(templateOption)}
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
						{/* TODO: */}
						{["Всі", ...uniqueTemplateTypes].map((templateType) => {
							return (
								<button
									key={templateType}
									onClick={() => setType(templateType)}
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
						Шаблони такого пакету та типу поки-що відсутні 😣
					</div>
				) : (
					filteredTemplates.map((template, index) => (
						<div key={template.id} className="template">
							<div className="template__type">{template.option}</div>
							<NavLink
								to={`/${template.type_code}/${template.id}`}
								className="template__img-container"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								{template.ss ? (
									<img key={index} src={template.ss} alt="" />
								) : (
									<span style={{ fontSize: "1.5rem" }}>Скоро буде!</span>
								)}
								<div className="template__link">
									<span>Дивитись шаблон</span>
									<span className="template__link-img-container">
										<span className="template__link-img-container-inner">
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
								</div>
							</NavLink>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<p style={{ fontSize: "1.2rem" }}>{template.type}</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Templates;
