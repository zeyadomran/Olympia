import { Dates } from "../../types/DateTypes";
import TimeColumn from "./TimeColumn";

interface Props {
	available: Dates[];
}

const TimeTable: React.FC<Props> = ({ available }) => {
	return (
		<div className="p-4 w-full flex flex-row justify-center items-center bg-white-2 rounded-lg shadow-md divide-x-2 divide-white-3">
			{available.map((timeslot, index) => (
				<TimeColumn key={index} timeslot={timeslot} />
			))}
		</div>
	);
};

export default TimeTable;
