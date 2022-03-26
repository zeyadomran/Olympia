import Client from "../types/Client";
import { ClientBooking, Date, Timeslot } from "../types/DateTypes";
import Employee from "../types/Employee";
import Item from "../types/Item";

const dates: string[] = [
	"2022-03-24",
	"2022-03-25",
	"2022-03-26",
	"2022-03-27",
	"2022-03-28",
	"2022-03-29",
	"2022-03-30",
];

const generateRandomTimes = (
	startHour: number,
	endHour: number,
	capacity: number
): Date[] => {
	const result: Date[] = [];
	for (let date of dates) {
		let timeslots: Timeslot[] = [];
		for (let i = startHour; i < endHour; i++) {
			if (i < 10) {
				timeslots.push({
					time: `0${i}:00`,
					capacity,
					available: Math.floor(Math.random() * capacity + 1),
				});
			} else {
				timeslots.push({
					time: `${i}:00`,
					capacity,
					available: Math.floor(Math.random() * capacity + 1),
				});
			}
			if (Math.floor(Math.random() * 8) === 1)
				timeslots[timeslots.length - 1].available = 0;
		}
		result.push({ date, timeslots });
	}
	return result;
};

const generateRandomBookings = (
	startHour: number,
	endHour: number
): ClientBooking[] => {
	const result: ClientBooking[] = [];
	for (let date of dates) {
		if (Math.floor(Math.random() * 7) !== 6) {
			const time = Math.floor(Math.random() * endHour - startHour) + startHour;
			if (time < 10) {
				result.push({
					date,
					time: `0${time}:00`,
				});
			} else {
				result.push({
					date,
					time: `${time}:00`,
				});
			}
		}
	}
	return result;
};

export const CLIENT: Client = {
	clientId: 10001,
	email: "bob@gmail.com",
	phoneNum: "4035551234",
	dob: "2001-03-27",
	firstName: "Bob",
	lastName: "Smith",
	sex: "M",
	memberType: "YEAR_PASS",
	price: 480.0,
	startDate: "2022-01-01",
	endDate: "2022-12-31",
};

export const EMPLOYEE: Employee = {
	eId: 10001,
	eType: "Admin",
	email: "bob@gmail.com",
	phoneNum: "4035551234",
	dob: "2001-03-27",
	firstName: "Bob",
	lastName: "Smith",
	sex: "M",
};

export const BRANCHES: Item[] = [
	{ id: "1", name: "University District" },
	{ id: "2", name: "Stephen Ave" },
	{ id: "3", name: "Brentwood" },
	{ id: "4", name: "Citadel" },
];

export const SERVICES: Item[] = [
	{ id: "1", name: "Swimming Pool" },
	{ id: "2", name: "Sauna" },
	{ id: "3", name: "Cardio with Chloe" },
	{ id: "4", name: "Deadlift with Zeyad" },
];

export const EQUIPMENT: Item[] = [
	{ id: "1", name: "Bench Press" },
	{ id: "2", name: "Squat Rack" },
	{ id: "3", name: "Lat Pulldown" },
	{ id: "4", name: "Dumbbell Rack" },
];

export const GYM_AND_SERVICE_AVAILABLE_TIMES: Date[] = generateRandomTimes(
	6,
	23,
	40
);

export const GYM_AND_SERVICE_BOOKED_ALREADY: ClientBooking[] =
	generateRandomBookings(6, 23);
