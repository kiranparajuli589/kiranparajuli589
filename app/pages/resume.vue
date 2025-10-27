<script setup lang="ts">
import ExperienceSection from "~/components/home/ExperienceSection.vue";
import ToolsSection from "~/components/home/ToolsSection.vue";
import Resume from "~/utils/resume";
import {
	useSeo,
	createPersonStructuredData,
	createCollectionPageStructuredData,
} from "~/composables/useSeo";

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/resume`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const experiences = Resume.experiences;
const technologies = Resume.technologies;

// Extract skills from technologies
const skills = technologies.flatMap((tech) => tech.tools.map((t) => t.tooltip));
const skillsList = [...new Set(skills)].slice(0, 10).join(", ");

// Create a summary for SEO
const resumeSummary = `Professional resume of ${personalInfo.name}, a ${personalInfo.role} with ${experiences.length} years of experience in software development and quality assurance. Specialized in ${skillsList} and modern web technologies.`;

// Page-specific SEO
useSeo({
	title: `Resume - ${personalInfo.name}`,
	description: resumeSummary,
	keywords: `${personalInfo.name}, Resume, Curriculum Vitae, Frontend Developer Resume, Full Stack Developer Resume, QA Engineer Resume, Developer Portfolio`,
	image: imageUrl,
	url: currentUrl,
	type: "profile",
	structuredData: createPersonStructuredData({
		name: String(personalInfo.name),
		jobTitle: String(personalInfo.role),
		description: String(personalInfo.summary),
		image: imageUrl,
		url: siteUrl,
		email: personalInfo.email ? String(personalInfo.email) : undefined,
		telephone: personalInfo.phone ? String(personalInfo.phone) : undefined,
		address: {
			addressLocality: String(personalInfo.municipality),
			addressCountry: String(personalInfo.country),
			postalCode: personalInfo.postalCode
				? String(personalInfo.postalCode)
				: undefined,
		},
		sameAs: [
			personalInfo.linkedin ? String(personalInfo.linkedin) : undefined,
			personalInfo.github ? String(personalInfo.github) : undefined,
			personalInfo.devto ? String(personalInfo.devto) : undefined,
		].filter((item) => item !== undefined),
		knowsAbout: [...new Set(skills)].slice(0, 20),
	}),
});

// Additional structured data for collection page
useHead({
	script: [
		{
			type: "application/ld+json",
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				...createCollectionPageStructuredData({
					name: `${personalInfo.name} Resume`,
					description: `Professional resume and experience of ${personalInfo.name}`,
					url: currentUrl,
				}),
			}),
		},
	],
});
</script>
<template>
	<div class="resume">
		<h1 class="pt-12">
			<span class="text-xl uppercase font-bold mr-4">Resume</span>
			<UButton
				color="primary"
				title="Download a copy of my resume"
				variant="subtle"
				:to="'/resume-pdf'"
			>
				<UIcon name="i-heroicons-arrow-down-tray" />
				<span class="px-1 font-bold">Download Pdf</span>
			</UButton>
		</h1>

		<ExperienceSection />
		<ToolsSection />
	</div>
</template>
<style scoped>
.tech-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
}

.tech-list i {
	font-size: 4rem;
}

.tech-list img {
	width: 4rem;
	height: auto;
	filter: grayscale(1);
}

.tech-list img:hover {
	filter: grayscale(0);
}

div[title="Behat"] img {
	height: 3.8rem;
	width: 3rem;
}

body.dark div[title="Behat"],
body.dark div[title="VPS"] {
	filter: invert(1);
}
</style>
