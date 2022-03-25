import { Date } from "../../types/DateTypes";
import { formatDate } from "../../utils/format";
import TimeSlot from "./TimeSlot";

interface Props {
	date: Date;
}

const TimeColumn: React.FC<Props> = ({ date }) => {
	return (
		<div className="flex flex-col justify-center items-center gap-y-4 w-full p-4 divide-y-2 divide-white-3">
			<div className="flex flex-row justify-between gap-x-4 items-center">
				<h3 className="text-lg font-bold select-none">
					{formatDate(date.date)}
				</h3>
				{date.bookedAlready && (
					<div className="text-sm bg-green text-white font-bold px-2 py-1 rounded-md select-none">
						Booked
					</div>
				)}
			</div>
			<div className="flex flex-col justify-start items-center gap-y-4 w-full max-h-[24rem] overflow-y-scroll pt-6">
				{date.timeslots.map((time, index) => (
					<TimeSlot key={index} time={time} date={date} />
				))}
			</div>
		</div>
	);
};

export default TimeColumn;
