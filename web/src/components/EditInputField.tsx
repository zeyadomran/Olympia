import { Loader } from "@mantine/core";
import {
	MdErrorOutline,
	MdOutlineCheckCircle,
	MdOutlineModeEdit,
	MdOutlineDone,
} from "react-icons/md";
import { useState } from "react";

interface Props {
	label: string;
	initialValue: string;
	endpoint?: string;
	validate?: (value: any) => string;
	noEdit?: boolean;
}

enum FORM_STATES {
	INITIAL,
	EDITING,
	SUBMITTING,
	SUCCESS,
	ERROR,
}

const EditInputField: React.FC<Props> = ({
	initialValue,
	label,
	validate,
	noEdit,
}) => {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState<string | undefined>(undefined);
	const [formState, setFormState] = useState<FORM_STATES>(FORM_STATES.INITIAL);

	const transitionFormState = (formState: FORM_STATES) => {
		switch (formState) {
			case FORM_STATES.INITIAL:
				setFormState(FORM_STATES.EDITING);
				break;
			case FORM_STATES.EDITING:
				onSubmit();
				break;
		}
	};

	const onSubmit = () => {
		if (value === initialValue) {
			setFormState(FORM_STATES.INITIAL);
			return;
		}

		if (validate) setError(validate(value));
		else if (!value) setError(`Please provide a ${label.toLowerCase()}.`);
		else setError(undefined);

		if (error) return;

		setFormState(FORM_STATES.SUBMITTING);
		let res = {
			code: "200 OK",
			error: Math.floor(Math.random() * 4) === 2 ? true : false,
		};
		setTimeout(() => {
			if (!res.error) setFormState(FORM_STATES.SUCCESS);
			else {
				setFormState(FORM_STATES.ERROR);
				setError("Something went wrong...");
			}
		}, 3000);
	};

	return (
		<div className="flex flex-col justify-start items-start w-full">
			<label className={`text-lg font-medium pl-2 ${error ? "text-red" : ""}`}>
				{label}
			</label>
			<div
				className={`p-2 flex flex-row justify-between items-center rounded-lg w-full border-2 ${
					error
						? "text-red border-red bg-white-2"
						: formState !== FORM_STATES.EDITING
						? "bg-white-3 border-white-3"
						: "bg-white-2 border-white-2"
				}`}
			>
				<input
					type="text"
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
						if (validate) setError(validate(value));
						else if (!value)
							setError(`Please provide a ${label.toLowerCase()}.`);
						else setError(undefined);
					}}
					className="p-2 w-full text-lg text-inherit focus:outline-none bg-inherit rounded-lg"
					disabled={noEdit || formState !== FORM_STATES.EDITING ? true : false}
				/>
				{!noEdit &&
					getButton(formState, () => transitionFormState(formState), error)}
			</div>
			{!noEdit && error ? (
				<p className="text-md text-red pl-2">{error}</p>
			) : (
				<p className="text-md text-white pl-2">.</p>
			)}
		</div>
	);
};

const getButton = (
	formState: FORM_STATES,
	onClick: () => void,
	error?: string
): React.ReactNode => {
	const baseStyle =
		"flex justify-center items-center p-3 rounded-lg z-10 transition-all";
	switch (formState) {
		case FORM_STATES.INITIAL:
			return (
				<button
					className={`${baseStyle} hover:bg-white-2 text-lg font-medium`}
					onClick={onClick}
				>
					<MdOutlineModeEdit className="w-6 h-6" />
				</button>
			);
		case FORM_STATES.EDITING:
			return (
				<button
					className={`${baseStyle} ${
						error
							? "bg-red hover:bg-red-2"
							: "bg-yellow-500 hover:bg-yellow-600"
					} text-white text-lg font-medium`}
					onClick={onClick}
				>
					<MdOutlineDone className="w-6 h-6" />
				</button>
			);
		case FORM_STATES.SUBMITTING:
			return (
				<button className={`${baseStyle} bg-blue-2`} disabled>
					<Loader color="white" size="sm" variant="bars" className="mx-auto" />
				</button>
			);
		case FORM_STATES.SUCCESS:
			return (
				<button className={`${baseStyle} bg-green`} disabled>
					<MdOutlineCheckCircle className="text-white w-6 h-6" />
				</button>
			);
		case FORM_STATES.ERROR:
			return (
				<button className={`${baseStyle} bg-red`} disabled>
					<MdErrorOutline className="text-white w-6 h-6" />
				</button>
			);
	}
};

export default EditInputField;
