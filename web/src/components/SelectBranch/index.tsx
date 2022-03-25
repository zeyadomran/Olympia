import { Dispatch, SetStateAction, useState } from "react";
import { NativeSelect } from "@mantine/core";

interface Props {
	branches: { id: string; name: string }[];
	branchId: string | undefined;
	setBranchId: Dispatch<SetStateAction<string | undefined>>;
}

const SelectBranch: React.FC<Props> = ({ branches, branchId, setBranchId }) => {
	const [value, setValue] = useState("");

	const chooseBranch = (choice: string) => {
		setValue(choice);
		const branch = branches.find((branch) => branch.name === choice);
		if (branch) {
			setBranchId(branch.id);
		}
	};

	return (
		<div className="w-full p-8 flex flex-col justify-center items-center">
			<NativeSelect
				data={branches.map((branch) => branch.name)}
				placeholder="Choose your branch..."
				onChange={(e) => chooseBranch(e.target.value)}
				value={value}
				label="Select your branch of choice"
				size="lg"
				radius="md"
				disabled={!!branchId}
				required
			/>
		</div>
	);
};

export default SelectBranch;
