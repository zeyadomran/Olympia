import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
	isSubmitting: boolean;
}

const SubmitButton: React.FC<Props> = ({ children, isSubmitting }) => {
	return (
		<button
			type="submit"
			disabled={isSubmitting}
			className="py-4 w-3/5 text-lg text-white bg-blue hover:bg-blue-2 disabled:bg-blue-2 rounded-xl transition-all mx-auto"
		>
			{isSubmitting ? (
				<AiOutlineLoading3Quarters className="mx-auto motion-safe:animate-spin text-white w-8 h-8" />
			) : (
				children
			)}
		</button>
	);
};

export default SubmitButton;
