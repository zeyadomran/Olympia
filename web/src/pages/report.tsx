import { NextPage } from "next";
import Head from "next/head";
import ReportForm from "../components/ReportForm";
import SubNavbar from "../components/SubNavbar";
import { BRANCHES, EQUIPMENT } from "../utils/SampleData";

interface Props {
	branches: { id: string; name: string }[];
	equipment: { id: string; name: string }[];
}

const Report: NextPage<Props> = ({ branches, equipment }) => {
	return (
		<>
			<Head>
				<title>Olympia :: Report</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 mt-8">
					<SubNavbar href="/dashboard" />
					<div className="w-full flex flex-col justify-start items-center">
						<h2 className="text-4xl font-bold">Report Equipment</h2>
						<ReportForm branches={branches} equipment={equipment} />
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps() {
	return {
		props: {
			branches: BRANCHES,
			equipment: EQUIPMENT,
		},
	};
}

export default Report;
