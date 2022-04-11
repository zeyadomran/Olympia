import { Loader } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import EditInputField from "../../components/EditInputField";
import SubNavbar from "../../components/SubNavbar";
import Employee from "../../types/Employee";
import { validateEmail } from "../../utils/validate";

const Profile: NextPage = ({}) => {
	const [employee, setEmployee] = useState<Employee | undefined>(undefined);
	useEffect(() => {
		if (employee === undefined) {
			const loadEmployee = async () => {
				const data = await fetch(
					process.env.NEXT_PUBLIC_BASE_URL + "/employee/me",
					{
						method: "GET",
						credentials: "include",
					}
				);
				if (data.status === 200) {
					const c = await data.json();
					setEmployee(c);
				}
			};
			loadEmployee();
		}
	}, [employee]);
	return (
		<>
			<Head>
				<title>Olympia :: Profile</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<SubNavbar href="/employee/dashboard" />
					{employee && (
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
									name="firstName"
									endpoint={`/employee/${employee.eId}`}
								/>
								<EditInputField
									label="Last Name"
									initialValue={employee.lastName}
									name="lastName"
									endpoint={`/employee/${employee.eId}`}
								/>
								<EditInputField
									label="Email"
									initialValue={employee.email}
									validate={validateEmail}
									name="email"
									endpoint={`/employee/${employee.eId}`}
								/>
								<EditInputField
									label="Phone Number"
									initialValue={employee.phoneNum}
									name="phoneNum"
									endpoint={`/employee/${employee.eId}`}
								/>
								<EditInputField
									label="Date of Birth"
									initialValue={employee.dob}
									noEdit
								/>
								<EditInputField
									label="Sex"
									initialValue={employee.sex}
									noEdit
								/>
							</div>
						</div>
					)}
					{!employee && (
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
