import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import Item from "../../types/Item";

interface Props {
	reports: Item[];
	endpoint?: string;
}

const HandleReports: React.FC<Props> = ({ reports }) => {
	const [r, setR] = useState(reports);
	const deleteReport = (name: string) => {
		let newReport = [];
		for (let rp of r) {
			if (rp.name !== name) {
				newReport.push(rp);
			}
		}
		setR(newReport);
	};
	return (
		<div className="p-2 bg-white-2 rounded-lg w-full flex flex-col justify-center items-center gap-y-2">
			<div className="text-md font-bold">Reports</div>
			<div className="w-full h-48 max-h-48 overflow-y-scroll flex flex-col justify-start items-center gap-y-2">
				{r.length === 0 && <p className="text-md">There are no reports</p>}
				{r.map((report, index) => (
					<div
						key={index}
						className="p-1 rounded-md w-4/5 flex flex-row justify-between items-center border-2 border-red"
					>
						<p>{report.name}</p>
						<button
							className="p-1 bg-red hover:bg-red-2 transition-all rounded-md"
							onClick={() => deleteReport(report.name)}
						>
							<MdErrorOutline size={18} className="text-white" />
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default HandleReports;
