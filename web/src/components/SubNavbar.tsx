import Link from "next/link";
import Logo from "./Logo";

interface Props {
	href: string;
}

const SubNavbar: React.FC<Props> = ({ href }) => {
	return (
		<div className="p-4 w-full flex justify-between items-center">
			<Logo>Olympia</Logo>
			<Link href={href} passHref>
				<button className="py-4 text-xl font-medium px-6 bg-white-2 hover:bg-white-3 disabled:bg-white-3  rounded-lg transition-all">
					Back
				</button>
			</Link>
		</div>
	);
};

export default SubNavbar;
