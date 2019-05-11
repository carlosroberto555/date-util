interface BaseDateUtil {
	date: Date;

	// constructor(date: DateParam) ;

	/**
	 * Sum days to date, and return a DateUtil object
	 * @param days Number of days to sum
	 * @param filter Filter on iterate days
	 */
	sumDays(days: number, filter?: DateFilter): BaseDateUtil;

	/**
	 * Subtract days to date, and return a DateUtil object
	 * @param days Number of days to sum
	 * @param filter Filter on iterate days
	 */
	subDays(days: number, filter?: DateFilter): BaseDateUtil;

	/**
	 * Sum days ignoring weekends (saturday and sunday)
	 * @param days Number of days to sum
	 */
	sumDaysWithoutWeekends(days: number): BaseDateUtil;

	/**
	 * Subtract days ignoring weekends (saturday and sunday)
	 * @param days Number of days to sum
	 */
	subDaysWithoutWeekends(days: number): BaseDateUtil;

	/**
	 * Compare this date with passed date to param
	 * @param date Date for comparision
	 */
	compare(date: DateParam): boolean;

	isWeekend(): boolean;
	isSunday(): boolean;
	isMonday(): boolean;
	isTuesday(): boolean;
	isWednesday(): boolean;
	isThursday(): boolean;
	isSaturday(): boolean;

	toDate(): Date;
}

interface DateFilter {
	(date: Date, util: BaseDateUtil): boolean;
}

type DateParam = Date | string | number;
