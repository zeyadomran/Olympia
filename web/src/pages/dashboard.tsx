import { useNotifications } from "@mantine/notifications";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { CgGym, CgProfile } from "react-icons/cg";
import { MdOutlineHotelClass } from "react-icons/md";
import Logo from "../components/Logo";
import SubmitButton from "../components/SubmitButton";

const Dashboard: NextPage = () => {
	const router = useRouter();
	const notifications = useNotifications();
	const [loggingOut, setLoggingOut] = useState(false);
	const logout = async () => {
		setLoggingOut(true);
		const id = notifications.showNotification({
			autoClose: false,
			title: "Logging out...",
			message: "Should be done any second now!",
			loading: loggingOut,
		});
		setTimeout(() => {
			notifications.updateNotification(id, {
				autoClose: 3000,
				title: "Logged out!",
				message: "Hope you come back soon!",
				loading: false,
			});
		}, 3000);
		router.push("/");
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
						<SubmitButton isSubmitting={loggingOut} action={logout} white>
							Logout
						</SubmitButton>
					</div>
					<div className="p-4 w-full grid grid-cols-3 gap-x-8">
						<div
							className="p-8 flex flex-col justify-center items-center gap-y-8 bg-white-2 hover:bg-white-3 transition-all cursor-pointer hover:shadow-lg rounded-lg"
							onClick={() => router.push("/profile")}
						>
							<CgProfile className="w-1/2 h-1/2" />
							<h2 className="text-4xl font-bold">Profile</h2>
						</div>
						<div
							className="p-8 flex flex-col justify-center items-center gap-y-8 bg-white-2 hover:bg-white-3 transition-all cursor-pointer hover:shadow-lg rounded-lg"
							onClick={() => router.push("/book/gym")}
						>
							<CgGym className="w-1/2 h-1/2" />
							<h2 className="text-4xl font-bold">Book Gym Timeslot</h2>
						</div>
						<div
							className="p-8 flex flex-col justify-center items-center gap-y-8 bg-white-2 hover:bg-white-3 transition-all cursor-pointer hover:shadow-lg rounded-lg"
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
