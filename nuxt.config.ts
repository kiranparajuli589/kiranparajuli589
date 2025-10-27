// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-10-27",
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt"],
	css: ["~/assets/css/main.css", "~/assets/sass/base.scss"],

	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			title:
				"Kiran Parajuli | React.js, Vue.js, Django, QA, Software Developer",
			meta: [
				{
					name: "description",
					content:
						"I am a software developer and quality assurance engineer from Nepal. My specialties include Python, PHP, and NodeJS for backend work and database management. I'm also skilled in VueJs for creating sophisticated web designs. I take great pride in my attention to detail and commitment to delivering high-quality results. When I'm not coding, I enjoy playing guitar and listening to music to stay inspired. I'm always eager to collaborate with others and help bring their visions to life.",
				},
				{
					name: "keywords",
					content:
						"Kiran Parajuli, Kiran, Parajuli, Kiran Parajuli Nepal, Kiran Parajuli QA, Kiran Parajuli Software Developer, Kiran Parajuli Django, Kiran Parajuli Vue, Kiran Parajuli PHP, Kiran Parajuli Python, Kiran Parajuli NodeJS, Kiran Parajuli Nepal, Kiran Parajuli Kathmandu, Kiran Parajuli Lalitpur, Kiran Parajuli Bhaktapur, Kiran Parajuli Patan, Kiran Parajuli QA Engineer, Kiran Parajuli Software Engineer, Kiran Parajuli Software Developer Nepal, Kiran Parajuli Software Developer Kathmandu, Kiran Parajuli Software Developer Lalitpur, Kiran Parajuli Software Developer Bhaktapur, Kiran Parajuli Software Developer Patan, Kiran Parajuli QA Engineer Nepal, Kiran Parajuli QA Engineer Kathmandu, Kiran Parajuli QA Engineer Lalitpur, Kiran Parajuli QA Engineer Bhaktapur, Kiran Parajuli QA Engineer Patan, Kiran Parajuli Software Engineer Nepal, Kiran Parajuli Software Engineer Kathmandu, Kiran Parajuli Software Engineer Lalitpur, Kiran Parajuli Software Engineer Bhaktapur, Kiran Parajuli Software Engineer Patan",
				},
				{ name: "author", content: "Kiran Parajuli" },
				{ name: "robots", content: "index, follow" },
				{ name: "googlebot", content: "index, follow" },
				{
					property: "og:title",
					content: "Kiran Parajuli | Django, Vue, QA, Software Developer",
				},
				{
					property: "og:description",
					content:
						"I am a software developer and quality assurance engineer from Nepal. My specialties include Python, PHP, and NodeJS for backend work and database management. I'm also skilled in VueJs for creating sophisticated web designs. I take great pride in my attention to detail and commitment to delivering high-quality results. When I'm not coding, I enjoy playing guitar and listening to music to stay inspired. I'm always eager to collaborate with others and help bring their visions to life.",
				},
				{
					property: "og:image",
					content: "https://kiranparajuli.com.np/letter_k.png",
				},
				{ property: "og:url", content: "https://kiranparajuli.com.np/" },
			],
			link: [
				{ rel: "icon", href: "/letter_k.png" },
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
		defaultVariants: {
			color: "primary",
			size: "md",
		},
	},
});
