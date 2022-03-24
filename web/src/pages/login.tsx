import type { NextPage } from "next";
import Head from "next/head";
import LoginFormClients from "../components/LoginFormClients";

const Login: NextPage = () => {
	return (
		<>
			<Head>
				<title>Olympia :: Login</title>
			</Head>
			<LoginFormClients />
		</>
	);
};

export default Login;
