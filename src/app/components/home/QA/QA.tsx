import { getTranslations } from "next-intl/server";
import styles from "./QA.module.scss";

const questionsAnswersData = [
	{
		question: "questionsAndAnswers.question1",
		answer: "questionsAndAnswers.answer1",
	},
	{
		question: "questionsAndAnswers.question2",
		answer: "questionsAndAnswers.answer2",
	},
	{
		question: "questionsAndAnswers.question3",
		answer: "questionsAndAnswers.answer3",
	},
	{
		question: "questionsAndAnswers.question4",
		answer: "questionsAndAnswers.answer4",
	},
	{
		question: "questionsAndAnswers.question5",
		answer: "questionsAndAnswers.answer5",
	},
];

const QA = async () => {
	const t = await getTranslations();

	return (
		<div className={styles.section} id="qa">
			<h2 className={styles["qa__title"]}>{t("questionsAndAnswersTitle")}</h2>
			<div className={styles["qa-grid"]}>
				{questionsAnswersData.map(({ question, answer }, i) => {
					return (
						<div key={i} className={styles["qa-item"]}>
							<p className={styles["qa-item__title"]}>
								{t(question)}
								<span>?</span>
							</p>
							<div className={styles["qa-item__desc"]}>
								<p>{t(answer)}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QA;
