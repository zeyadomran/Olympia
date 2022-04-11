import { Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { BiWrench } from "react-icons/bi";
import { GoIssueOpened } from "react-icons/go";
import Selector from "../Selector";
import EditInputField from "../EditInputField";
import { findService } from "../../utils/SampleData";
import Branch from "../../types/Branch";
import Service from "../../types/Service";

const ManageServicesForm: React.FC = () => {
	const [branchId, setBranchId] = useState("");
	const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
	const [serviceId, setServiceId] = useState("");
	const [services, setServices] = useState<Service[] | undefined>(undefined);
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
		const loadServices = async () => {
			const data = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + `/branches/${branchId}/getServices`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			if (data.status === 200) {
				const b = await data.json();
				setServices(b);
			}
		};
		if (!branches) {
			loadBranches();
		}
		if (!services && branchId) {
			loadServices();
		}
		if (branchId && serviceId) {
			setStep(2);
			return;
		}
		if (branchId) {
			setStep(1);
			return;
		}
	}, [branchId, serviceId, services, branches]);

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
				<Timeline.Item title="Service" bullet={<BiWrench size={14} />}>
					{services && (
						<Selector
							values={services.map((s) => {
								return { id: s.serviceId, name: s.serviceName };
							})}
							valueId={serviceId}
							setValueId={setServiceId}
							name="services"
							noLabel
							noDisable
						/>
					)}
					{!services && !branchId && (
						<p className="text-md font-mediun text-black">
							Please select a branch.
						</p>
					)}
					{!services && branchId && (
						<p className="text-md font-mediun text-red">
							Error fetching services
						</p>
					)}
				</Timeline.Item>
				{step === 2 && (
					<Timeline.Item title="Info" bullet={<GoIssueOpened size={14} />}>
						<div className="w-full flex flex-col justify-start items-center">
							<div className="w-full flex flex-col justify-start items-start">
								{serviceId && branchId && (
									<>
										<p className="text-md text-black">
											<span className="text-md font-medium text-black">
												ID:{" "}
											</span>
											{serviceId}
										</p>
										<p className="text-md text-black">
											<span className="text-md font-medium text-black">
												Description:{" "}
											</span>
											{
												services?.find((s) => s.serviceId === serviceId)
													?.description
											}
										</p>
										<p className="text-md text-black">
											<span className="text-md font-medium text-black">
												Instructors:{" "}
											</span>
											{services?.find((s) => s.serviceId === serviceId)
												?.Instructors.length! > 0
												? services
														?.find((s) => s.serviceId === serviceId)
														?.Instructors!.map((id, index) => {
															{
																id;
															}
															{
																(", ");
															}
														})
												: "No instructors."}
										</p>
										<EditInputField
											label="Name"
											small
											endpoint={`/branches/${branchId}/updateService/${serviceId}`}
											name="serviceName"
											initialValue={
												services?.find((s) => s.serviceId === serviceId)
													?.serviceName!
											}
										/>
										<EditInputField
											label="Days Offered"
											small
											endpoint={`/branches/${branchId}/updateService/${serviceId}`}
											name="daysOfService"
											initialValue={
												services?.find((s) => s.serviceId === serviceId)
													?.daysOfService!
											}
										/>
										<EditInputField
											label="Service Start"
											small
											endpoint={`/branches/${branchId}/updateService/${serviceId}`}
											name="timeOfService"
											initialValue={
												services?.find((s) => s.serviceId === serviceId)
													?.timeOfService!
											}
										/>
										<EditInputField
											label="Service End"
											small
											endpoint={`/branches/${branchId}/updateService/${serviceId}`}
											name="timeEnds"
											initialValue={
												services?.find((s) => s.serviceId === serviceId)
													?.timeEnds!
											}
										/>
										<EditInputField
											label="Capacity"
											small
											endpoint={`/branches/${branchId}/updateService/${serviceId}`}
											name="capacity"
											initialValue={
												services?.find((s) => s.serviceId === serviceId)
													?.capacity!
											}
										/>
									</>
								)}
								{!serviceId && !branchId && (
									<p className="text-md font-mediun text-black">
										Please select a branch.
									</p>
								)}
								{!serviceId && branchId && (
									<p className="text-md font-mediun text-red">
										Please select service.
									</p>
								)}
							</div>
						</div>
					</Timeline.Item>
				)}
			</Timeline>
		</div>
	);
};

export default ManageServicesForm;
