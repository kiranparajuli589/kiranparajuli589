<script setup lang="ts">
import Resume from "~/utils/resume";
import { onMounted } from "vue";
import { useSeo } from "~/composables/useSeo";
import { useAnalytics } from "~/composables/useAnalytics";
import type { ResumePdfExperience } from "~/customTypes";

definePageMeta({
	name: "resume-pdf",
	layout: "pdf-view",
});

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/resume-pdf`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const resumePdf = Resume.resumePdf;
const education = Resume.education.filter(
	(edu) => edu.degree !== "High School",
);
const languages = Resume.languages;

const {
	summary: pdfSummary,
	skills: pdfSkills,
	experiences,
	selectedProjects,
} = resumePdf;

const socialLinks = [
	{ label: "LinkedIn", href: personalInfo.linkedin || "#" },
	{ label: "GitHub", href: personalInfo.github || "#" },
	{ label: "Portfolio", href: personalInfo.website || "#" },
	{ label: "Dev.to", href: personalInfo.devto || "#" },
].filter((link) => link.href !== "#");

function formatEmploymentLine(experience: ResumePdfExperience): string {
	const parts = [experience.roles.join(", ")];
	if (experience.employmentType) {
		parts.push(experience.employmentType);
	}
	if (experience.concurrent) {
		parts.push("concurrent");
	}
	parts.push(`${experience.startDate} - ${experience.endDate}`);
	return parts.join(" · ");
}

function formatEducation(edu: (typeof education)[number]): string {
	return `${edu.degree} in ${edu.major} — ${edu.name} (${edu.startDate}–${edu.endDate})`;
}

useSeo({
	title: `${personalInfo.name} - Resume PDF`,
	description: `Professional resume PDF of ${personalInfo.name}, ${personalInfo.role}. Download the complete resume and professional background.`,
	keywords: `${personalInfo.name} Resume PDF, Curriculum Vitae, Senior Frontend Engineer Resume, React Vue TypeScript Resume, Lead Frontend Engineer, Download Resume`,
	image: imageUrl,
	url: currentUrl,
	type: "profile",
	structuredData: {
		"@type": "MediaObject",
		name: `${personalInfo.name} Resume`,
		description: `Professional resume PDF of ${personalInfo.name}`,
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
	trackPdfDownload();
	setTimeout(() => {
		window.print();
	}, 1000);
});
</script>
<template>
	<div class="resume-pdf">
		<div class="pdf">
			<h1 class="font-bold text-xl">{{ personalInfo.name }}</h1>
			<h4 class="text-gray-700 font-semibold mb-2">{{ personalInfo.role }}</h4>
			<p class="flex items-center gap-4 flex-wrap contact-info">
				<span class="flex items-center gap-2">
					<img
						src="/icons/phone.svg"
						alt="Phone"
						class="size-4 block print-hide"
					/>
					{{ personalInfo.phone }}
				</span>
				<span class="flex items-center gap-2">
					<img
						src="/icons/email.svg"
						alt="Email"
						class="size-4 block print-hide"
					/>
					{{ personalInfo.email }}
				</span>
				<span class="flex items-center gap-2">
					<img
						src="/icons/location.svg"
						alt="Location"
						class="size-4 block print-hide"
					/>
					{{ personalInfo.locationLine }}
				</span>
			</p>
			<div class="p-list flex gap-2 flex-wrap items-center contact-links">
				<template v-for="(link, index) in socialLinks" :key="link.label">
					<a
						class="resume-link link-item"
						target="_blank"
						rel="noopener noreferrer"
						:href="link.href"
					>
						{{ link.label }}
					</a>
					<span v-if="index < socialLinks.length - 1" class="link-separator">
						|
					</span>
				</template>
			</div>

			<h2 class="pt-4">Summary</h2>
			<hr class="mb-2" />
			<p>{{ pdfSummary }}</p>

			<h2 class="pt-4">Skills</h2>
			<hr class="mb-2" />
			<div v-for="skill in pdfSkills" :key="skill.title" class="mb-2 skill-row">
				<strong>{{ skill.title }}:</strong>
				<span class="skill-items">{{ skill.items.join(" ") }}</span>
			</div>

			<h2 class="pt-4 experience-section-start">Professional Experience</h2>
			<hr class="mb-2 border-gray-500" />
			<div
				v-for="experience in experiences"
				:key="`${experience.company}-${experience.startDate}`"
				class="mb-4 experience-item"
				:class="{ 'experience-page-break': experience.pageBreakBefore }"
			>
				<h3 class="font-semibold experience-company">
					{{ experience.company }}
				</h3>
				<div class="mb-1">
					<div title="Role" class="font-semibold text-gray-600 role-text">
						{{ formatEmploymentLine(experience) }}
					</div>
				</div>
				<ul>
					<li v-for="task in experience.achievements" :key="task">
						{{ task }}
					</li>
				</ul>
			</div>

			<h2 v-if="selectedProjects.length" class="pt-4">Selected Projects</h2>
			<hr v-if="selectedProjects.length" class="mb-2" />
			<ul v-if="selectedProjects.length" class="selected-projects-list">
				<li v-for="project in selectedProjects" :key="project.title">
					<strong>{{ project.title }}:</strong> {{ project.line }}
				</li>
			</ul>

			<h2 class="pt-4">Education</h2>
			<hr class="mb-2" />
			<div v-for="edu in education" :key="edu.name" class="mb-2">
				<p>{{ formatEducation(edu) }}</p>
			</div>

			<h2 class="pt-4">Languages</h2>
			<hr class="mb-2" />
			<ul class="languages-list">
				<li v-for="language in languages" :key="language.name">
					{{ language.name }} — {{ language.level }}
				</li>
			</ul>
		</div>
		<footer class="screen-footer flex justify-between">
			<div>kiranparajuli.com.np</div>
			<div>All rights reserved &copy; {{ new Date().getFullYear() }}</div>
		</footer>
	</div>
</template>
<style scoped>
.resume-pdf {
	padding: 0.5rem;
	font-family: Georgia, "Times New Roman", Times, serif;
	font-size: 1rem;
	max-width: 1000px;
	margin: 0 auto;
	line-height: 1.35;
}

.resume-pdf .role {
	font-weight: 600;
}

.resume-pdf .p-list .link-item {
	color: #0e62c0;
}

.resume-pdf a.resume-link {
	color: #0e62c0;
	text-decoration: none;
}

.resume-pdf a.resume-link:hover {
	text-decoration: underline;
}

.resume-pdf ul {
	list-style-type: disc;
	padding-left: 1.5rem;
}

.resume-pdf ul > li {
	margin-left: 0;
	margin-bottom: 0.35rem;
}

.resume-pdf h1 {
	font-size: 1.75rem;
	margin-bottom: 0.5rem;
}

.resume-pdf h2 {
	font-size: 1.25rem;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
	page-break-after: avoid;
}

.resume-pdf h3 {
	font-size: 1.1rem;
	margin-top: 0.5rem;
	margin-bottom: 0.25rem;
}

.resume-pdf .contact-info {
	font-size: 0.95rem;
}

.resume-pdf .role-text {
	color: #4b5563;
	font-size: 0.95rem;
}

.resume-pdf .skill-row {
	font-size: 0.95rem;
}

.resume-pdf .skill-items {
	margin-left: 0.25rem;
}

.resume-pdf .languages-list {
	list-style: none;
	padding-left: 0;
}

.resume-pdf .selected-projects-list {
	list-style: none;
	padding-left: 0;
}

.resume-pdf .selected-projects-list > li {
	margin-bottom: 0.35rem;
}

.resume-pdf .contact-links {
	font-size: 0.9rem;
}

.resume-pdf .link-separator {
	color: #666;
}

.print-hide {
	display: inline-block;
}

/* Print Styles */
@media print {
	@page {
		size: letter;
		margin: 0.5in;
	}

	.resume-pdf {
		padding: 0;
		font-family: Georgia, "Times New Roman", Times, serif;
		font-size: 10pt;
		max-width: 100%;
		margin: 0;
		line-height: 1.35;
	}

	.resume-pdf h1 {
		font-size: 18pt;
		margin-bottom: 0.25rem;
	}

	.resume-pdf h2 {
		font-size: 12pt;
		margin-top: 10pt;
		margin-bottom: 4pt;
		page-break-after: avoid;
		border-bottom: 1pt solid #000;
		padding-bottom: 2pt;
	}

	.resume-pdf .experience-section-start {
		page-break-before: auto;
		margin-top: 10pt;
	}

	.resume-pdf h3 {
		font-size: 11pt;
		margin-top: 6pt;
		margin-bottom: 2pt;
		page-break-after: avoid;
	}

	.resume-pdf p {
		margin-bottom: 4pt;
		font-size: 10pt;
	}

	.resume-pdf ul {
		margin-bottom: 6pt;
	}

	.resume-pdf ul > li {
		margin-bottom: 2pt;
		font-size: 10pt;
	}

	.resume-pdf hr {
		border: none;
		border-top: 1pt solid #ccc;
		margin: 4pt 0;
	}

	.resume-pdf h2 + hr {
		display: none;
	}

	.print-hide,
	.screen-footer {
		display: none !important;
	}

	.resume-pdf .p-list .link-item {
		color: #000 !important;
	}

	.resume-pdf a.resume-link {
		color: #000 !important;
		text-decoration: none !important;
	}

	.resume-pdf .role-text {
		color: #4b5563 !important;
		font-size: 9.5pt;
	}

	.resume-pdf .skill-row {
		font-size: 9.5pt;
		margin-bottom: 4pt;
	}

	.resume-pdf .experience-item {
		page-break-inside: avoid;
		margin-bottom: 6pt;
	}

	.resume-pdf .experience-page-break {
		page-break-before: always;
	}

	.resume-pdf * {
		color: #000 !important;
		background: transparent !important;
	}

	.resume-pdf .mb-2 {
		margin-bottom: 4pt;
	}

	.resume-pdf .mb-4 {
		margin-bottom: 8pt;
	}

	.resume-pdf .pt-4 {
		padding-top: 8pt;
	}
}
</style>
