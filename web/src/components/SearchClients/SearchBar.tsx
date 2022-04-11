import { Loader } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import {
	MdCheckCircleOutline,
	MdOutlineErrorOutline,
	MdOutlineSearch,
} from "react-icons/md";
import SearchClientsContext from "./SearchClientsContext";

enum STATES {
	DEFAULT,
	SEARCHING,
	SUCCESS,
	ERROR,
}

const SearchBar: React.FC = () => {
	const [state, setState] = useState<STATES>(STATES.DEFAULT);
	const [value, setValue] = useState("");
	const { setClient } = useContext(SearchClientsContext);

	useEffect(() => {
		if (state === STATES.SUCCESS)
			setTimeout(() => {
				setState(STATES.DEFAULT);
			}, 1000);
		else if (state === STATES.ERROR)
			setTimeout(() => {
				setState(STATES.DEFAULT);
			}, 1500);
	}, [state]);

	const search = async (id: string) => {
		if (id === "") return;
		setState(STATES.SEARCHING);
		const data = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + "/client/" + id,
			{
				method: "GET",
				credentials: "include",
			}
		);
		if (data.status === 200) {
			const c = await data.json();
			setClient(c);
			setState(STATES.SUCCESS);
		} else {
			setState(STATES.ERROR);
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				search(value);
			}}
			className={`flex flex-row justify-center items-center p-2 w-80 rounded-lg transition-all ${
				state !== STATES.DEFAULT ? "bg-white-3 cursor-none" : "bg-white-2"
			}`}
		>
			<input
				type="text"
				className={`peer p-4 w-full rounded-lg text-xl bg-inherit font-bold focus:outline-none`}
				placeholder="Gym ID"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={state !== STATES.DEFAULT}
			/>
			<button
				className={`p-4 w-20 h-12 flex justify-center items-center text-xl font-bold text-white hover:bg-blue-2 transition-all peer-focus:shadow-md rounded-lg ${
					state === STATES.SUCCESS
						? "disabled:bg-green"
						: state === STATES.ERROR
						? "disabled:bg-red"
						: "bg-blue disabled:bg-blue-2"
				}`}
				disabled={state !== STATES.DEFAULT}
			>
				{state === STATES.DEFAULT && <MdOutlineSearch size={28} />}
				{state === STATES.SEARCHING && (
					<Loader color="white" size="sm" variant="bars" />
				)}
				{state === STATES.SUCCESS && <MdCheckCircleOutline size={28} />}
				{state === STATES.ERROR && <MdOutlineErrorOutline size={28} />}
			</button>
		</form>
	);
};
export default SearchBar;
