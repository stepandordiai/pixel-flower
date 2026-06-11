// TODO: learn this
export function getPluralForm(
	time: number,
	one: string,
	two: string,
	five: string,
): string {
	const abs = Math.abs(time);
	const lastDigit = abs % 10;
	const lastTwoDigits = abs % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return five;
	}

	if (lastDigit === 1) {
		return one;
	}

	if (lastDigit >= 2 && lastDigit <= 4) {
		return two;
	}

	return five;
}
