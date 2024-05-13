/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'selector', // or 'media' or 'class
	theme: {
	// colors: {
	//   // Using modern `rgb`
	//   primary: 'rgb(var(--color-primary) / <alpha-value>)',
	//   secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
	//   "gray-dark": 'rgb(var(--gray-dark) / <alpha-value>)',
	//   "gray-light": 'rgb(var(--gray-light) / <alpha-value>)',
	// },
		extend: {
			fontFamily: {
				'read': ['Atkinson', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
