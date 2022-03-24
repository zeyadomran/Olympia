import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgGym, CgProfile } from "react-icons/cg";
import { MdOutlineHotelClass } from "react-icons/md";
import Logo from "../components/Logo";

const Dashboard: NextPage = () => {
	const router = useRouter();
	const [loggingOut, setLoggingOut] = useState(false);
	const logout = async () => {
		setLoggingOut(true);
		setTimeout(() => {}, 3000);
	};

	return (
		<>
			<Head>
				<title>Olympia :: Dashboard</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-start w-4/5 gap-y-16 mt-16">
					<div className="p-4 w-full flex justify-between items-center">
						<Logo>Olympia</Logo>
						<button
							className="px-6 py-3 text-lg font-medium bg-white-2 hover:bg-white-3 rounded-xl transition-all"
							onClick={() => logout()}
						>
							{loggingOut ? (
								<AiOutlineLoading3Quarters className="mx-auto motion-safe:animate-spin w-7 h-7" />
							) : (
								"Logout"
							)}
						</button>
					</div>
					<div className="p-4 w-full grid grid-cols-3 gap-x-8">
						<div
							className="p-8 flex flex-col justify-center items-center gap-y-8 bg-white-2 hover:bg-white-3 transition-all cursor-pointer hover:shadow-lg rounded-xl"
							onClick={() => router.push("/profile")}
						>
							<CgProfile className="w-1/2 h-1/2" />
							<h2 className="text-4xl font-bold">Profile</h2>
						</div>
						<div
							className="p-8 flex flex-col justify-center items-center gap-y-8 bg-white-2 hover:bg-white-3 transition-all cursor-pointer hover:shadow-lg rounded-xl"
							onClick={() => router.push("/book/gym")}
						>
							<CgGym className="w-1/2 h-1/2" />
							<h2 className="text-4xl font-bold">Book Gym Timeslot</h2>
						</div>
						<div
							className="p-8 flex flex-col justify-center items-center gap-y-8 bg-white-2 hover:bg-white-3 transition-all cursor-pointer hover:shadow-lg rounded-xl"
							onClick={() => router.push("/book/service")}
						>
							<MdOutlineHotelClass className="w-1/2 h-1/2" />
							<h2 className="text-4xl font-bold">Book a Service</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
