import vuetify from 'vite-plugin-vuetify'
import Resume from "./utils/resume.ts";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {enabled: true},
	app: {
		head: {
			link:[
				{ rel: "icon", type: "image/png", href: "/letter_k.png" },
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
				}
			],
			meta: [
				{ name: 'description', content: Resume.personalInfo.summary },
				{ property: 'og:description', content: Resume.personalInfo.summary },
				{ property: 'og:image', content: Resume.personalInfo.avatar },
				{ property: 'twitter:card', content: 'summary_large_image' },
			]
		}
	},
	modules: [
		"@pinia/nuxt"
	],
	pinia: {
		autoImports: [
			"defineStore"
		]
	},
	css: [
		"vuetify/lib/styles/main.css",
		"@mdi/font/css/materialdesignicons.min.css",

	],
	build: {
		transpile: ["vuetify"],
	},
	vite: {
		plugins: [
			vuetify({
				autoImport: true,
			})
		]
	}
})
