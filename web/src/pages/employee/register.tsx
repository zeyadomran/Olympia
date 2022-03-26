import { NextPage } from "next";
import Head from "next/head";
import RegisterFormClients from "../../components/RegisterFormClients";

const Register: NextPage = () => {
	return (
		<>
			<Head>
				<title>Olympia :: Register Client</title>
			</Head>
			<RegisterFormClients />
		</>
	);
};

export default Register;
