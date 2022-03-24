import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Logo from "../components/Logo";
import Link from "next/link";

const Home: NextPage = () => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Olympia</title>
			</Head>
			<div className="w-full h-screen flex justify-center items-center bg-white-2">
				<div className="p-8 w-1/5 bg-white flex flex-col justify-start items-center rounded-lg shadow-md">
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
