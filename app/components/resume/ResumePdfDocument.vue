<script setup lang="ts">
import Resume from "~/utils/resume";
import type { ResumePdfExport } from "~/customTypes";
import {
	buildResumeSocialLinks,
	formatEducation,
	formatEmploymentLine,
} from "~/composables/useResumePdfDocument";

const props = defineProps<{
	resumePdf: ResumePdfExport;
}>();

const personalInfo = Resume.personalInfo;
const education = Resume.education.filter(
	(edu) => edu.degree !== "High School",
);
const languages = Resume.languages;
const socialLinks = buildResumeSocialLinks(personalInfo);

const {
	summary: pdfSummary,
	role: pdfRole,
	skills: pdfSkills,
	experiences,
	selectedProjects,
} = props.resumePdf;
</script>
<template>
	<div class="resume-pdf">
		<div class="pdf">
			<h1 class="font-bold text-xl">{{ personalInfo.name }}</h1>
			<h4 class="text-gray-700 font-semibold mb-2">
				{{ pdfRole ?? personalInfo.role }}
			</h4>
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
				<template v-if="skill.items.length > 1">
					<div
						v-for="item in skill.items"
						:key="item"
						class="skill-items skill-items-line"
					>
						{{ item }}
					</div>
				</template>
				<span v-else class="skill-items">{{ skill.items.join(" ") }}</span>
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

.resume-pdf .skill-items-line {
	display: block;
	margin-left: 0;
	margin-top: 1pt;
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

@media print {
	@page {
		size: letter;
		margin: 0.4in 0.48in;
	}

	.resume-pdf {
		padding: 0;
		font-family: Georgia, "Times New Roman", Times, serif;
		font-size: 10pt;
		max-width: 100%;
		margin: 0;
		line-height: 1.32;
	}

	.resume-pdf h1 {
		font-size: 17pt;
		margin-bottom: 3pt;
	}

	.resume-pdf h2 {
		font-size: 12pt;
		margin-top: 9pt;
		margin-bottom: 3pt;
		page-break-after: avoid;
		border-bottom: 1pt solid #000;
		padding-bottom: 2pt;
	}

	.resume-pdf .experience-section-start {
		page-break-before: auto;
		margin-top: 9pt;
	}

	.resume-pdf h3 {
		font-size: 11pt;
		margin-top: 6pt;
		margin-bottom: 3pt;
		page-break-after: avoid;
	}

	.resume-pdf h4 {
		margin-bottom: 2pt !important;
	}

	.resume-pdf p {
		margin-bottom: 4pt;
		font-size: 10pt;
	}

	.resume-pdf ul {
		margin-top: 0;
		margin-bottom: 6pt;
		padding-left: 1.35rem;
	}

	.resume-pdf ul > li {
		margin-bottom: 3pt;
		font-size: 10pt;
		line-height: 1.3;
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

	.resume-pdf .contact-info,
	.resume-pdf .contact-links {
		margin-bottom: 3pt;
	}

	.resume-pdf .role-text {
		color: #4b5563 !important;
		font-size: 9.5pt;
	}

	.resume-pdf .skill-row {
		font-size: 9.5pt;
		margin-bottom: 4pt;
	}

	.resume-pdf .skill-items-line {
		display: block;
		margin-left: 0;
		margin-top: 2pt;
	}

	.resume-pdf .experience-item {
		page-break-inside: avoid;
		margin-bottom: 8pt;
	}

	.resume-pdf .experience-page-break {
		page-break-before: always;
	}

	.resume-pdf * {
		color: #000 !important;
		background: transparent !important;
	}

	.resume-pdf .mb-1 {
		margin-bottom: 2pt !important;
	}

	.resume-pdf .mb-2 {
		margin-bottom: 3pt !important;
	}

	.resume-pdf .mb-4 {
		margin-bottom: 6pt !important;
	}

	.resume-pdf .pt-4 {
		padding-top: 2pt !important;
	}

	.resume-pdf .selected-projects-list > li {
		margin-bottom: 3pt;
	}
}
</style>
