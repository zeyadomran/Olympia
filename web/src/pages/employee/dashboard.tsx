import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CgGym, CgProfile } from "react-icons/cg";
import { BiWrench } from "react-icons/bi";
import {
	MdOutlineHotelClass,
	MdOutlinePermContactCalendar,
	MdManageSearch,
} from "react-icons/md";
import DashButton from "../../components/DashButton";
import Logo from "../../components/Logo";
import SubmitButton from "../../components/SubmitButton";
import { AuthCTX } from "../../components/AuthProvider";
import { useIsEmployee } from "../../utils/hooks";

const Dashboard: NextPage = () => {
	const router = useRouter();
	const [loggingOut, setLoggingOut] = useState(false);
	const authCtx = useContext(AuthCTX);
	useIsEmployee();
	const logout = async () => {
		setLoggingOut(true);
		const res = await authCtx?.logout();
		setTimeout(() => {
			if (res) router.push("/");
			setLoggingOut(false);
		}, 1000);
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
					<div className="p-4 w-auto grid grid-cols-3 grid-rows-2 gap-8">
						<DashButton
							title="View Profile"
							href="/employee/profile"
							icon={<CgProfile className="w-1/2 h-1/2" />}
						/>
						<DashButton
							title="Register Client"
							href="/employee/register"
							icon={<MdOutlinePermContactCalendar className="w-1/2 h-1/2" />}
						/>
						<DashButton
							title="Manage Clients"
							href="/employee/clients"
							icon={<MdManageSearch className="w-1/2 h-1/2" />}
						/>
						<DashButton
							title="Manage Services"
							href="/employee/services"
							icon={<MdOutlineHotelClass className="w-1/2 h-1/2" />}
						/>
						<DashButton
							title="Manage Branch"
							href="/employee/branch"
							icon={<BiWrench className="w-1/2 h-1/2" />}
						/>
						<DashButton
							title="Manage Equipment"
							href="/employee/equipment"
							icon={<CgGym className="w-1/2 h-1/2" />}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
