import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Selector from "../../components/Selector";
import ServiceManager from "../../components/ServiceManager";
import SubNavbar from "../../components/SubNavbar";
import Branch from "../../types/Branch";
import Service, { ServiceFormatted } from "../../types/Service";
import { formatServiceAvailTimes } from "../../utils/format";

const Service: NextPage = ({}) => {
	const [branchId, setBranchId] = useState("");
	const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
	const [serviceId, setServiceId] = useState("");
	const [services, setServices] = useState<Service[] | undefined>(undefined);
	const [available, setAvailable] = useState<ServiceFormatted[] | undefined>(
		undefined
	);
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
		const loadAvailableServices = async () => {
			const data = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL +
					`/branches/${branchId}/getServicesBooked`,
				{
					method: "GET",
					credentials: "include",
				}
			);
			if (data.status === 200) {
				const b = await data.json();
				const c: string[] = b.filter(
					(s: { serviceId: string | number }) => s.serviceId === serviceId
				);
				const s: Service[] = services?.filter(
					(ser) => ser.serviceId === serviceId
				)!;
				setAvailable(formatServiceAvailTimes(s!, c));
			} else {
				setAvailable(
					formatServiceAvailTimes(
						services?.filter((ser) => ser.serviceId === serviceId)!,
						[]
					)
				);
			}
		};
		if (!branches) {
			loadBranches();
		}
		if (!services && branchId) {
			loadServices();
		}
		if (branchId && serviceId) {
			loadAvailableServices();
		}
	}, [branchId, serviceId, branches, services]);
	return (
		<>
			<Head>
				<title>Olympia :: Book Services</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 mt-8">
					<SubNavbar href="/dashboard" />
					<div className="w-full flex flex-col justify-start items-center gap-y-4">
						<h2 className="text-4xl font-bold">Manage Service Bookings</h2>
						<div className="flex justify-center items-center gap-x-8">
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
						</div>
						{branchId && serviceId && available && (
							<ServiceManager
								available={available}
								branchId={branchId}
								serviceId={serviceId}
							/>
						)}
						{branchId && serviceId && !available && (
							<p className="text-md font-medium text-red">
								Error fetching available dates
							</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Service;
