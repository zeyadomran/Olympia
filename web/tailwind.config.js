module.exports = {
	mode: "jit",
	purge: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false,
	theme: {
		extend: {
			fontFamily: {
				heading: ["IBM Plex Sans", "Helvetica", "sans-serif"],
				body: ["IBM Plex Sans", "Arial", "sans-serif"],
			},
		},
	},
	variants: {
		animation: ["motion-safe"],
		extend: {},
	},
	plugins: [],
};
