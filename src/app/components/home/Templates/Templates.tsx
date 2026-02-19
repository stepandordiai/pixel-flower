"use client";

import { useTranslations } from "next-intl";
import templatesData from "./../../../assets/data/templates-data.json";
import { useState } from "react";
import classNames from "classnames";
import ArrowRightIcon from "@/app/icons/ArrowRightIcon";
import { Link } from "@/i18n/navigation";
import "./Templates.scss";

const uniqueTemplateTypes = [
	...new Set(templatesData.map((template) => template.type)),
];

export default function Templates() {
	const t = useTranslations();

	const [option, setOption] = useState(t("templates.all"));
	const [type, setType] = useState(t("templates.all"));

	// TODO: learn this
	const filteredTemplates = templatesData.filter((template) => {
		// Filtering option or type "all"
		if (
			(option === t("templates.all") &&
				t(template.type) === type &&
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
				t(template.type) === type &&
				template.isTemplate
			);
	});

	return (
		<div className="templates" id="templates">
			<h2 className="templates__title">{t("templatesTitle")}</h2>
			<div className="filters-container">
				<div className="filter-container">
					<p style={{ fontWeight: 600 }}>
						{t("templates.chooseAnInvitationPackage")}
					</p>
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
							},
						)}
					</div>
				</div>
				<div className="filter-container">
					<p style={{ fontWeight: 600 }}>
						{t("templates.chooseTheInvitationType")}
					</p>
					<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
						{["templates.all", ...uniqueTemplateTypes].map((templateType) => {
							return (
								<button
									key={templateType}
									onClick={() => setType(t(templateType))}
									className={classNames("templates__btn", {
										"templates__btn--active": t(templateType) === type,
									})}
								>
									{t(templateType)}
								</button>
							);
						})}
					</div>
				</div>
			</div>
			{filteredTemplates.length === 0 ? (
				<div className="no-data">
					Шаблони такого пакету та типу поки-що відсутні 😣
				</div>
			) : (
				<div className="templates-grid">
					{filteredTemplates.map((template, index) => (
						<div key={template.id} className="template">
							<div
								className={classNames("template__type", {
									"template__type--bronze": template.option === "Bronze",
									"template__type--silver": template.option === "Silver",
									"template__type--gold": template.option === "Gold",
								})}
							>
								{template.option}
							</div>
							<Link
								href={`/${template.type_code}/${template.id}${template.hasGuestRoute ? "/guest" : ""}`}
								className="template__img-container"
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									padding: 25,
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
												return <ArrowRightIcon key={i} size={24} />;
											})}
										</span>
									</span>
								</div>
							</Link>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<p style={{ fontSize: "18px", fontWeight: 500 }}>
									{t(template.type)}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
