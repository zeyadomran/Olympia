import { Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BiWrench } from "react-icons/bi";
import { GoIssueOpened } from "react-icons/go";
import Selector from "../Selector";
import Item from "../../types/Item";
import EditInputField from "../EditInputField";
import { findEquipment } from "../../utils/SampleData";
import CustomRadio from "./CustomRadio";
import HandleReports from "./HandleReports";

interface Props {
	branches: Item[];
	equipment: Item[];
	reports: Item[];
}

const ManageServicesForm: React.FC<Props> = ({
	branches,
	equipment,
	reports,
}) => {
	const [branchId, setBranchId] = useState("");
	const [equipmentId, setEquipmentId] = useState("");
	const [step, setStep] = useState(0);

	useEffect(() => {
		if (branchId && equipmentId) {
			setStep(2);
			return;
		}
		if (branchId) {
			setStep(1);
			return;
		}
	}, [branchId, equipmentId]);

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
				<Timeline.Item title="Equipment" bullet={<BiWrench size={14} />}>
					<Selector
						values={equipment}
						valueId={equipmentId}
						setValueId={setEquipmentId}
						name="equipment"
						noLabel
						noDisable
					/>
				</Timeline.Item>
				{step === 2 && (
					<Timeline.Item title="Issue" bullet={<GoIssueOpened size={14} />}>
						<div className="w-full flex flex-col justify-start items-start">
							<EditInputField
								label="Name"
								small
								initialValue={findEquipment(equipmentId)!}
							/>
							<CustomRadio options={["Storage", "Main Floor"]} />
							<HandleReports reports={reports} />
						</div>
					</Timeline.Item>
				)}
			</Timeline>
		</div>
	);
};

export default ManageServicesForm;
