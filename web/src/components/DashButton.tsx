import Link from "next/link";

interface Props {
	icon: React.ReactNode;
	title: string;
	href: string;
}

const DashButton: React.FC<Props> = ({ icon, href, title }) => {
	return (
		<Link href={href} passHref>
			<div className="p-8 max-h-72 flex flex-col justify-center items-center gap-y-8 bg-white-2 hover:bg-white-3 transition-all cursor-pointer hover:shadow-lg rounded-lg">
				{icon}
				<h2 className="text-4xl font-bold">{title}</h2>
			</div>
		</Link>
	);
};

export default DashButton;
