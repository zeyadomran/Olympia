import { Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { GoIssueOpened } from "react-icons/go";
import Selector from "../Selector";
import EditInputField from "../EditInputField";
import Branch from "../../types/Branch";

const ManageBranchForm: React.FC = ({}) => {
	const [branchId, setBranchId] = useState<string>("");
	const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
	const [step, setStep] = useState(0);

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
		if (branchId) {
			setStep(1);
			return;
		}
	}, [branchId, branches]);

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
				{step === 1 && (
					<Timeline.Item title="Issue" bullet={<GoIssueOpened size={14} />}>
						<div className="w-full pt-4 flex flex-col justify-start items-center">
							<EditInputField
								label="Name"
								small
								endpoint={`/branches/${branchId}`}
								name="bName"
								initialValue={
									branches?.find((b) => b.branchId == branchId)?.bName!
								}
							/>
							<EditInputField
								label="Name"
								small
								endpoint={`/branches/${branchId}`}
								name="bAddress"
								initialValue={
									branches?.find((b) => b.branchId == branchId)?.bAddress!
								}
							/>
							<EditInputField
								label="Branch Capacity"
								small
								endpoint={`/branches/${branchId}`}
								name="timeSlotCapacity"
								initialValue={
									branches?.find((b) => b.branchId == branchId)
										?.timeSlotCapacity!
								}
							/>
						</div>
					</Timeline.Item>
				)}
			</Timeline>
		</div>
	);
};

export default ManageBranchForm;
