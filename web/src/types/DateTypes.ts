export interface Timeslot {
	time: string;
	capacity: number;
	available: number;
	bookedAlready?: boolean;
}

export interface Dates {
	date: string;
	bookedAlready?: boolean;
	timeslots: Timeslot[];
}

export interface ClientBooking {
	date: string;
	time: string;
}
