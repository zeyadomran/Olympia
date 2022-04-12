import { ClientBooking, Timeslot, Date as D } from "../types/DateTypes";
import Service, { ServiceFormatted } from "../types/Service";

export const formatAndMergeTimeslots = (
	available: D[],
	booked: ClientBooking[]
): D[] => {
	const formattedAvailable: D[] = [];

	for (let i = 0; i < available.length; i++) {
		const timeslots: Timeslot[] = [];
		const availableTimeslots = available[i].timeSlots;
		let dayBooked = false;
		for (let j = 0; j < availableTimeslots.length; j++) {
			const t = availableTimeslots[j];
			const bookedAlready = booked.find(
				(b) => b.dateOfBooking === available[i].date && b.timeOfBooking === t[0]
			);
			const b = bookedAlready ? true : false;
			if (b && !dayBooked) dayBooked = true;
			timeslots.push({
				time: t[0],
				available: t[1],
				bookedAlready: b,
			});
		}
		formattedAvailable.push({
			...available[i],
			timeSlots: timeslots,
			bookedAlready: dayBooked,
		});
	}
	return formattedAvailable;
};

export const formatServiceAvailTimes = (
	services: Service[],
	clientBooked: string[]
) => {
	const formattedAvailable: ServiceFormatted[] = [];
	for (let i = 0; i < services.length; i++) {
		const daysOffered = services[i].daysOfService;
		for (let j = 0; j < daysOffered.length; j++) {
			let day = getDate(daysOffered[j]);
			let b = false;

			for (let k = 0; k < clientBooked.length; k++) {
				if (
					formatFullDate(addDays(clientBooked[k], 1)) === formatFullDate(day)
				) {
					b = true;
					break;
				}
				console.log(b, day, addDays(clientBooked[k], 1));
			}

			formattedAvailable.push({
				s: services[i],
				date: day,
				bookedAlready: b,
				timeStart: services[i].timeOfService,
				timeEnd: services[i].timeEnds,
			});
		}
	}
	return formattedAvailable;
};

export const getDate = (day: string) => {
	const today = new Date();
	const first = today.getDate() - today.getDay() + getDayofWeek(day);

	const date = new Date(today.setDate(first));
	return date;
};

export const formatDate = (d: string): string => {
	const date = addDays(d, 1);
	const month = date.toLocaleString("en-US", { month: "short" });
	const day = date.getDate();
	return `${month} ${day}`;
};
export const formatDateDate = (d: Date): string => {
	const month = d.toLocaleString("en-US", { month: "short" });
	const day = d.getDate();
	return `${month} ${day}`;
};

export const formatSentenceCase = (str: string): string => {
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export const formatMembershipType = (membershipType: string): string => {
	switch (membershipType) {
		case "DAY_PASS":
			return "1 Day Pass";
		case "WEEK_PASS":
			return "1 Week Pass";
		case "30_DAY_PASS":
			return "Monthly Pass";
		case "90_DAY_PASS":
			return "3 Months Pass";
		case "180_DAY_PASS":
			return "6 Months Pass";
		case "YEAR_PASS":
			return "Yearly Pass";
	}
	return "";
};

export const getEndDate = (membershipType: string, date: string): Date => {
	switch (membershipType) {
		case "DAY_PASS":
			return addDays(date, 1);
		case "WEEK_PASS":
			return addDays(date, 7);
		case "30_DAY_PASS":
			return addDays(date, 30);
		case "90_DAY_PASS":
			return addDays(date, 90);
		case "180_DAY_PASS":
			return addDays(date, 180);
		case "YEAR_PASS":
			return addDays(date, 365);
	}
	return new Date();
};

export const getPrice = (membershipType: string): number => {
	switch (membershipType) {
		case "DAY_PASS":
			return 15.0;
		case "WEEK_PASS":
			return 45.0;
		case "30_DAY_PASS":
			return 100.0;
		case "90_DAY_PASS":
			return 200.0;
		case "180_DAY_PASS":
			return 350.0;
		case "YEAR_PASS":
			return 600.0;
	}
	return 0;
};

export const addDays = (date: string, days: number) => {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

const getDayofWeek = (d: string) => {
	switch (d.toUpperCase()) {
		case "M":
			return 1;
		case "T":
			return 2;
		case "W":
			return 3;
		case "R":
			return 4;
		case "F":
			return 5;
		case "S":
			return 6;
		case "U":
			return 0;
	}
	return 0;
};

export const formatFullDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}-${month < 10 ? "0" + month : month}-${
		day < 10 ? "0" + day : day
	}`;
};
