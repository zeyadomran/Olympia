import { Loader } from "@mantine/core";

interface Props {
	isSubmitting: boolean;
	action?: () => void;
	white?: boolean;
}

const SubmitButton: React.FC<Props> = ({
	children,
	isSubmitting,
	action,
	white,
}) => {
	return (
		<button
			type="submit"
			disabled={isSubmitting}
			className={`px-6 py-4 text-xl font-medium ${
				white
					? "bg-white-2 hover:bg-white-3 disabled:bg-white-3"
					: "bg-blue hover:bg-blue-2 disabled:bg-blue-2 text-white"
			} rounded-lg transition-all`}
			{...(action ? { onClick: action } : {})}
		>
			{isSubmitting ? (
				<Loader color="white" size="sm" variant="bars" className="mx-auto" />
			) : (
				children
			)}
		</button>
	);
};

export default SubmitButton;
