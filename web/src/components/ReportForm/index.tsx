import { Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BiWrench } from "react-icons/bi";
import { GoIssueOpened } from "react-icons/go";
import Selector from "../Selector";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import Branch from "../../types/Branch";
import Equipment from "../../types/Equipment";

const ReportForm: React.FC = ({}) => {
	const [branchId, setBranchId] = useState("");
	const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
	const [equipmentId, setEquipmentId] = useState("");
	const [equipment, setEquipment] = useState<Equipment[] | undefined>(
		undefined
	);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [success, setSuccess] = useState(0);
	const [step, setStep] = useState(0);

	const submitReport = async (eId: string | number, msg: string) => {
		setSuccess(1);
		const data = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + `/equipment/${eId}/report`,
			{
				method: "POST",
				credentials: "include",
				body: JSON.stringify({ issue: msg }),
			}
		);
		if (data.status !== 200) {
			setError("Error submitting report");
			setSuccess(-1);
			return;
		}
		setSuccess(2);
	};

	useEffect(() => {
		if (!branches) {
			const loadBranches = async () => {
				const data = await fetch(
					process.env.NEXT_PUBLIC_BASE_URL + "/branches",
					{
						method: "GET",
						credentials: "include",
					}
				);
				if (data.status === 200) {
					const b = await data.json();
					setBranches(b);
				}
			};
			loadBranches();
		}
		if (!equipment && branchId) {
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
			loadEquipment();
		}
		if (message.length === 0 && submitted) {
			setError("Please enter a message");
			setSubmitted(false);
			return;
		}
		if (message.length > 0 && branchId && equipmentId) {
			setError("");
		}
		if (submitted) {
			submitReport(equipmentId, message);
			setStep(3);
			return;
		}
		if (branchId && equipmentId) {
			setStep(2);
			return;
		}
		if (branchId) {
			setStep(1);
			return;
		}
	}, [branchId, branches, equipmentId, message, submitted, equipment]);

	return (
		<div className="w-80">
			<Timeline active={step - 1} bulletSize={24} lineWidth={4} className="p-8">
				<Timeline.Item
					title="Branch"
					bullet={<CgGym size={14} />}
					lineVariant={!!equipmentId ? "solid" : "dashed"}
				>
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
				<Timeline.Item
					title="Equipment"
					bullet={<BiWrench size={14} />}
					lineVariant={!!message && submitted ? "solid" : "dashed"}
				>
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
				<Timeline.Item title="Issue" bullet={<GoIssueOpened size={14} />}>
					{equipmentId && branchId && (
						<>
							<p className="text-md text-black">
								<span className="text-md font-medium text-black">ID: </span>
								{equipmentId}
							</p>
							<p className="text-md text-black">
								<span className="text-md font-medium text-black">
									Stored in:{" "}
								</span>
								{equipment?.find((e) => e.eId === equipmentId)?.storageType}
							</p>
							<p className="text-md text-black mb-2">
								<span className="text-md font-medium text-black">Status: </span>
								{equipment?.find((e) => e.eId === equipmentId)?.repairStatus}
							</p>
							<InputField
								placeholder="Issue"
								value={message}
								setValue={setMessage}
								error={error}
							/>
							<SubmitButton
								submitted={submitted}
								setSubmitted={setSubmitted}
								success={success}
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
				</Timeline.Item>
			</Timeline>
		</div>
	);
};

export default ReportForm;
