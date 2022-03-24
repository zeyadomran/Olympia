import { NextPage } from "next";
import Head from "next/head";
import LoginFormEmployees from "../../components/LoginFormEmployees";

const Login: NextPage = () => {
	return (
		<>
			<Head>
				<title>Olympia :: Employee Login</title>
			</Head>
			<LoginFormEmployees />
		</>
	);
};

export default Login;
