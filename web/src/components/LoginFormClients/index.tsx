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
					initialValues={{ gymId: "", password: "" }}
					validate={(values) => {
						let errors: any = {};
						if (!values.gymId) {
							errors.gymId = "Please provide your gym id.";
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
						router.push("/dashboard");
					}}
				>
					{(props) => (
						<Form className="w-full flex flex-col justify-center items-center mt-8 gap-y-4">
							<InputField
								type="text"
								name="gymId"
								placeholder="Your gym id"
								label="Gym ID"
								error={props.errors.gymId}
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
