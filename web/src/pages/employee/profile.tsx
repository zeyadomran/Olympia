import { NextPage } from "next";
import Head from "next/head";
import { EMPLOYEE } from "../../utils/SampleData";
import EditInputField from "../../components/EditInputField";
import SubNavbar from "../../components/SubNavbar";
import { validateEmail, validatePhoneNumber } from "../../utils/validate";
import Employee from "../../types/Employee";

interface Props {
	employee: Employee;
}

const Profile: NextPage<Props> = ({ employee }) => {
	return (
		<>
			<Head>
				<title>Olympia :: Profile</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<SubNavbar href="/dashboard" />
					<div className="flex flex-col justify-center items-center w-full gap-y-4">
						<h2 className="text-4xl font-bold">Your Profile</h2>
						<div className="grid grid-cols-2 gap-x-8 p-4 w-auto">
							<EditInputField
								label="Employee Id"
								initialValue={String(employee.eId)}
								noEdit
							/>
							<EditInputField
								label="Employee Position"
								initialValue={employee.eType}
								noEdit
							/>
							<EditInputField
								label="First Name"
								initialValue={employee.firstName}
							/>
							<EditInputField
								label="Last Name"
								initialValue={employee.lastName}
							/>
							<EditInputField
								label="Email"
								initialValue={employee.email}
								validate={validateEmail}
							/>
							<EditInputField
								label="Phone Number"
								initialValue={employee.phoneNum}
								validate={validatePhoneNumber}
							/>
							<EditInputField
								label="Date of Birth"
								initialValue={employee.dob}
								noEdit
							/>
							<EditInputField label="Sex" initialValue={employee.sex} noEdit />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps() {
	return {
		props: {
			employee: EMPLOYEE,
		},
	};
}

export default Profile;
