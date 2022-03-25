import { NextPage } from "next";
import Head from "next/head";
import EditInputField from "../components/EditInputField";
import SubNavbar from "../components/SubNavbar";
import Client from "../types/Client";
import { formatMembershipType } from "../utils/format";
import { validateEmail, validatePhoneNumber } from "../utils/validate";

interface Props {
	client: Client;
}

const Profile: NextPage<Props> = ({ client }) => {
	return (
		<>
			<Head>
				<title>Olympia :: Profile</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<SubNavbar href="/dashboard" />
					<div className="flex flex-col justify-center items-center w-full gap-y-4">
						<h2 className="text-4xl font-bold">
							Your Profile - {client.clientId}
						</h2>
						<div className="grid grid-cols-2 gap-x-8 p-4 w-auto">
							<EditInputField
								label="First Name"
								initialValue={client.firstName}
							/>
							<EditInputField
								label="Last Name"
								initialValue={client.lastName}
							/>
							<EditInputField
								label="Email"
								initialValue={client.email}
								validate={validateEmail}
							/>
							<EditInputField
								label="Phone Number"
								initialValue={client.phoneNum}
								validate={validatePhoneNumber}
							/>
							<EditInputField
								label="Date of Birth"
								initialValue={client.dob}
								noEdit
							/>
							<EditInputField label="Sex" initialValue={client.sex} noEdit />
							<EditInputField
								label="Membership Type"
								initialValue={formatMembershipType(client.memberType)}
								noEdit
							/>
							<EditInputField
								label="Membership Price"
								initialValue={`$ ${(
									Math.round(client.price * 100) / 100
								).toFixed(2)}`}
								noEdit
							/>
							<EditInputField
								label="Membership Start Date"
								initialValue={client.startDate}
								noEdit
							/>
							<EditInputField
								label="Membership End Date"
								initialValue={client.endDate}
								noEdit
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps() {
	const client: Client = {
		clientId: 10001,
		email: "bob@gmail.com",
		phoneNum: "4035551234",
		dob: "2001-03-27",
		firstName: "Bob",
		lastName: "Smith",
		sex: "M",
		memberType: "YEAR_PASS",
		price: 480.0,
		startDate: "2022-01-01",
		endDate: "2022-12-31",
	};
	return { props: { client } };
}

export default Profile;
