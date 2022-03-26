import { Loader } from "@mantine/core";
import { Dispatch, SetStateAction, useEffect } from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
interface Props {
	isSubmitting: boolean;
	action?: () => void;
	white?: boolean;
	success?: boolean;
	setSuccess?: Dispatch<SetStateAction<boolean>>;
}

const SubmitButton: React.FC<Props> = ({
	children,
	isSubmitting,
	action,
	white,
	success,
	setSuccess,
}) => {
	useEffect(() => {
		if (success && setSuccess) setTimeout(() => setSuccess(false), 3000);
	}, [success, setSuccess]);
	return (
		<button
			type="submit"
			disabled={isSubmitting || success}
			className={`py-4 text-xl font-medium ${
				white
					? "px-6 bg-white-2 hover:bg-white-3 disabled:bg-white-3"
					: success
					? "w-full bg-green hover:bg-green-2 disabled:bg-green-2 text-white"
					: "w-full bg-blue hover:bg-blue-2 disabled:bg-blue-2 text-white"
			} rounded-lg transition-all`}
			{...(action ? { onClick: action } : {})}
		>
			{isSubmitting ? (
				<Loader color="white" size="sm" variant="bars" className="mx-auto" />
			) : success ? (
				<MdOutlineCheckCircle className="text-white mx-auto" size={24} />
			) : (
				children
			)}
		</button>
	);
};

export default SubmitButton;
