import { Form, Formik } from "formik";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import {
	validateDefault,
	validateDOB,
	validateEmail,
	validatePassword,
	validatePhoneNumber,
} from "../../utils/validate";
import SubNavbar from "../SubNavbar";
import { MEMBERSHIP_TYPES } from "../../utils/SampleData";
import Selector from "./selector";
import { useState } from "react";

const Login: React.FC = () => {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");

	return (
		<div className="w-full flex justify-center items-center">
			<div className="flex flex-col justify-between items-center w-4/5 mt-8">
				<SubNavbar href="/dashboard" />
				<Formik
					initialValues={{
						email: "",
						password: "",
						firstName: "",
						lastName: "",
						phoneNum: "",
						dob: "",
						sex: "",
						memberType: "",
						price: "",
						startDate: "",
						endDate: "",
					}}
					validate={(values) => {
						let errors: any = {};
						errors.email = validateEmail(values.email);
						errors.password = validatePassword(values.password);
						errors.firstName = validateDefault(values.firstName, "first name");
						errors.lastName = validateDefault(values.lastName, "last name");
						errors.phoneNum = validatePhoneNumber(values.phoneNum);
						errors.dob = validateDOB(values.dob);
						errors.sex = validateDefault(values.sex, "sex");
						setError(validateDefault(value, "member type"));
						if (!errors.email && !errors.password) {
							return undefined;
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						if (error) return;
						setSubmitting(true);
						setTimeout(() => {
							setSubmitting(false);
							setValue("");
							resetForm();
						}, 3000);
					}}
				>
					{(props) => (
						<Form className="w-full flex flex-col justify-center items-center gap-y-4">
							<h2 className="text-4xl font-bold">Register Client</h2>
							<div className="w-[36rem] grid grid-cols-2 gap-x-12 gap-y-2">
								<InputField
									type="email"
									name="email"
									placeholder="Your email"
									label="Email"
									error={props.errors.email}
								/>
								<InputField
									type="password"
									name="password"
									placeholder="Your password"
									label="Password"
									error={props.errors.password}
								/>
								<InputField
									type="text"
									name="firstName"
									placeholder="Your first name"
									label="First Name"
									error={props.errors.firstName}
								/>
								<InputField
									type="text"
									name="lastName"
									placeholder="Your last name"
									label="Last Name"
									error={props.errors.lastName}
								/>
								<InputField
									type="text"
									name="phoneNum"
									placeholder="Your phone number"
									label="Phone Number"
									error={props.errors.phoneNum}
								/>
								<InputField
									type="text"
									name="dob"
									placeholder="Your dob (MM-DD-YYYY)"
									label="Date of Birth"
									error={props.errors.dob}
								/>
								<InputField
									type="text"
									name="sex"
									placeholder="Your sex (M or F)"
									label="Sex"
									error={props.errors.sex}
								/>
								<Selector
									values={MEMBERSHIP_TYPES}
									setValue={setValue}
									name={"Membership Type"}
									error={error}
								/>
							</div>
							<div className="w-[36rem] flex justify-end items-center">
								<div className="w-[16.5rem]">
									<SubmitButton isSubmitting={props.isSubmitting}>
										Submit
									</SubmitButton>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
