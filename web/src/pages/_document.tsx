import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();
export default class Document extends NextDocument {
	static getInitialProps = getInitialProps;
	render() {
		return (
			<Html
				lang="en"
				className="bg-white min-h-screen [scroll-behavior:smooth]"
			>
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap"
						rel="stylesheet"
					/>
					<link rel="icon" type="image/x-icon" href="/favicon.ico" />
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width"
					/>
				</Head>

				<body className="min-h-screen [scroll-behavior:smooth]">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
