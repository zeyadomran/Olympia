import Client from "../../../types/Client";
import { formatMembershipType } from "../../../utils/format";
import { validateEmail, validatePhoneNumber } from "../../../utils/validate";
import EditInputField from "../../EditInputField";

interface Props {
	client: Client;
}
const ClientManager: React.FC<Props> = ({ client }) => {
	return (
		<div className="grid grid-cols-4 gap-x-4 w-4/5">
			<EditInputField label="First Name" initialValue={client.firstName} />
			<EditInputField label="Last Name" initialValue={client.lastName} />
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
			<EditInputField label="Date of Birth" initialValue={client.dob} noEdit />
			<EditInputField label="Sex" initialValue={client.sex} noEdit />
			<EditInputField
				label="Membership Type"
				initialValue={formatMembershipType(client.memberType)}
				noEdit
			/>
			<EditInputField
				label="Membership Price"
				initialValue={`$ ${(Math.round(client.price * 100) / 100).toFixed(2)}`}
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
			<button className="w-68 h-[3.75rem] self-center text-white bg-red hover:bg-red-2 transition-all rounded-lg">
				Delete
			</button>
		</div>
	);
};
export default ClientManager;
