import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import Logo from "../Logo";
import InputField from "../InputField";
import SubmitButton from "../SubmitButton";
import { validateGymId, validatePassword } from "../../utils/validate";
import { useContext } from "react";
import { AuthCTX } from "../AuthProvider";
import { useIsAuth } from "../../utils/hooks";

const Login: React.FC = () => {
	const router = useRouter();
	const authCtx = useContext(AuthCTX);
	useIsAuth();
	return (
		<div className="w-full h-screen flex justify-center items-center bg-blue-2">
			<div className="p-8 w-96 bg-white flex flex-col justify-start items-center rounded-lg shadow-md">
				<Logo>Olympia Login</Logo>
				<Formik
					initialValues={{ gymId: "", password: "" }}
					validate={(values) => {
						let errors: any = {};
						errors.gymId = validateGymId(values.gymId);
						errors.password = validatePassword(values.password);
						if (!errors.gymId && !errors.password) return undefined;
						return errors;
					}}
					onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
						setSubmitting(true);
						const res = await authCtx?.loginClient(
							parseInt(values.gymId),
							values.password
						);
						if (res) {
							router.push("/dashboard");
						} else {
							setErrors({
								gymId: "Invalid gym id or password",
								password: "Invalid gym id or password",
							});
						}
					}}
				>
					{(props) => (
						<Form className="w-full flex flex-col justify-center items-center mt-8 gap-y-2">
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
