import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import SelectBranch from "../../components/SelectBranch";
import SubNavbar from "../../components/SubNavbar";
import TimeTable from "../../components/TimeTable";
import { Date } from "../../types/DateTypes";
import { formatAndMergeTimeslots } from "../../utils/format";
import {
	BRANCHES,
	GYM_AND_SERVICE_AVAILABLE_TIMES,
	GYM_AND_SERVICE_BOOKED_ALREADY,
} from "../../utils/SampleData";

interface Props {
	available: Date[];
	branches: { id: string; name: string }[];
}

const Gym: NextPage<Props> = ({ available, branches }) => {
	const [branchId, setBranchId] = useState(undefined);
	return (
		<>
			<Head>
				<title>Olympia :: Book Gym Timeslot</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<SubNavbar href="/dashboard" />
					<div className="px-8 w-full gap-y-8 flex flex-col justify-start items-center">
						<h2 className="text-4xl font-bold">Manage Gym Bookings</h2>
						{!branchId && (
							<SelectBranch
								branches={branches}
								branchId={branchId}
								setBranchId={setBranchId}
							/>
						)}
						{branchId && <TimeTable dates={available} />}
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps() {
	return {
		props: {
			available: formatAndMergeTimeslots(
				GYM_AND_SERVICE_AVAILABLE_TIMES,
				GYM_AND_SERVICE_BOOKED_ALREADY
			),
			branches: BRANCHES,
		},
	};
}

export default Gym;
