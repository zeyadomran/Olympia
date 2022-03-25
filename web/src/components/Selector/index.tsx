import { Dispatch, SetStateAction, useState } from "react";
import { NativeSelect } from "@mantine/core";
import { formatSentenceCase } from "../../utils/format";

interface Props {
	values: { id: string; name: string }[];
	valueId: string | undefined;
	setValueId: Dispatch<SetStateAction<string | undefined>>;
	name: string;
}

const Selector: React.FC<Props> = ({ values, valueId, setValueId, name }) => {
	const [value, setValue] = useState("");

	const chooseOne = (choice: string) => {
		setValue(choice);
		const v = values.find((v) => v.name === choice);
		if (v) {
			setValueId(v.id);
		}
	};

	return (
		<div className="w-full p-8 flex flex-col justify-center items-center">
			<NativeSelect
				data={values.map((branch) => branch.name)}
				placeholder={`Choose your ${name}...`}
				onChange={(e) => chooseOne(e.target.value)}
				value={value}
				label={formatSentenceCase(name)}
				size="lg"
				radius="md"
				disabled={!!valueId}
				required
			/>
		</div>
	);
};

export default Selector;
