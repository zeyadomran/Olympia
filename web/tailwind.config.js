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
			colors: {
				"white-2": "#E4E4E4",
				"white-3": "#DADADA",
				green: "#57C361",
				"green-2": "#7DD084",
				blue: "#4002FF",
				"blue-2": "#6735FF",
				red: "#FC4135",
				"red-2": "#FD7067",
			},
		},
	},
	variants: {
		animation: ["motion-safe"],
		extend: {},
	},
	plugins: [],
};
