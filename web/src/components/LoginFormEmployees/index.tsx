import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import Logo from "../Logo";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import { validateEmail, validatePassword } from "../../utils/validate";

const Login: React.FC = () => {
	const router = useRouter();
	return (
		<div className="w-full h-screen flex justify-center items-center bg-blue-2">
			<div className="p-8 w-96 bg-white flex flex-col justify-start items-center rounded-lg shadow-md">
				<Logo>Olympia Login</Logo>
				<Formik
					initialValues={{ email: "", password: "" }}
					validate={(values) => {
						let errors: any = {};
						errors.email = validateEmail(values.email);
						errors.password = validatePassword(values.password);
						return errors;
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						setSubmitting(true);
						setTimeout(() => {}, 3000);
						router.push("/employee/dashboard");
					}}
				>
					{(props) => (
						<Form className="w-full flex flex-col justify-center items-center mt-8 gap-y-2">
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
