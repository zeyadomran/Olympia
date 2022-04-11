import { Loader } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { MdDoneAll, MdErrorOutline } from "react-icons/md";

interface Props {
	submitted: boolean;
	setSubmitted: Dispatch<SetStateAction<boolean>>;
	success: number;
}

const SubmitButton: React.FC<Props> = ({
	submitted,
	setSubmitted,
	success,
}) => {
	const handleSubmit = () => {
		setSubmitted(true);
	};

	return (
		<button
			onClick={handleSubmit}
			className={`p-4 w-full h-12 flex justify-center items-center text-md transition-all rounded-lg text-white ${
				success === -1
					? "bg-red hover:bg-red-2 disabled:bg-red-2"
					: "bg-blue hover:bg-blue-2 disabled:bg-blue-2"
			}`}
			disabled={success !== 0 || submitted}
		>
			{success === 0 && !submitted && "Submit"}
			{success === 1 && (
				<Loader color="white" size="sm" variant="bars" className="mx-auto" />
			)}
			{success === 2 && <MdDoneAll size={24} />}
			{success === -1 && <MdErrorOutline size={24} />}
		</button>
	);
};

export default SubmitButton;
