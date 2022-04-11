import { NextPage } from "next";
import Head from "next/head";
import ReportForm from "../components/ReportForm";
import SubNavbar from "../components/SubNavbar";

const Report: NextPage = () => {
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
						<ReportForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default Report;
