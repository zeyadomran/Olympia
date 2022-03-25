import { Dates } from "../../types/DateTypes";
import { formatDate } from "../../utils/format";
import TimeRow from "./TimeRow";

interface Props {
	timeslot: Dates;
}

const TimeColumn: React.FC<Props> = ({ timeslot }) => {
	return (
		<div className="flex flex-col justify-center items-center gap-y-4 w-full p-4 divide-y-2 divide-white-3">
			<div className="flex justify-center items-center">
				<h3 className="text-lg font-bold">{formatDate(timeslot.date)}</h3>
			</div>
			<div className="flex flex-col justify-start items-center gap-y-4 w-full max-h-[28rem] overflow-y-scroll pt-6">
				{timeslot.timeslots.map((time, index) => (
					<TimeRow key={index} time={time} dayBooked={timeslot.bookedAlready} />
				))}
			</div>
		</div>
	);
};

export default TimeColumn;
