import { useState } from "react";
import { Date } from "../../types/DateTypes";
import TimeColumn from "./TimeColumn";
import TimeTableContext from "./TimeTableContext";

interface Props {
	dates: Date[];
	branchId: string | number;
}

const TimeTable: React.FC<Props> = ({ dates, branchId }) => {
	const [stateDates, setStateDates] = useState(dates);
	return (
		<TimeTableContext.Provider value={{ dates, setStateDates, branchId }}>
			<div className="p-4 w-full flex flex-row justify-center items-center bg-white-2 rounded-lg shadow-md divide-x-2 divide-white-3">
				{stateDates.map((date, index) => (
					<TimeColumn key={index} date={date} />
				))}
			</div>
		</TimeTableContext.Provider>
	);
};

export default TimeTable;
