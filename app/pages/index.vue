<script lang="ts" setup>
import IntroSection from "~/components/home/IntroSection.vue";
import FeaturedProjectsSection from "~/components/home/FeaturedProjectsSection.vue";
import {
	useSeo,
	createPersonStructuredData,
	createWebsiteStructuredData,
	SITE_DESCRIPTION,
	SITE_JOB_TITLE,
	SITE_KEYWORDS,
} from "~/composables/useSeo";

const siteUrl = "https://kiranparajuli.com.np";
const imageUrl = `${siteUrl}/letter_k.png`;

// Page-specific SEO
useSeo({
	title: SITE_JOB_TITLE,
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	image: imageUrl,
	url: siteUrl,
	type: "website",
	structuredData: createPersonStructuredData({
		name: "Kiran Parajuli",
		jobTitle: SITE_JOB_TITLE,
		description: SITE_DESCRIPTION,
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
					description: `Personal portfolio of Kiran Parajuli — ${SITE_JOB_TITLE}`,
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
		<FeaturedProjectsSection />
	</div>
</template>
