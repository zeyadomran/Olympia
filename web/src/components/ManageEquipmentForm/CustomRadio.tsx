import { Loader } from "@mantine/core";
import { useState } from "react";

interface Props {
	options: string[];
	endpoint?: string;
}

const CustomRadio: React.FC<Props> = ({ options }) => {
	const [value, setValue] = useState(
		Math.floor(Math.random() * options.length)
	);
	const [active, setActive] = useState(true);
	const [loading, setLoading] = useState(false);

	const changeChoice = (choice: string) => {
		if (choice === options[value] || !active) return;
		setValue(options.indexOf(choice));
		setLoading(true);
		setActive(false);
		setTimeout(() => {
			setLoading(false);
			setActive(true);
		}, 3000);
	};

	return (
		<div className="w-full pb-4 flex flex-col justify-start items-start">
			<div
				className={`w-full flex flex-row p-2 ${
					!active ? "bg-white-3" : "bg-white-2"
				} rounded-lg`}
			>
				{options.map((option, i) => (
					<div
						key={i}
						className={`p-2 w-full h-[2.75rem] flex justify-center text-sm items-center rounded-md cursor-pointer select-none ${
							i === value && !active
								? "bg-blue-2 text-white"
								: i === value
								? "bg-blue text-white"
								: "bg-inherit"
						}`}
						onClick={() => changeChoice(option)}
					>
						{loading && options[value] === option ? (
							<Loader size="sm" variant="bars" color="white" />
						) : (
							option
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default CustomRadio;
