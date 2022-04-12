import { useEffect, useState } from "react";
import { ServiceFormatted } from "../../types/Service";
import { formatFullDate } from "../../utils/format";
import TimeSlot from "./TimeSlot";

interface Props {
	available: ServiceFormatted[];
	branchId: string | number;
	serviceId: string | number;
}

const ServiceManager: React.FC<Props> = ({
	available,
	branchId,
	serviceId,
}) => {
	const [a, setA] = useState<ServiceFormatted[]>(available);
	useEffect(() => {
		setA(available);
	}, [available]);

	const book = async (slot: ServiceFormatted) => {
		const data = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL +
				`/branches/${branchId}/bookService/${serviceId}`,
			{
				method: "POST",
				credentials: "include",
				body: JSON.stringify({ date: formatFullDate(slot.date) }),
			}
		);
		if (data.status === 200) {
			setA((a) =>
				a.map((d) => {
					if (d.date === slot.date) {
						d.bookedAlready = true;
					}
					return d;
				})
			);
		}
	};

	const cancel = async (slot: ServiceFormatted) => {
		const data = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL +
				`/branches/${branchId}/bookService/${serviceId}`,
			{
				method: "DELETE",
				credentials: "include",
				body: JSON.stringify({ date: formatFullDate(slot.date) }),
			}
		);
		if (data.status === 200) {
			setA((a) =>
				a.map((d) => {
					if (d.date === slot.date) {
						d.bookedAlready = false;
					}
					return d;
				})
			);
		}
	};

	return (
		<div className="p-2 grid grid-cols-3 justify-center items-center bg-white rounded-lg gap-2">
			{a.map((s: ServiceFormatted, index) => (
				<TimeSlot key={index} slot={s} book={book} cancel={cancel} />
			))}
		</div>
	);
};

export default ServiceManager;
