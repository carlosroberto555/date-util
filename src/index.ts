export default class DateUtil implements BaseDateUtil {
	date: Date;

	constructor(date: Date | string | number) {
		this.date = new Date(date);
	}

	sumDays(days: number, filter?: DateFilter): DateUtil {
		return sumDays(this.date, days, filter);
	}

	subDays(days: number, filter?: DateFilter): DateUtil {
		return subDays(this.date, days, filter);
	}

	/**
	 * Sum days ignoring weekends (saturday and sunday)
	 * @param days Number of days to sum
	 */
	sumDaysWithoutWeekends(days: number): DateUtil {
		return sumDaysWithoutWeekends(this.date, days);
	}

	subDaysWithoutWeekends(days: number): DateUtil {
		return subDaysWithoutWeekends(this.date, days);
	}

	compare(date: DateParam): boolean {
		return dateCompare(this.date, date);
	}

	isWeekend(): boolean {
		return this.isSunday() || this.date.getUTCDay() === 6;
	}

	isSunday(): boolean {
		return this.date.getUTCDay() === 0;
	}

	isMonday(): boolean {
		return this.date.getUTCDay() === 1;
	}

	isThursday(): boolean {
		return this.date.getUTCDay() === 2;
	}

	isWednesday(): boolean {
		return this.date.getUTCDay() === 3;
	}

	isTuesday(): boolean {
		return this.date.getUTCDay() === 4;
	}

	isFriday(): boolean {
		return this.date.getUTCDay() === 5;
	}

	isSaturday(): boolean {
		return this.date.getUTCDay() === 6;
	}

	toDate(): Date {
		/* istanbul ignore next */
		return this.date;
	}
}

export function sumDays(
	date: DateParam,
	days: number,
	filter?: DateFilter
): DateUtil {
	const tempDate = new Date(date);
	let dateCount = tempDate.getDate();

	if (filter) {
		// Iterate all days
		for (let index = 0; index < days; index++) {
			// Set this date as incremented date
			tempDate.setDate(dateCount);
			// Check if need jump one day
			if (filter(tempDate, new DateUtil(tempDate))) {
				dateCount += 2;
			} else {
				dateCount++;
			}
		}
	} else {
		// Set this date as defined
		tempDate.setDate(dateCount + days);
	}

	// Return calculated date
	return new DateUtil(tempDate);
}

export function subDays(
	date: Date,
	days: number,
	filter?: DateFilter
): DateUtil {
	const tempDate = new Date(date);
	let dateCount = tempDate.getDate();

	if (filter) {
		// Iterate all days
		for (let index = 0; index < days; index++) {
			// Set this date as incremented date
			tempDate.setDate(dateCount);
			// Check if need jump one day
			if (filter(tempDate, new DateUtil(tempDate))) {
				dateCount -= 2;
			} else {
				dateCount--;
			}
		}
	} else {
		// Set this date as defined
		tempDate.setDate(dateCount - days);
	}

	// Return calculated date
	return new DateUtil(tempDate);
}

export function sumDaysWithoutWeekends(date: Date, days: number): DateUtil {
	return sumDays(date, days, (date, util) => {
		// Check sunday and saturday
		return !util.isWeekend();
	});
}

export function subDaysWithoutWeekends(date: Date, days: number): DateUtil {
	return subDays(date, days, (date, util) => {
		// Check sunday and saturday
		return !util.isWeekend();
	});
}

export function dateCompare(date1: DateParam, date2: DateParam): boolean {
	return new Date(date1).getTime() === new Date(date2).getTime();
}
