export interface Timeslot {
	time: string;
	available: number;
	bookedAlready?: boolean;
}

export interface Date {
	date: string;
	capacity: number;
	bookedAlready?: boolean;
	timeSlots: Timeslot[];
}

export interface ClientBooking {
	dateOfBooking: string;
	timeOfBooking: string;
}
