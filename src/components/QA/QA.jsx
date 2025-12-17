import { useTranslation } from "react-i18next";
import "./QA.scss";

const QA = () => {
	const { t } = useTranslation();

	return (
		<div className="qa" id="qa">
			<h2 className="qa__title">{t("questionsAndAnswersTitle")}</h2>
			<div className="qa-grid">
				<div className="qa-item">
					<p className="qa-item__title">{t("questionsAndAnswers.question1")}</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer1")}</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">
						<p>{t("questionsAndAnswers.question2")}</p>
					</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer2")}</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">{t("questionsAndAnswers.question3")}</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer3")}</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">{t("questionsAndAnswers.question4")}</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer4")}</p>
					</div>
				</div>
				<div className="qa-item">
					<p className="qa-item__title">{t("questionsAndAnswers.question5")}</p>
					<div className="qa-item__desc">
						<p>{t("questionsAndAnswers.answer5")}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QA;
