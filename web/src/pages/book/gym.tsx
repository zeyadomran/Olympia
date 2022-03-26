import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Selector from "../../components/Selector";
import SubNavbar from "../../components/SubNavbar";
import TimeTable from "../../components/TimeTable";
import { Date } from "../../types/DateTypes";
import Item from "../../types/Item";
import { formatAndMergeTimeslots } from "../../utils/format";
import {
	BRANCHES,
	GYM_AND_SERVICE_AVAILABLE_TIMES,
	GYM_AND_SERVICE_BOOKED_ALREADY,
} from "../../utils/SampleData";

interface Props {
	available: Date[];
	branches: Item[];
}

const Gym: NextPage<Props> = ({ available, branches }) => {
	const [branchId, setBranchId] = useState(undefined);
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
						<Selector
							values={branches}
							valueId={branchId}
							setValueId={setBranchId}
							name="branch"
						/>
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
