import { Timeslot } from "../../types/DateTypes";
import {
	MdOutlineBookmarkAdded,
	MdOutlineCancel,
	MdOutlineCheckCircle,
} from "react-icons/md";
import { useState } from "react";
import { Loader } from "@mantine/core";

interface Props {
	time: Timeslot;
	dayBooked?: boolean;
}

const TimeRow: React.FC<Props> = ({ time, dayBooked }) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const book = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
		}, 3000);
	};

	const isFull = time.available === 0;
	return (
		<div
			className={`p-4 w-full flex flex-row justify-between items-center rounded-lg text-white ${
				time.bookedAlready
					? "bg-green"
					: isFull
					? "bg-red"
					: dayBooked
					? "bg-white-3 text-black"
					: "bg-blue"
			}`}
		>
			<div className={`flex flex-col justify-center items-center w-full`}>
				<p className="text-lg font-medium">{time.time}</p>
				<p className="text-lg font-medium">
					{time.available}/{time.capacity}
				</p>
			</div>
			{time.bookedAlready && (
				<button
					className="flex justify-center items-center p-2 rounded-lg hover:bg-green-2 disabled:bg-green-2 transition-all text-white text-sm font-medium"
					onClick={book}
					disabled={loading || success ? true : false}
				>
					{!loading && !success && <MdOutlineCancel className="w-6 h-6" />}
					{loading && <Loader color="white" size="sm" variant="bars" />}
					{success && <MdOutlineCheckCircle className="w-6 h-6" />}
				</button>
			)}
			{!dayBooked && !isFull && (
				<button
					className="p-2 rounded-lg hover:bg-blue-2 disabled:bg-blue-2 transition-all text-white text-sm font-medium"
					onClick={book}
					disabled={loading || success ? true : false}
				>
					{!loading && !success && (
						<MdOutlineBookmarkAdded className="w-6 h-6" />
					)}
					{loading && <Loader color="white" size="sm" variant="bars" />}
					{success && <MdOutlineCheckCircle className="w-6 h-6" />}
				</button>
			)}
		</div>
	);
};

export default TimeRow;
