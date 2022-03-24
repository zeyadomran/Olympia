import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class Document extends NextDocument {
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
				</Head>

				<body className="min-h-screen [scroll-behavior:smooth]">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
