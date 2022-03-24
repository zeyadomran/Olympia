import { useRouter } from "next/router";

const Logo: React.FC = ({ children }) => {
	const router = useRouter();
	return (
		<h1
			className="text-4xl font-bold cursor-pointer hover:text-blue transition-all"
			onClick={() => router.push("/")}
		>
			{children}
		</h1>
	);
};

export default Logo;
