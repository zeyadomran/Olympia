import { Loader } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
import { MdDoneAll } from "react-icons/md";

interface Props {
	submitted: boolean;
	setSubmitted: Dispatch<SetStateAction<boolean>>;
}

const SubmitButton: React.FC<Props> = ({ submitted, setSubmitted }) => {
	const [loading, setLoading] = useState(false);

	const handleSubmit = () => {
		setLoading(true);
		setTimeout(() => {
			setSubmitted(true);
			setLoading(false);
		}, 3000);
	};

	return (
		<button
			onClick={handleSubmit}
			className="p-4 w-full h-12 flex justify-center items-center text-md bg-blue hover:bg-blue-2 disabled:bg-blue-2 transition-all rounded-lg text-white"
			disabled={loading || submitted}
		>
			{!loading && !submitted && "Submit"}
			{loading && (
				<Loader color="white" size="sm" variant="bars" className="mx-auto" />
			)}
			{submitted && <MdDoneAll size={24} />}
		</button>
	);
};

export default SubmitButton;
