import { NextPage } from "next";
import Head from "next/head";
import ManageBranchForm from "../../components/ManageBranchForm";
import SubNavbar from "../../components/SubNavbar";

const Branches: NextPage = () => {
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
						<ManageBranchForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default Branches;
