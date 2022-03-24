import { NextPage } from "next";
import Head from "next/head";
import LoginFormEmployees from "../../components/LoginFormEmployees";

const Login: NextPage = () => {
	return (
		<>
			<Head>
				<title>Olympia :: Login</title>
			</Head>
			<LoginFormEmployees />
			<div className="w-full h-screen flex justify-center items-center bg-white-2">
				<div className="p-8 bg-white flex flex-col justify-start items-center rounded-xl shadow-md">
					<h1 className="text-4xl font-bold">Olympia Login</h1>
					<div className="w-full flex flex-col justify-center items-center gap-y-4 mt-16"></div>
				</div>
			</div>
		</>
	);
};

export default Login;
