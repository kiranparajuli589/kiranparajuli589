<script setup lang="ts">
import Resume from "~/utils/resume";
import { onMounted } from "vue";
import { useSeo } from "~/composables/useSeo";
import { useAnalytics } from "~/composables/useAnalytics";
import { printResumePdf } from "~/composables/useResumePdfDocument";
import ResumePdfDocument from "~/components/resume/ResumePdfDocument.vue";

definePageMeta({
	name: "resume-pdf-vue",
	layout: "pdf-view",
});

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/resume-pdf`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const resumePdf = Resume.resumePdfs.vue;

useSeo({
	title: `${personalInfo.name} - Resume PDF (Vue/Nuxt)`,
	description: `Vue/Nuxt-focused resume PDF of ${personalInfo.name}, ${personalInfo.role}.`,
	keywords: `${personalInfo.name} Resume PDF, Vue.js, Nuxt.js, Senior Frontend Engineer Resume`,
	image: imageUrl,
	url: currentUrl,
	type: "profile",
	structuredData: {
		"@type": "MediaObject",
		name: `${personalInfo.name} Resume (Vue/Nuxt)`,
		description: `Vue/Nuxt-focused resume PDF of ${personalInfo.name}`,
		url: currentUrl,
		author: {
			"@type": "Person",
			name: personalInfo.name,
			email: personalInfo.email,
			telephone: personalInfo.phone,
			jobTitle: personalInfo.role,
		},
	},
});

const { trackPdfDownload } = useAnalytics();

onMounted(() => {
	trackPdfDownload("vue");
	setTimeout(() => {
		printResumePdf("vue");
	}, 1000);
});
</script>
<template>
	<ResumePdfDocument :resume-pdf="resumePdf" />
</template>
