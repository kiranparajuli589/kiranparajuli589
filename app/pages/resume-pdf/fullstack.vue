<script setup lang="ts">
import Resume from "~/utils/resume";
import { onMounted } from "vue";
import { useSeo } from "~/composables/useSeo";
import { useAnalytics } from "~/composables/useAnalytics";
import { printResumePdf } from "~/composables/useResumePdfDocument";
import ResumePdfDocument from "~/components/resume/ResumePdfDocument.vue";

definePageMeta({
	name: "resume-pdf-fullstack",
	layout: "pdf-view",
});

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/resume-pdf/fullstack`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const resumePdf = Resume.resumePdfs.fullstack;

useSeo({
	title: `${personalInfo.name} - Resume PDF (Full-Stack · Python/Django)`,
	description: `Full-stack resume PDF of ${personalInfo.name}—Python, Django, Django REST Framework, PostgreSQL, with Vue and React frontends.`,
	keywords: `${personalInfo.name} Resume PDF, Python, Django, Django REST Framework, DRF, PostgreSQL, FastAPI, Full-Stack Engineer Resume`,
	image: imageUrl,
	url: currentUrl,
	type: "profile",
	structuredData: {
		"@type": "MediaObject",
		name: `${personalInfo.name} Resume (Full-Stack · Python/Django)`,
		description: `Full-stack resume PDF of ${personalInfo.name}`,
		url: currentUrl,
		author: {
			"@type": "Person",
			name: personalInfo.name,
			email: personalInfo.email,
			telephone: personalInfo.phone,
			jobTitle: resumePdf.role ?? personalInfo.role,
		},
	},
});

const { trackPdfDownload } = useAnalytics();

onMounted(() => {
	trackPdfDownload("fullstack");
	setTimeout(() => {
		printResumePdf("fullstack");
	}, 1000);
});
</script>
<template>
	<ResumePdfDocument :resume-pdf="resumePdf" />
</template>
