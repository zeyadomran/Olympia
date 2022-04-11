import { useContext, useEffect, useState } from "react";
import Client from "../../../types/Client";
import { formatMembershipType } from "../../../utils/format";
import { validateEmail } from "../../../utils/validate";
import EditInputField from "../../EditInputField";
import SearchClientsContext from "../SearchClientsContext";

const ClientManager: React.FC = ({}) => {
	const [client, setClient] = useState<Client | undefined>(undefined);
	const [error, setError] = useState("");
	const ctx = useContext(SearchClientsContext);
	useEffect(() => {
		setClient(ctx.client);
	}, [ctx.client]);

	const deleteClient = async () => {
		const data = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + `/client/${client!.clientId}`,
			{
				method: "DELETE",
				credentials: "include",
			}
		);
		if (data.status === 200) {
			setClient(undefined);
		} else {
			setError("Error while deleting client.");
		}
	};
	return (
		<>
			<p className="text-md text-red font-medium mx-auto">{error}</p>
			{client && (
				<div className="grid grid-cols-4 gap-x-4 w-4/5">
					<EditInputField
						label="First Name"
						initialValue={client!.firstName}
						name="firstName"
						endpoint={`/client/${client.clientId}`}
					/>
					<EditInputField
						label="Last Name"
						initialValue={client!.lastName}
						name="lastName"
						endpoint={`/client/${client.clientId}`}
					/>
					<EditInputField
						label="Email"
						initialValue={client!.email}
						validate={validateEmail}
						name="email"
						endpoint={`/client/${client.clientId}`}
					/>
					<EditInputField
						label="Phone Number"
						initialValue={client!.phoneNum}
						name="phoneNum"
						endpoint={`/client/${client.clientId}`}
					/>
					<EditInputField
						label="Date of Birth"
						initialValue={client!.dob}
						noEdit
					/>
					<EditInputField label="Sex" initialValue={client!.sex} noEdit />
					<EditInputField
						label="Membership Type"
						initialValue={formatMembershipType(client!.memberType)}
						noEdit
					/>
					<EditInputField
						label="Membership Price"
						initialValue={`$ ${(Math.round(client!.price * 100) / 100).toFixed(
							2
						)}`}
						noEdit
					/>
					<EditInputField
						label="Membership Start Date"
						initialValue={client!.startDate}
						noEdit
					/>
					<EditInputField
						label="Membership End Date"
						initialValue={client!.endDate}
						noEdit
					/>
					<button
						className="w-68 h-[3.75rem] self-center text-white bg-red hover:bg-red-2 transition-all rounded-lg"
						onClick={deleteClient}
					>
						Delete
					</button>
				</div>
			)}
		</>
	);
};
export default ClientManager;
