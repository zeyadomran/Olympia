import { createContext, Dispatch, SetStateAction } from "react";
import { Date } from "../../types/DateTypes";

const TimeTableContext = createContext<
	{ dates: Date[]; setStateDates: Dispatch<SetStateAction<Date[]>> } | undefined
>(undefined);
export default TimeTableContext;
