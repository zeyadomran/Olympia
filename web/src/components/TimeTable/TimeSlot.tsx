import { Loader } from "@mantine/core";
import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import {
	MdErrorOutline,
	MdOutlineBookmarkAdded,
	MdOutlineCancel,
	MdOutlineCheckCircle,
} from "react-icons/md";
import { Date, Timeslot } from "../../types/DateTypes";
import TimeTableContext from "./TimeTableContext";

interface Props {
	time: Timeslot;
	date: Date;
}

enum SLOT_STATES {
	INITIAL,
	LOADING,
	SUCCESS,
	ERROR,
}

const TimeSlot: React.FC<Props> = ({ time, date }) => {
	const [mode, setMode] = useState(SLOT_STATES.INITIAL);
	const isFull = time.available === 0;

	useEffect(() => {
		if (mode === SLOT_STATES.SUCCESS)
			setTimeout(() => setMode(SLOT_STATES.INITIAL), 3000);
	}, [mode]);

	const ctx = useContext(TimeTableContext);
	let setStateDates: Dispatch<SetStateAction<Date[]>>, dates: Date[];
	if (ctx) {
		setStateDates = ctx.setStateDates;
		dates = ctx.dates;
	}

	const book = () => {
		setMode(SLOT_STATES.LOADING);
		setTimeout(() => {
			const res = dates.map((d) => {
				if (d.date === date.date) {
					d.bookedAlready = true;
					d.timeslots.map((t) => {
						if (t.time === time.time) {
							t.bookedAlready = true;
							t.available -= 1;
						}
						return t;
					});
				}
				return d;
			});
			setStateDates(res);
			setMode(SLOT_STATES.SUCCESS);
		}, 3000);
	};

	const cancel = () => {
		setMode(SLOT_STATES.LOADING);
		setTimeout(() => {
			const res = dates.map((d) => {
				if (d.date === date.date) {
					d.bookedAlready = false;
					d.timeslots.map((t) => {
						if (t.time === time.time) {
							t.bookedAlready = false;
							t.available += 1;
						}
						return t;
					});
				}
				return d;
			});
			setStateDates(res);
			setMode(SLOT_STATES.SUCCESS);
		}, 3000);
	};
	useEffect(() => {}), [time.bookedAlready, date.bookedAlready];
	return (
		<div
			className={`p-4 w-full flex flex-row justify-between items-center rounded-lg text-white ${
				time.bookedAlready
					? "bg-green"
					: isFull
					? "bg-red"
					: date.bookedAlready
					? "bg-white-3 text-black"
					: "bg-blue"
			}`}
		>
			<div className={`flex flex-col justify-center items-center w-full`}>
				<p className="text-lg font-medium select-none">{time.time}</p>
				<p className="text-lg font-medium select-none">
					{time.available}/{time.capacity}
				</p>
			</div>
			{time.bookedAlready && (
				<button
					className="flex justify-center items-center p-2 rounded-lg hover:bg-green-2 disabled:bg-green-2 transition-all text-white text-sm font-medium"
					onClick={() => cancel()}
					disabled={mode !== SLOT_STATES.INITIAL ? true : false}
				>
					{mode === SLOT_STATES.INITIAL && (
						<MdOutlineCancel className="w-6 h-6" />
					)}
					{mode === SLOT_STATES.LOADING && (
						<Loader color="white" size="sm" variant="bars" />
					)}
					{mode === SLOT_STATES.SUCCESS && (
						<MdOutlineCheckCircle className="w-6 h-6" />
					)}
					{mode === SLOT_STATES.ERROR && <MdErrorOutline className="w-6 h-6" />}
				</button>
			)}
			{!date.bookedAlready && !isFull && (
				<button
					className="p-2 rounded-lg hover:bg-blue-2 disabled:bg-blue-2 transition-all text-white text-sm font-medium"
					onClick={() => book()}
					disabled={mode !== SLOT_STATES.INITIAL ? true : false}
				>
					{mode === SLOT_STATES.INITIAL && (
						<MdOutlineBookmarkAdded className="w-6 h-6" />
					)}
					{mode === SLOT_STATES.LOADING && (
						<Loader color="white" size="sm" variant="bars" />
					)}
					{mode === SLOT_STATES.SUCCESS && (
						<MdOutlineCheckCircle className="w-6 h-6" />
					)}
					{mode === SLOT_STATES.ERROR && <MdErrorOutline className="w-6 h-6" />}
				</button>
			)}
		</div>
	);
};

export default TimeSlot;
