// TODO: learn this
export const getMonthName = (date: Date) => {
	const nominative = date.toLocaleDateString("uk-UA", { month: "long" });

	const genitive = date
		.toLocaleDateString("uk-UA", { day: "numeric", month: "long" })
		.replace(/^\d+\s*/, "");

	return { nominative, genitive };
};
