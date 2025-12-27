import { useTranslation } from "react-i18next";
import templatesData from "./../../assets/data/templates-data.json";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import "./Templates.scss";

const uniqueTemplateTypes = [
	...new Set(templatesData.map((template) => template.type)),
];

const Templates = () => {
	const { t } = useTranslation();

	const [option, setOption] = useState(t("templates.all"));
	const [type, setType] = useState(t("templates.all"));

	// TODO:
	const filteredTemplates = templatesData.filter((template) => {
		// Filtering option or type "all"
		if (
			(option === t("templates.all") &&
				template.type === type &&
				template.isTemplate) ||
			(type === t("templates.all") &&
				template.option === option &&
				template.isTemplate)
		) {
			return template;
			// Filtering option and type "all"
		} else if (
			option === t("templates.all") &&
			type === t("templates.all") &&
			template.isTemplate
		) {
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
			<h2 className="templates__title">{t("templatesTitle")}</h2>
			<div className="filters-container">
				<div className="filter-container">
					<p>{t("templates.chooseAnInvitationPackage")}</p>
					<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
						{[t("templates.all"), "Bronze", "Silver", "Gold"].map(
							(templateOption) => {
								return (
									<button
										key={templateOption}
										onClick={() => setOption(templateOption)}
										className={classNames("templates__btn", {
											"templates__btn--active": templateOption === option,
										})}
									>
										{templateOption}
									</button>
								);
							}
						)}
					</div>
				</div>
				<div className="filter-container">
					<p>{t("templates.chooseTheInvitationType")}</p>
					<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
						{/* TODO: */}
						{[t("templates.all"), ...uniqueTemplateTypes].map(
							(templateType) => {
								return (
									<button
										key={templateType}
										onClick={() => setType(templateType)}
										className={classNames("templates__btn", {
											"templates__btn--active": templateType === type,
										})}
									>
										{t(templateType)}
									</button>
								);
							}
						)}
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
									<span style={{ fontSize: "1.5rem" }}>
										{t("templates.comingSoon")}
									</span>
								)}
								<div className="template__link">
									<span>{t("templates.viewTheTemplate")}</span>
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
								<p style={{ fontSize: "1.2rem" }}>{t(template.type)}</p>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Templates;
