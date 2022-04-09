import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import "tailwindcss/tailwind.css";
import AuthProvider from "../components/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ colorScheme: "light" }}
			>
				<Component {...pageProps} />
			</MantineProvider>
		</AuthProvider>
	);
}

export default MyApp;
