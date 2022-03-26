import { Dispatch, SetStateAction, useState } from "react";
import { NativeSelect } from "@mantine/core";
import { formatSentenceCase } from "../../utils/format";
import Item from "../../types/Item";

interface Props {
	values: Item[];
	valueId: string | undefined;
	setValueId: Dispatch<SetStateAction<string | undefined>>;
	name: string;
	noLabel?: boolean;
	noDisable?: boolean;
}

const Selector: React.FC<Props> = ({
	values,
	valueId,
	setValueId,
	name,
	noLabel,
	noDisable,
}) => {
	const [value, setValue] = useState("");

	const chooseOne = (choice: string) => {
		setValue(choice);
		const v = values.find((v) => v.name === choice);
		if (v) {
			setValueId(v.id);
		}
	};

	return (
		<NativeSelect
			data={values.map((branch) => branch.name)}
			placeholder={`Select ${name}...`}
			onChange={(e) => chooseOne(e.target.value)}
			value={value}
			label={!noLabel ? formatSentenceCase(name) : undefined}
			size="lg"
			radius="md"
			disabled={!!valueId && !noDisable}
			required
		/>
	);
};

export default Selector;
