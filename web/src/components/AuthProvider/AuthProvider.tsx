import { createContext, useState } from "react";
import Client from "../../types/Client";
import Employee from "../../types/Employee";
import { getCookie } from "../../utils/hooks";

interface Props {}
interface CTX {
	client: Client | null;
	employee: Employee | null;
	loginClient: (clientId: number, password: string) => Promise<boolean>;
	loginEmployee: (eId: number, password: string) => Promise<boolean>;
	logout: () => Promise<boolean>;
}
const AuthProvider: React.FC<Props> = ({ children }) => {
	const [client, setClient] = useState<Client | null>(null);
	const [employee, setEmployee] = useState<Employee | null>(null);

	const values = {
		client,
		employee,
		loginClient: async (clientId: number, password: string) => {
			const data = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + "/client/login",
				{
					method: "POST",
					credentials: "include",
					body: JSON.stringify({ clientId, password }),
				}
			);
			const client = await data.json();
			if (data.status === 200) {
				setClient(client);
				return true;
			}
			return false;
		},
		loginEmployee: async (eId: number, password: string) => {
			const data = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + "/employee/login",
				{
					method: "POST",
					credentials: "include",
					body: JSON.stringify({ eId, password }),
				}
			);
			const employee = await data.json();
			if (data.status === 200) {
				setEmployee(employee);
				return true;
			}
			return false;
		},
		logout: async () => {
			let data;
			if (getCookie("CJWT")) {
				setClient(null);
				data = await fetch(
					process.env.NEXT_PUBLIC_BASE_URL + "/client/logout",
					{
						method: "POST",
						credentials: "include",
					}
				);
			} else if (getCookie("EJWT")) {
				setEmployee(null);
				data = await fetch(
					process.env.NEXT_PUBLIC_BASE_URL + "/employee/logout",
					{
						method: "POST",
						credentials: "include",
					}
				);
			}
			if (data?.status === 200) {
				return true;
			}
			return false;
		},
	};

	return <AuthCTX.Provider value={values}>{children}</AuthCTX.Provider>;
};

export const AuthCTX = createContext<CTX | null>(null);
export default AuthProvider;
