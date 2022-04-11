import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Selector from "../../components/Selector";
import SubNavbar from "../../components/SubNavbar";
import TimeTable from "../../components/TimeTable";
import Branch from "../../types/Branch";
import { Date as D } from "../../types/DateTypes";
import { formatAndMergeTimeslots } from "../../utils/format";

const Gym: NextPage = ({}) => {
	const [branchId, setBranchId] = useState(undefined);
	const [branches, setBranches] = useState<Branch[] | undefined>(undefined);
	const [available, setAvailable] = useState<D[] | undefined>(undefined);

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
			const loadAvailable = async () => {
				const data = await fetch(
					process.env.NEXT_PUBLIC_BASE_URL +
						`/branches/${branchId}/getBookings`,
					{
						method: "GET",
						credentials: "include",
					}
				);
				if (data.status === 200) {
					const a = await data.json();
					const clientData = await fetch(
						process.env.NEXT_PUBLIC_BASE_URL +
							`/branches/${branchId}/getBooked`,
						{
							method: "GET",
							credentials: "include",
						}
					);
					if (clientData.status === 200) {
						const c = await clientData.json();
						setAvailable(formatAndMergeTimeslots(a, c));
					} else {
						setAvailable(formatAndMergeTimeslots(a, []));
					}
				}
			};
			loadAvailable();
		}
	}, [branchId, branches]);

	return (
		<>
			<Head>
				<title>Olympia :: Book Gym Timeslot</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 mt-8">
					<SubNavbar href="/dashboard" />
					<div className="w-full flex flex-col justify-start items-center gap-y-4">
						<h2 className="text-4xl font-bold">Manage Gym Bookings</h2>
						{branches && (
							<Selector
								values={branches.map((b) => {
									return { id: b.branchId, name: b.bName };
								})}
								valueId={branchId}
								setValueId={setBranchId}
								name="branch"
							/>
						)}
						{!branches && (
							<p className="text-md font-mediun text-red">
								Error fetching branches
							</p>
						)}
						{branchId && available && (
							<TimeTable dates={available} branchId={branchId} />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Gym;
