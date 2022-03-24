import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import Logo from "../Logo";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";

const Login: React.FC = () => {
	const router = useRouter();
	return (
		<div className="w-full h-screen flex justify-center items-center bg-white-2">
			<div className="p-8 w-1/5 bg-white flex flex-col justify-start items-center rounded-lg shadow-md">
				<Logo>Olympia Login</Logo>
				<Formik
					initialValues={{ email: "", password: "" }}
					validate={(values) => {
						let errors: any = {};
						if (!values.email) {
							errors.email = "Please provide an email.";
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
						) {
							errors.email = "Invalid email address.";
						}
						if (!values.password) {
							errors.password = "Please provide a password.";
						} else if (values.password.length < 8) {
							errors.password = "Password must be at least 8 characters.";
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						setSubmitting(true);
						setTimeout(() => {}, 3000);
						router.push("/employee/dashboard");
					}}
				>
					{(props) => (
						<Form className="w-full flex flex-col justify-center items-center mt-8 gap-y-4">
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
							<SubmitButton isSubmitting={props.isSubmitting}>
								Submit
							</SubmitButton>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
