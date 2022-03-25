export interface Timeslot {
	time: string;
	capacity: number;
	available: number;
	bookedAlready?: boolean;
}

export interface Date {
	date: string;
	bookedAlready?: boolean;
	timeslots: Timeslot[];
}

export interface ClientBooking {
	date: string;
	time: string;
}
