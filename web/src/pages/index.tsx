import type { NextPage } from "next";
import Head from "next/head";
import Logo from "../components/Logo";
import Link from "next/link";
import { useIsAuth } from "../utils/hooks";

const Home: NextPage = () => {
	useIsAuth();
	return (
		<>
			<Head>
				<title>Olympia</title>
			</Head>
			<div className="w-full h-screen flex justify-center items-center bg-blue-2">
				<div className="p-8 w-80 h-80 bg-white flex flex-col justify-center items-center rounded-lg shadow-md">
					<Logo>Olympia</Logo>
					<div className="w-full flex flex-col justify-center items-center gap-y-4 mt-8">
						<Link href="/login" passHref>
							<button className="py-4 w-4/5 text-xl text-white font-medium bg-blue hover:bg-blue-2 transition-all rounded-lg">
								Client Login
							</button>
						</Link>
						<Link href="/employee/login" passHref>
							<button className="py-4 w-4/5 text-xl text-white font-medium bg-blue hover:bg-blue-2 transition-all rounded-lg">
								Admin Login
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
