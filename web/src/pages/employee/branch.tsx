import { NextPage } from "next";
import Head from "next/head";
import ManageBranchForm from "../../components/ManageBranchForm";
import SubNavbar from "../../components/SubNavbar";
import Item from "../../types/Item";
import { BRANCHES } from "../../utils/SampleData";

interface Props {
	branches: Item[];
}

const Branches: NextPage<Props> = ({ branches }) => {
	return (
		<>
			<Head>
				<title>Olympia :: Manage Branches</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<SubNavbar href="/employee/dashboard" />
					<div className="flex flex-col justify-center items-center w-full gap-y-4">
						<h2 className="text-4xl font-bold">Manage Branches</h2>
						<ManageBranchForm branches={branches} />
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
		},
	};
}

export default Branches;
