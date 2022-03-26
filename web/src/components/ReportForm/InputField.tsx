import { Dispatch, SetStateAction } from "react";

interface Props {
	placeholder: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	error: string;
}

const InputField: React.FC<Props> = ({
	placeholder,
	value,
	setValue,
	error,
}) => {
	return (
		<div className="flex flex-col justify-start items-start w-full">
			<div
				className={`p-2 flex flex-row justify-between items-center rounded-lg bg-white-2 w-full border-2 ${
					error ? "text-red border-red" : "border-white-2"
				}`}
			>
				<textarea
					placeholder={placeholder + "..."}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="p-2 text-lg text-inherit focus:outline-none bg-white-2 rounded-lg w-full min-h-32 max-h-64"
				/>
			</div>
			{error ? (
				<p className="text-md text-red pl-2">{error}</p>
			) : (
				<p className="text-md text-white pl-2">.</p>
			)}
		</div>
	);
};

export default InputField;
