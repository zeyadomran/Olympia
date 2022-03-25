import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: "light" }}
		>
			<Component {...pageProps} />
		</MantineProvider>
	);
}

export default MyApp;
