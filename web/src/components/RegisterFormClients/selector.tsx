import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NativeSelect } from "@mantine/core";
import { formatSentenceCase } from "../../utils/format";

interface Props {
	values: string[];
	setValue: Dispatch<SetStateAction<string | undefined>>;
	error?: string;
	name: string;
}

const Selector: React.FC<Props> = ({ values, setValue, name, error }) => {
	const [data, setData] = useState(values[0]);

	useEffect(() => {
		setValue(data);
	}, [data, setValue]);

	return (
		<NativeSelect
			data={values}
			onChange={(e) => setData(e.target.value)}
			value={data}
			label={formatSentenceCase(name)}
			size="lg"
			radius="md"
			error={error}
			classNames={{
				input: "bg-white-2 hover:bg-white-3 cursor-pointer transition-all",
			}}
			required
		/>
	);
};

export default Selector;
