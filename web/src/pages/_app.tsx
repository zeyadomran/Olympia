import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{ colorScheme: "light" }}
		>
			<NotificationsProvider zIndex={2077} limit={5}>
				<Component {...pageProps} />
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default MyApp;
