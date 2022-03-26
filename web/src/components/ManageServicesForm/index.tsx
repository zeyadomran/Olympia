import { Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BiWrench } from "react-icons/bi";
import { GoIssueOpened } from "react-icons/go";
import Selector from "../Selector";
import Item from "../../types/Item";
import EditInputField from "../EditInputField";
import { findService } from "../../utils/SampleData";

interface Props {
	branches: Item[];
	services: Item[];
}

const ManageServicesForm: React.FC<Props> = ({ branches, services }) => {
	const [branchId, setBranchId] = useState("");
	const [serviceId, setServiceId] = useState("");
	const [step, setStep] = useState(0);

	useEffect(() => {
		if (branchId && serviceId) {
			setStep(2);
			return;
		}
		if (branchId) {
			setStep(1);
			return;
		}
	}, [branchId, serviceId]);

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
				<Timeline.Item title="Service" bullet={<BiWrench size={14} />}>
					<Selector
						values={services}
						valueId={serviceId}
						setValueId={setServiceId}
						name="service"
						noLabel
						noDisable
					/>
				</Timeline.Item>
				{step === 2 && (
					<Timeline.Item title="Issue" bullet={<GoIssueOpened size={14} />}>
						<div className="w-full pt-4 flex flex-col justify-start items-center">
							<EditInputField
								label="Name"
								small
								initialValue={findService(serviceId)!}
							/>
							<EditInputField label="Days Offered" small initialValue={"MWF"} />
							<EditInputField
								label="Times Offered"
								small
								initialValue={"11:00, 13:00, 15:00, 17:00"}
							/>
							<EditInputField label="Capacity" small initialValue={"20"} />
						</div>
					</Timeline.Item>
				)}
			</Timeline>
		</div>
	);
};

export default ManageServicesForm;
