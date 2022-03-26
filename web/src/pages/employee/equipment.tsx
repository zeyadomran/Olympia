import { NextPage } from "next";
import Head from "next/head";
import ManageEquipmentForm from "../../components/ManageEquipmentForm";
import SubNavbar from "../../components/SubNavbar";
import Item from "../../types/Item";
import { BRANCHES, EQUIPMENT, REPORTS } from "../../utils/SampleData";

interface Props {
	branches: Item[];
	equipment: Item[];
	reports: Item[];
}

const Equipment: NextPage<Props> = ({ branches, equipment, reports }) => {
	return (
		<>
			<Head>
				<title>Olympia :: Manage Equipment</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<SubNavbar href="/employee/dashboard" />
					<div className="flex flex-col justify-center items-center w-full gap-y-4">
						<h2 className="text-4xl font-bold">Manage Equipment</h2>
						<ManageEquipmentForm
							branches={branches}
							equipment={equipment}
							reports={reports}
						/>
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
			reports: REPORTS,
		},
	};
}

export default Equipment;
