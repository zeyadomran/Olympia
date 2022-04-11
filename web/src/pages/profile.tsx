import { Loader } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import EditInputField from "../components/EditInputField";
import SubNavbar from "../components/SubNavbar";
import Client from "../types/Client";
import { formatMembershipType } from "../utils/format";
import { validateEmail } from "../utils/validate";

const Profile: NextPage = ({}) => {
	const [client, setClient] = useState<Client | undefined>(undefined);
	useEffect(() => {
		if (client === undefined) {
			const loadClient = async () => {
				const data = await fetch(
					process.env.NEXT_PUBLIC_BASE_URL + "/client/me",
					{
						method: "GET",
						credentials: "include",
					}
				);
				if (data.status === 200) {
					const c = await data.json();
					setClient(c);
				}
			};
			loadClient();
		}
	}, [client]);

	return (
		<>
			<Head>
				<title>Olympia :: Profile</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<SubNavbar href="/dashboard" />
					{client && (
						<div className="flex flex-col justify-center items-center w-full gap-y-4">
							<h2 className="text-4xl font-bold">
								Your Profile - {client.clientId}
							</h2>
							<div className="grid grid-cols-2 gap-x-8 p-4 w-auto">
								<EditInputField
									label="First Name"
									initialValue={client.firstName}
									name="firstName"
									endpoint={`/client/${client.clientId}`}
								/>
								<EditInputField
									label="Last Name"
									initialValue={client.lastName}
									name="lastName"
									endpoint={`/client/${client.clientId}`}
								/>
								<EditInputField
									label="Email"
									initialValue={client.email}
									name="email"
									validate={validateEmail}
									endpoint={`/client/${client.clientId}`}
								/>
								<EditInputField
									label="Phone Number"
									initialValue={client.phoneNum}
									name="phoneNum"
									endpoint={`/client/${client.clientId}`}
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
					)}
					{!client && (
						<div className="flex justify-center items-center w-full">
							<Loader color="blue" size="xl" variant="bars" />
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Profile;
