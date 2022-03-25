import { NextPage } from "next";
import Head from "next/head";
import SubNavbar from "../../components/SubNavbar";
import TimeTable from "../../components/TimeTable";
import { Date } from "../../types/DateTypes";
import { formatAndMergeTimeslots } from "../../utils/format";
import {
	GYM_AND_SERVICE_AVAILABLE_TIMES,
	GYM_AND_SERVICE_BOOKED_ALREADY,
} from "../../utils/SampleData";

interface Props {
	available: Date[];
}

const Service: NextPage<Props> = ({ available }) => {
	return (
		<>
			<Head>
				<title>Olympia :: Book a service</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<SubNavbar href="/dashboard" />
					<div className="px-8 w-full gap-y-8 flex flex-col justify-start items-center">
						<h2 className="text-4xl font-bold">Manage Service Bookings</h2>
						<TimeTable dates={available} />
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
		},
	};
}

export default Service;
