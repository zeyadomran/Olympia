import { useEffect, useState } from "react";
import { HiSwitchHorizontal } from "react-icons/hi";
import Report from "../../types/Report";

interface Props {
	reports: Report[] | undefined;
}

const HandleReports: React.FC<Props> = ({ reports }) => {
	const [r, setR] = useState(reports);
	useEffect(() => {
		setR(reports);
	}, [reports]);
	const switchReport = async (
		name: string,
		equipmentId: string | number,
		clientId: string | number,
		index: number
	) => {
		const data = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL +
				`/equipment/${equipmentId}/report/${clientId}/switch`,
			{
				method: "PUT",
				credentials: "include",
			}
		);
		if (data.status === 200) {
			setR(
				r?.map((re, i) => {
					if (i === index) {
						return {
							...re,
							curStatus: re.curStatus === 0 ? 1 : 0,
						};
					}
					return re;
				})
			);
		}
	};

	return (
		<div className="p-2 bg-white-2 rounded-lg w-full flex flex-col justify-center items-center gap-y-2">
			<div className="text-md font-bold">Reports</div>
			<div className="w-full h-48 max-h-48 overflow-y-scroll flex flex-col justify-start items-center gap-y-2 p-1">
				{(r === undefined || r.length === 0) && (
					<p className="text-md">There are no reports</p>
				)}
				{r !== undefined &&
					r.length > 0 &&
					r.map((report, index) => (
						<div
							key={index}
							className={`p-2 rounded-md w-full flex flex-col justify-start items-start border-2 ${
								report.curStatus === 0 ? "border-red" : "border-blue"
							}`}
						>
							<div className="text-md text-black flex flex-row w-full justify-between items-center">
								<p>
									<span className="font-medium">Client ID:</span>{" "}
									{report.clientId}
								</p>
								<button
									className={`p-1 ${
										report.curStatus === 0
											? "bg-red hover:bg-red-2"
											: "bg-blue hover:bg-blue-2"
									} transition-all rounded-md`}
									onClick={() =>
										switchReport(
											report.issue,
											report.eId,
											report.clientId,
											index
										)
									}
								>
									<HiSwitchHorizontal size={18} className="text-white" />
								</button>
							</div>
							<div className="flex flex-col w-full">
								<p className="text-md font-medium">Issue:</p>
								<p className="text-sm">{report.issue}</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default HandleReports;
