import { Field } from "formik";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

interface Props {
	type: string;
	name: string;
	label: string;
	error?: string;
	placeholder: string;
}
const InputField: React.FC<Props> = ({
	type,
	name,
	label,
	error,
	placeholder,
}) => {
	const [hidden, setHidden] = useState(true);
	return (
		<div className="flex flex-col justify-start items-start w-full">
			<label className={`text-lg font-medium pl-2 ${error ? "text-red" : ""}`}>
				{label}
				<span className="text-sm text-red align-top">*</span>
			</label>
			<div
				className={`flex flex-row justify-between items-center rounded-lg bg-white-2 w-full border ${
					error ? "text-red border-red" : "border-white-2"
				}`}
			>
				<Field
					type={type !== "password" ? type : hidden ? "password" : "text"}
					name={name}
					placeholder={placeholder + "..."}
					className="p-4 text-lg text-inherit focus:outline-none bg-white-2 rounded-lg"
				/>
				{type === "password" ? (
					<div
						className={`p-2 mr-2 flex justify-center items-center rounded-lg cursor-pointer z-10 transition-all ${
							hidden ? "hover:bg-white-3" : "bg-green hover:bg-green-2"
						}`}
						onClick={() => setHidden(!hidden)}
					>
						{hidden ? (
							<AiOutlineEyeInvisible className="w-5 h-5 text-black" />
						) : (
							<AiOutlineEye className="w-5 h-5 text-white" />
						)}
					</div>
				) : (
					""
				)}
			</div>
			<p className="text-sm text-red pl-2">{error}</p>
		</div>
	);
};

export default InputField;
