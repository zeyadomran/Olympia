import { Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BiWrench } from "react-icons/bi";
import { GoIssueOpened } from "react-icons/go";
import Selector from "../Selector";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

interface Props {
	branches: { id: string; name: string }[];
	equipment: { id: string; name: string }[];
}

const ReportForm: React.FC<Props> = ({ branches, equipment }) => {
	const [branchId, setBranchId] = useState("");
	const [equipmentId, setEquipmentId] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [step, setStep] = useState(0);

	useEffect(() => {
		if (message.length === 0 && submitted) {
			setError("Please enter a message");
			setSubmitted(false);
			return;
		}
		if (message.length > 0 && branchId && equipmentId) {
			setError("");
		}
		if (submitted) {
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
	}, [branchId, equipmentId, message, submitted]);

	return (
		<div className="w-80">
			<Timeline active={step - 1} bulletSize={24} lineWidth={4} className="p-8">
				<Timeline.Item
					title="Branch"
					bullet={<CgGym size={14} />}
					lineVariant={!!equipmentId ? "solid" : "dashed"}
				>
					<Selector
						values={branches}
						valueId={branchId}
						setValueId={setBranchId}
						name="branch"
						noLabel
						noDisable
					/>
				</Timeline.Item>
				<Timeline.Item
					title="Equipment"
					bullet={<BiWrench size={14} />}
					lineVariant={!!message && submitted ? "solid" : "dashed"}
				>
					<Selector
						values={equipment}
						valueId={equipmentId}
						setValueId={setEquipmentId}
						name="equipment"
						noLabel
						noDisable
					/>
				</Timeline.Item>
				<Timeline.Item title="Issue" bullet={<GoIssueOpened size={14} />}>
					<InputField
						placeholder="Issue"
						value={message}
						setValue={setMessage}
						error={error}
					/>
					<SubmitButton submitted={submitted} setSubmitted={setSubmitted} />
				</Timeline.Item>
			</Timeline>
		</div>
	);
};

export default ReportForm;
