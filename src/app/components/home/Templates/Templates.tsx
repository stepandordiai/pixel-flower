"use client";

import { useTranslations } from "next-intl";
import templates from "./../../../assets/data/templates.json";
import { useState } from "react";
import classNames from "classnames";
import ArrowRightIcon from "@/app/icons/ArrowRightIcon";
import { Link } from "@/i18n/navigation";
import "./Templates.scss";

const uniqueTemplateTypes = [
	...new Set(templates.map((template) => template.type)),
];

export default function Templates() {
	const t = useTranslations();

	const [type, setType] = useState(t("templates.all"));

	const filteredTemplates = templates.filter((template) => {
		if (type === t("templates.all")) return true;
		return t(template.type) === type;
	});

	return (
		<div className="templates" id="templates">
			<h2 className="templates__title">{t("templatesTitle")}</h2>
			<div className="filter-container">
				<p style={{ fontWeight: 500 }}>
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
			{filteredTemplates.length === 0 ? (
				<div className="no-data">
					Шаблони такого пакету та типу поки-що відсутні 😣
				</div>
			) : (
				<div className="templates-grid">
					{filteredTemplates.map((template, index) => (
						<div key={template.id} className="template">
							<Link
								// href={`/${template.type_code}/${template.id}${template.hasGuestRoute ? "/guest" : ""}`}
								href={`/${template.id}`}
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
