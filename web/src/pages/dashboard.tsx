import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { CgGym, CgProfile } from "react-icons/cg";
import { MdOutlineHotelClass, MdOutlineReport } from "react-icons/md";
import DashButton from "../components/DashButton";
import Logo from "../components/Logo";
import SubmitButton from "../components/SubmitButton";

const Dashboard: NextPage = () => {
	const router = useRouter();
	const [loggingOut, setLoggingOut] = useState(false);
	const logout = async () => {
		setLoggingOut(true);
		setTimeout(() => {}, 3000);
		router.push("/");
	};
	return (
		<>
			<Head>
				<title>Olympia :: Dashboard</title>
			</Head>
			<div className="w-full flex justify-center items-center">
				<div className="flex flex-col justify-between items-center w-4/5 gap-y-8 mt-8">
					<div className="p-4 w-full flex justify-between items-center">
						<Logo>Olympia</Logo>
						<SubmitButton isSubmitting={loggingOut} action={logout} white>
							Logout
						</SubmitButton>
					</div>
					<div className="p-4 w-auto grid grid-cols-2 grid-rows-2 gap-8">
						<DashButton
							title="View Profile"
							href="/profile"
							icon={<CgProfile className="w-1/2 h-1/2" />}
						/>
						<DashButton
							title="Manage Gym Bookings"
							href="/book/gym"
							icon={<CgGym className="w-1/2 h-1/2" />}
						/>
						<DashButton
							title="Manage Services"
							href="/book/service"
							icon={<MdOutlineHotelClass className="w-1/2 h-1/2" />}
						/>
						<DashButton
							title="Report Equipment"
							href="/report"
							icon={<MdOutlineReport className="w-1/2 h-1/2" />}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
