<script lang="ts" setup>
import IntroSection from "~/components/home/IntroSection.vue";
import ServicesSection from "~/components/home/ServicesSection.vue";
import MyWorks from "~/components/home/MyWorks.vue";
import {
	useSeo,
	createPersonStructuredData,
	createWebsiteStructuredData,
} from "~/composables/useSeo";

const siteUrl = "https://kiranparajuli.com.np";
const imageUrl = `${siteUrl}/letter_k.png`;

// Page-specific SEO
useSeo({
	title: "React.js, Vue.js, Django, Frontend Developer from Nepal",
	description:
		"Frontend Developer, Full Stack Developer, and QA Automation Engineer from Nepal specializing in Vue.js, React.js, Python, PHP, NodeJS, and modern web technologies.",
	keywords:
		"Kiran Parajuli, Frontend Developer, Full Stack Developer, QA Engineer, Python, Django, Vue.js, React.js, Node.js, PHP, Quality Assurance, Web Development, Nepal",
	image: imageUrl,
	url: siteUrl,
	type: "website",
	structuredData: createPersonStructuredData({
		name: "Kiran Parajuli",
		jobTitle: "Frontend & Full Stack Developer & QA Engineer",
		description:
			"Frontend Developer, Full Stack Developer, and QA Automation Engineer from Nepal specializing in Vue.js, React.js, Python, PHP, NodeJS, and modern web technologies.",
		image: imageUrl,
		url: siteUrl,
		sameAs: [
			"https://www.linkedin.com/in/kiranparajuli589",
			"https://github.com/kiranparajuli589",
			"https://dev.to/kiranparajuli589",
		],
		address: {
			addressCountry: "NP",
			addressLocality: "Kathmandu",
		},
	}),
});

// Additional structured data for the website
useHead({
	script: [
		{
			type: "application/ld+json",
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				...createWebsiteStructuredData({
					name: "Kiran Parajuli Portfolio",
					description:
						"Personal portfolio of Kiran Parajuli - Frontend & Full Stack Developer & QA Engineer",
					url: siteUrl,
				}),
			}),
		},
	],
});
</script>

<template>
	<div>
		<IntroSection />
		<ServicesSection />
		<MyWorks />
	</div>
</template>
