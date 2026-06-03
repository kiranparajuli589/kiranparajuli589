<script setup lang="ts">
import ExperienceSection from "~/components/home/ExperienceSection.vue";
import LanguagesSection from "~/components/home/LanguagesSection.vue";
import ToolsSection from "~/components/home/ToolsSection.vue";
import Resume, { yearsOfExperience } from "~/utils/resume";
import type { ResumePdfVariant } from "~/customTypes";
import {
	useSeo,
	createPersonStructuredData,
	createCollectionPageStructuredData,
} from "~/composables/useSeo";
import { useResumeExport } from "~/composables/useResumeExport";
import { useAnalytics } from "~/composables/useAnalytics";

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/resume`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const technologies = Resume.technologies;

const skills = technologies.flatMap((tech) => tech.tools.map((t) => t.tooltip));
const skillsList = [...new Set(skills)].slice(0, 10).join(", ");

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
		knowsAbout: [...new Set(skills)].slice(0, 20),
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

const { trackPlainTextDownload } = useAnalytics();

const handleDownloadPlainText = (variant: ResumePdfVariant) => {
	trackPlainTextDownload();
	const { downloadAsPlainText } = useResumeExport(variant);
	downloadAsPlainText();
};

const handleDownloadDocx = async (variant: ResumePdfVariant) => {
	try {
		const { useDocxExport } = await import("~/composables/useDocxExport");
		const { exportResumeAsDocx } = useDocxExport();
		await exportResumeAsDocx(variant);
	} catch (error) {
		console.error("Failed to export DOCX:", error);
		const message =
			error instanceof Error
				? error.message
				: "Failed to export DOCX. Please try again.";
		alert(message);
	}
};
</script>
<template>
	<div class="resume">
		<div class="pt-12 space-y-8">
			<h1 class="text-xl uppercase font-bold">Resume</h1>

			<section class="space-y-3">
				<h2
					class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
				>
					Vue / Nuxt Resume
				</h2>
				<div class="flex flex-wrap gap-4 items-center">
					<UButton
						color="primary"
						title="Download Vue/Nuxt resume as PDF"
						variant="subtle"
						to="/resume-pdf"
					>
						<UIcon name="i-heroicons-arrow-down-tray" />
						<span class="px-1 font-bold">PDF</span>
					</UButton>
					<UButton
						color="primary"
						title="Download Vue/Nuxt resume as plain text"
						variant="subtle"
						@click="handleDownloadPlainText('vue')"
					>
						<UIcon name="i-heroicons-document-text" />
						<span class="px-1 font-bold">TXT</span>
					</UButton>
					<UButton
						color="primary"
						title="Download Vue/Nuxt resume as DOCX"
						variant="subtle"
						@click="handleDownloadDocx('vue')"
					>
						<UIcon name="i-heroicons-document-duplicate" />
						<span class="px-1 font-bold">DOCX</span>
					</UButton>
					<UButton
						color="primary"
						title="Generate cover letter aligned with Vue/Nuxt resume"
						variant="subtle"
						to="/cover-letter?variant=vue"
					>
						<UIcon name="i-heroicons-envelope" />
						<span class="px-1 font-bold">Cover Letter</span>
					</UButton>
				</div>
				<p class="text-sm text-gray-600 dark:text-gray-400 print-tip">
					When saving as PDF, disable <strong>Headers and footers</strong> in
					the print dialog to remove date, title, URL, and page numbers.
				</p>
			</section>

			<section class="space-y-3">
				<h2
					class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
				>
					React / Next.js Resume
				</h2>
				<div class="flex flex-wrap gap-4 items-center">
					<UButton
						color="primary"
						title="Download React/Next.js resume as PDF"
						variant="subtle"
						to="/resume-pdf/react"
					>
						<UIcon name="i-heroicons-arrow-down-tray" />
						<span class="px-1 font-bold">PDF</span>
					</UButton>
					<UButton
						color="primary"
						title="Download React/Next.js resume as plain text"
						variant="subtle"
						@click="handleDownloadPlainText('react')"
					>
						<UIcon name="i-heroicons-document-text" />
						<span class="px-1 font-bold">TXT</span>
					</UButton>
					<UButton
						color="primary"
						title="Download React/Next.js resume as DOCX"
						variant="subtle"
						@click="handleDownloadDocx('react')"
					>
						<UIcon name="i-heroicons-document-duplicate" />
						<span class="px-1 font-bold">DOCX</span>
					</UButton>
					<UButton
						color="primary"
						title="Generate cover letter aligned with React/Next.js resume"
						variant="subtle"
						to="/cover-letter?variant=react"
					>
						<UIcon name="i-heroicons-envelope" />
						<span class="px-1 font-bold">Cover Letter</span>
					</UButton>
				</div>
				<p class="text-sm text-gray-600 dark:text-gray-400 print-tip">
					When saving as PDF, disable <strong>Headers and footers</strong> in
					the print dialog to remove date, title, URL, and page numbers.
				</p>
			</section>
		</div>

		<ExperienceSection />
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
