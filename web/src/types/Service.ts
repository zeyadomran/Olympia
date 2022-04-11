export default interface Service {
	branchId: string | number;
	serviceId: string | number;
	serviceName: string;
	capacity: number;
	daysOfService: string;
	description: string;
	timeOfService: string;
	timeEnds: string;
	Instructors: string[] | number[];
}
