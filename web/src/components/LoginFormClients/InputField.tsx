import { Field } from "formik";

interface Props {
	type: string;
	name: string;
	placeholder: string;
}
const InputField: React.FC<Props> = ({ type, name, placeholder }) => {
	return (
		<Field
			type={type}
			name={name}
			placeholder={placeholder}
			className="p-4 text-lg focus:outline-none rounded-xl bg-white-2 w-72"
		/>
	);
};

export default InputField;
