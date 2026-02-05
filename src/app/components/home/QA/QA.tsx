"use client";

import { useTranslations } from "next-intl";
import "./QA.scss";

export default function QA() {
	const t = useTranslations();

	return (
		<div className="qa" id="qa">
			<h2 className="qa__title">{t("questionsAndAnswersTitle")}</h2>
			<div className="qa-grid">
				<div className="qa-item">
					<p className="qa-item__title">
						{t("questionsAndAnswers.question1")}
						<span>?</span>
					</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer1")}</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						{t("questionsAndAnswers.question2")}
						<span>?</span>
					</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer2")}</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						{t("questionsAndAnswers.question3")}
						<span>?</span>
					</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer3")}</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						{t("questionsAndAnswers.question4")}
						<span>?</span>
					</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer4")}</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						{t("questionsAndAnswers.question5")}
						<span>?</span>
					</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer5")}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
