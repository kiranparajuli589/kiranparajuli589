// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-10-27",
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],
	css: ["~/assets/css/main.css", "~/assets/sass/base.scss"],

	// Performance optimizations
	nitro: {
		compressPublicAssets: true,
	},

	experimental: {
		payloadExtraction: false,
	},

	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			title:
				"Kiran Parajuli | Frontend Developer, Full Stack Developer, QA Automation Engineer",
			meta: [
				{
					name: "description",
					content:
						"Frontend Developer, Full Stack Developer, and QA Automation Engineer from Nepal specializing in Vue.js, React.js, Python, PHP, NodeJS, and modern web technologies.",
				},
				{
					name: "keywords",
					content:
						"Kiran Parajuli, Frontend Developer, Full Stack Developer, QA Engineer, Python, Django, Vue.js, React.js, Node.js, PHP, Quality Assurance, Web Development, Nepal",
				},
				{ name: "author", content: "Kiran Parajuli" },
				{ name: "robots", content: "index, follow" },
				{ name: "googlebot", content: "index, follow" },
				{ name: "viewport", content: "width=device-width, initial-scale=1.0" },
				{ name: "format-detection", content: "telephone=no" },
				{ name: "theme-color", content: "#0e62c0" },
				{
					property: "og:title",
					content: "Kiran Parajuli | Frontend & Full Stack Developer & QA Engineer",
				},
				{
					property: "og:description",
					content:
						"Frontend Developer, Full Stack Developer, and QA Automation Engineer from Nepal specializing in Vue.js, React.js, Python, Django, and modern web technologies.",
				},
				{
					property: "og:image",
					content: "https://kiranparajuli.com.np/letter_k.png",
				},
				{ property: "og:url", content: "https://kiranparajuli.com.np/" },
				{ property: "og:type", content: "website" },
				{ property: "og:locale", content: "en_US" },
				{ property: "og:site_name", content: "Kiran Parajuli" },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:creator", content: "@kiranparajuli589" },
				{ name: "twitter:site", content: "@kiranparajuli589" },
			],
			link: [
				{ rel: "icon", href: "/letter_k.png" },
				{ rel: "apple-touch-icon", href: "/letter_k.png" },
				{ rel: "canonical", href: "https://kiranparajuli.com.np/" },
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css",
				},
			],
		},
	},

	ui: {
		theme: {
			colors: [
				"primary",
				"secondary",
				"success",
				"info",
				"warning",
				"error",
				"neutral",
			],
		},
		colorMode: false,
	},
});
