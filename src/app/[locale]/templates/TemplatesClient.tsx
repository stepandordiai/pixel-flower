"use client";

import { useTranslations } from "next-intl";
import templates from "@/app/assets/data/templates.json";
import { useState } from "react";
import classNames from "classnames";
import ArrowRightIcon from "@/app/icons/ArrowRightIcon";
import { Link } from "@/i18n/navigation";
import styles from "./Templates.module.scss";
import Header from "@/app/components/layout/Header/Header";

const uniqueTemplateTypes = [
	...new Set(templates.map((template) => template.type)),
];

export default function TemplatesClient() {
	const t = useTranslations();

	const [type, setType] = useState(t("templates.all"));

	const filteredTemplates = templates.filter((template) => {
		if (type === t("templates.all")) return true;
		return t(template.type) === type;
	});

	return (
		<>
			<Header />
			<main className={styles.templates} id="templates">
				<h2 className={styles["templates__title"]}>{t("templatesTitle")}</h2>
				<div className={styles["filter-container"]}>
					<p style={{ fontWeight: 500 }}>
						{t("templates.chooseTheInvitationType")}
					</p>
					<div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
						{["templates.all", ...uniqueTemplateTypes].map((templateType) => {
							return (
								<button
									key={templateType}
									onClick={() => setType(t(templateType))}
									className={classNames(styles["templates__btn"], {
										[styles["templates__btn--active"]]:
											t(templateType) === type,
									})}
								>
									{t(templateType)}
								</button>
							);
						})}
					</div>
				</div>
				<div className={styles["templates-grid"]}>
					{filteredTemplates.map((template, index) => (
						<div key={template.id} className={styles["template"]}>
							<Link
								href={`/${template.id}`}
								className={styles["template__img-container"]}
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
								<div className={styles["template__link"]}>
									<span>{t("templates.viewTheTemplate")}</span>
									<span className={styles["template__link-img-container"]}>
										<span
											className={styles["template__link-img-container-inner"]}
										>
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
			</main>
		</>
	);
}
