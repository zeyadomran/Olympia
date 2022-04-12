import { Loader } from "@mantine/core";
import { useState, useEffect } from "react";
import {
	MdOutlineCancel,
	MdOutlineCheckCircle,
	MdErrorOutline,
	MdOutlineBookmarkAdded,
} from "react-icons/md";
import { ServiceFormatted } from "../../types/Service";
import { formatDateDate } from "../../utils/format";

enum SLOT_STATES {
	INITIAL,
	LOADING,
	SUCCESS,
	ERROR,
}

interface Props {
	slot: ServiceFormatted;
	book: (slot: ServiceFormatted) => Promise<void>;
	cancel: (slot: ServiceFormatted) => Promise<void>;
}

const TimeSlot: React.FC<Props> = ({ slot, book, cancel }) => {
	const [mode, setMode] = useState(SLOT_STATES.INITIAL);
	const [s, setS] = useState(slot);

	useEffect(() => {
		setS(slot);
		if (mode === SLOT_STATES.SUCCESS)
			setTimeout(() => setMode(SLOT_STATES.INITIAL), 3000);
	}, [mode, slot]);

	return (
		<div
			className={`p-2 flex flex-col justify-center items-center rounded-lg ${
				s.bookedAlready ? "bg-blue text-white" : "bg-white-2"
			}`}
		>
			<div className="text-md font-medium flex flex-row gap-x-2">
				{formatDateDate(s.date)}
				{s.bookedAlready && (
					<div className="text-sm bg-green text-white font-bold px-2 py-1 rounded-md select-none">
						Booked
					</div>
				)}
			</div>
			<p className="text-md font-medium">
				{s.timeStart}-{s.timeEnd}
			</p>
			{s.bookedAlready && (
				<button
					className="flex justify-center items-center p-2 rounded-lg hover:bg-blue-2 disabled:bg-blue-2 transition-all text-white text-sm font-medium"
					onClick={() => cancel(s)}
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
			{!s.bookedAlready && (
				<button
					className="p-2 rounded-lg hover:bg-white-3 disabled:bg-white-3 transition-all text-black text-sm font-medium"
					onClick={() => book(s)}
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
