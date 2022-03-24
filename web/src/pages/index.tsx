import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Logo from "../components/Logo";

const Home: NextPage = () => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Olympia</title>
			</Head>
			<div className="w-full h-screen flex justify-center items-center bg-white-2">
				<div className="p-8 w-1/5 bg-white flex flex-col justify-start items-center rounded-xl shadow-md">
					<Logo>Olympia</Logo>
					<div className="w-full flex flex-col justify-center items-center gap-y-4 mt-8">
						<button
							className="py-4 w-4/5 text-xl text-white font-medium bg-blue hover:bg-blue-2 transition-all rounded-xl"
							onClick={() => router.push("/login")}
						>
							Client Login
						</button>
						<button
							className="py-4 w-4/5 text-xl text-white font-medium bg-blue hover:bg-blue-2 transition-all rounded-xl"
							onClick={() => router.push("/employee/login")}
						>
							Admin Login
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
