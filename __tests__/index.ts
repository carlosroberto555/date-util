import DateUtil, { dateCompare } from "../src/index";

describe("Date manipulation", () => {
	const dateUtil = new DateUtil("2019-05-10");

	it("sum five days", () => {
		expect(dateUtil.sumDays(10).compare("2019-05-20")).toBeTruthy();
	});

	it("subtract five days", () => {
		expect(dateUtil.subDays(10).compare("2019-04-30")).toBeTruthy();
	});

	it("compare two dates equals", () => {
		expect(dateCompare(new Date(), new Date())).toBeTruthy();
	});

	it("sum five days ignoring 2019-05-11 and 2019-05-14 to be return 2019-05-17", () => {
		// Date after filter
		const returnDate = dateUtil.sumDays(5, (date, util) => {
			return !(
				util.compare(new Date("2019-05-11")) ||
				util.compare(new Date("2019-05-14"))
			);
		});

		// Compares with the expected date for the test
		expect(returnDate.compare("2019-05-17")).toBeTruthy();
	});

	it("subtract five days ignoring 2019-05-09 and 2019-05-06 to be return 2019-05-03", () => {
		// Date after filter
		const returnDate = dateUtil.subDays(5, date => {
			const util = new DateUtil(date);
			return !(
				util.compare(new Date("2019-05-09")) ||
				util.compare(new Date("2019-05-06"))
			);
		});

		// Compares with the expected date for the test
		expect(returnDate.compare("2019-05-03")).toBeTruthy();
	});

	it("sum five days ignoring weekends", () => {
		expect(
			dateUtil.sumDaysWithoutWeekends(5).compare("2019-05-17")
		).toBeTruthy();
	});

	it("subtract five days ignoring weekends", () => {
		expect(
			dateUtil.subDaysWithoutWeekends(5).compare("2019-05-03")
		).toBeTruthy();
	});
});

describe("Weekdays flags", () => {
	it("check sunday", () => {
		expect(new DateUtil("2019-05-05").isSunday()).toBeTruthy();
	});
	it("check monday", () => {
		expect(new DateUtil("2019-05-06").isMonday()).toBeTruthy();
	});
	it("check thursday", () => {
		expect(new DateUtil("2019-05-07").isThursday()).toBeTruthy();
	});
	it("check wednesday", () => {
		expect(new DateUtil("2019-05-08").isWednesday()).toBeTruthy();
	});
	it("check tuesday", () => {
		expect(new DateUtil("2019-05-09").isTuesday()).toBeTruthy();
	});
	it("check friday", () => {
		expect(new DateUtil("2019-05-10").isFriday()).toBeTruthy();
	});
	it("check saturday", () => {
		expect(new DateUtil("2019-05-11").isSaturday()).toBeTruthy();
	});
	it("check weekend", () => {
		expect(new DateUtil("2019-05-11").isWeekend()).toBeTruthy();
		expect(new DateUtil("2019-05-12").isWeekend()).toBeTruthy();
	});
});
