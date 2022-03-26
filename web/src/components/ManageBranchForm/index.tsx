import { Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { GoIssueOpened } from "react-icons/go";
import Selector from "../Selector";
import Item from "../../types/Item";
import EditInputField from "../EditInputField";
import { findBranch } from "../../utils/SampleData";

interface Props {
	branches: Item[];
}

const ManageBranchForm: React.FC<Props> = ({ branches }) => {
	const [branchId, setBranchId] = useState("");
	const [step, setStep] = useState(0);

	useEffect(() => {
		if (branchId) {
			setStep(1);
			return;
		}
	}, [branchId]);

	return (
		<div className="w-80">
			<Timeline active={step} bulletSize={24} lineWidth={4} className="p-4">
				<Timeline.Item title="Branch" bullet={<CgGym size={14} />}>
					<Selector
						values={branches}
						valueId={branchId}
						setValueId={setBranchId}
						name="branch"
						noLabel
						noDisable
					/>
				</Timeline.Item>
				{step === 1 && (
					<Timeline.Item title="Issue" bullet={<GoIssueOpened size={14} />}>
						<div className="w-full pt-4 flex flex-col justify-start items-center">
							<EditInputField
								label="Name"
								small
								initialValue={findBranch(branchId)!}
							/>
							<EditInputField
								label="Branch Capacity"
								small
								initialValue={"80"}
							/>
						</div>
					</Timeline.Item>
				)}
			</Timeline>
		</div>
	);
};

export default ManageBranchForm;
