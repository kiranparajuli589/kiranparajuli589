<script setup lang="ts">
import ExperienceSection from "~/components/home/ExperienceSection.vue";
import CredentialsSection from "~/components/home/CredentialsSection.vue";
import AiEngineeringSection from "~/components/home/AiEngineeringSection.vue";
import LanguagesSection from "~/components/home/LanguagesSection.vue";
import ToolsSection from "~/components/home/ToolsSection.vue";
import ResumeDownloadTools from "~/components/resume/ResumeDownloadTools.vue";
import Resume, { yearsOfExperience } from "~/utils/resume";
import {
	useSeo,
	createPersonStructuredData,
	createCollectionPageStructuredData,
} from "~/composables/useSeo";

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/resume`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const technologies = Resume.technologies;

const skills = technologies.flatMap((tech) => tech.tools.map((t) => t.tooltip));
const aiToolNames = Resume.aiEngineering.tools.map((t) => t.tooltip);
const skillsList = [...new Set([...skills, ...aiToolNames])].slice(0, 10).join(", ");

const resumeSummary = `Professional resume of ${personalInfo.name}, a ${personalInfo.role} with ${yearsOfExperience}+ years of experience in software development and quality assurance. Specialized in ${skillsList} and modern web technologies.`;

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
		knowsAbout: [...new Set([...skills, ...aiToolNames])].slice(0, 20),
	}),
});

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
		<div class="pt-12 space-y-8">
			<ResumeDownloadTools />
		</div>

		<ExperienceSection />
		<CredentialsSection />
		<AiEngineeringSection />
		<ToolsSection />
		<LanguagesSection />
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
