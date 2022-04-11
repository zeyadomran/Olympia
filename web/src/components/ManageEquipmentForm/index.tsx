import { Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BiWrench } from "react-icons/bi";
import { GoIssueOpened } from "react-icons/go";
import Selector from "../Selector";
import CustomRadio from "./CustomRadio";
import HandleReports from "./HandleReports";
import Branch from "../../types/Branch";
import Equipment from "../../types/Equipment";
import Report from "../../types/Report";

const ManageServicesForm: React.FC = ({}) => {
	const [branchId, setBranchId] = useState("");
	const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
	const [equipmentId, setEquipmentId] = useState("");
	const [equipment, setEquipment] = useState<Equipment[] | undefined>(
		undefined
	);
	const [reports, setReports] = useState<Report[] | undefined>(undefined);
	const [step, setStep] = useState(0);

	useEffect(() => {
		const loadBranches = async () => {
			const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/branches", {
				method: "GET",
				credentials: "include",
			});
			if (data.status === 200) {
				const b = await data.json();
				setBranches(b);
			}
		};
		const loadEquipment = async () => {
			const data = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + `/branches/${branchId}/equipment`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			if (data.status === 200) {
				const b = await data.json();
				setEquipment(b);
			}
		};
		const loadReports = async () => {
			const data = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL +
					`/branches/${branchId}/equipment/reports`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			if (data.status === 200) {
				const r: Report[] = await data.json();
				setReports(r);
			}
		};
		if (!branches) {
			loadBranches();
		}
		if (!equipment && branchId) {
			loadEquipment();
		}
		if (branchId && equipmentId) {
			setStep(2);
			return;
		}
		if (branchId && !reports) {
			setStep(1);
			loadReports();
			return;
		}
	}, [branchId, equipmentId, branches, equipment, reports]);

	return (
		<div className="w-80">
			<Timeline active={step} bulletSize={24} lineWidth={4} className="p-4">
				<Timeline.Item title="Branch" bullet={<CgGym size={14} />}>
					{branches && (
						<Selector
							values={branches.map((b) => {
								return { id: b.branchId, name: b.bName };
							})}
							valueId={branchId}
							setValueId={setBranchId}
							noLabel
							name="branch"
						/>
					)}
					{!branches && (
						<p className="text-md font-mediun text-red">
							Error fetching branches
						</p>
					)}
				</Timeline.Item>
				<Timeline.Item title="Equipment" bullet={<BiWrench size={14} />}>
					{equipment && (
						<Selector
							values={equipment.map((e) => {
								return { id: e.eId, name: e.eName };
							})}
							valueId={equipmentId}
							setValueId={setEquipmentId}
							name="equipment"
							noLabel
							noDisable
						/>
					)}
					{!equipment && !branchId && (
						<p className="text-md font-mediun text-black">
							Please select a branch.
						</p>
					)}
					{!equipment && branchId && (
						<p className="text-md font-mediun text-red">
							Error fetching equipment
						</p>
					)}
				</Timeline.Item>
				{step === 2 && (
					<Timeline.Item title="Issue" bullet={<GoIssueOpened size={14} />}>
						<div className="w-full flex flex-col justify-start items-start">
							{equipmentId && branchId && (
								<>
									<p className="text-md text-black">
										<span className="text-md font-medium text-black">ID: </span>
										{equipmentId}
									</p>
									<p className="text-md text-black mb-2">
										<span className="text-md font-medium text-black">
											Status:{" "}
										</span>
										{
											equipment?.find((e) => e.eId === equipmentId)
												?.repairStatus
										}
									</p>
									<CustomRadio
										options={["Storage", "Floor"]}
										initialValue={
											equipment?.find((e) => e.eId === equipmentId)
												?.storageType!
										}
										endpoint={`/equipment/${equipmentId}/move`}
									/>
									<HandleReports
										reports={reports?.filter((r) => r.eId === equipmentId)}
									/>
								</>
							)}
							{!equipmentId && !branchId && (
								<p className="text-md font-mediun text-black">
									Please select a branch.
								</p>
							)}
							{!equipmentId && branchId && (
								<p className="text-md font-mediun text-red">
									Please select equipment.
								</p>
							)}
						</div>
					</Timeline.Item>
				)}
			</Timeline>
		</div>
	);
};

export default ManageServicesForm;
