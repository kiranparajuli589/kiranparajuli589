<script setup lang="ts">
import Resume from "~/utils/resume";
import { onMounted } from "vue";
import Divider from "~/components/Divider.vue";
import { useSeo } from "~/composables/useSeo";
import { useAnalytics } from "~/composables/useAnalytics";

definePageMeta({
	name: "resume-pdf",
	layout: "pdf-view",
});

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/resume-pdf`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const experiences = Resume.experiences;
const education = Resume.education;
const skills = Resume.skills;
const leadershipHighlights = Resume.leadershipHighlights;
const selectedProjects = Resume.selectedProjects;
const extras = Resume.extras;

// Social links array
const socialLinks = [
	{
		label: "LinkedIn",
		href: personalInfo.linkedin || "#",
	},
	{
		label: "GitHub",
		href: personalInfo.github || "#",
	},
	{
		label: "Website",
		href: personalInfo.website || "#",
	},
	{
		label: "Dev.to",
		href: personalInfo.devto || "#",
	},
].filter((link) => link.href !== "#");

// Page-specific SEO
useSeo({
	title: `${personalInfo.name} - Resume PDF`,
	description: `Professional resume PDF of ${personalInfo.name}, ${personalInfo.role}. Download the complete resume and professional background.`,
	keywords: `${personalInfo.name} Resume PDF, Curriculum Vitae, Frontend Developer Resume, Full Stack Developer Resume, QA Engineer Resume, Download Resume`,
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
		// Set document title for PDF filename
		const filename = `${personalInfo.name?.replace(/\s+/g, "_")}_Resume.pdf`;
		const originalTitle = document.title;
		document.title = filename.replace(".pdf", "");

		window.print();

		// Restore original title after printing
		setTimeout(() => {
			document.title = originalTitle;
		}, 1000);
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
					{{ personalInfo.municipality }}, {{ personalInfo.country }},
					{{ personalInfo.postalCode }}
				</span>
			</p>
			<div class="p-list flex gap-2 flex-wrap items-center">
				<span class="font-semibold">Links:</span>
				<span
					v-for="(link, index) in socialLinks"
					:key="link.label"
					class="link-item"
				>
					<span>{{ link.label }}</span>
					<span class="link-url">({{ link.href }})</span>
					<span v-if="index < socialLinks.length - 1">, </span>
				</span>
			</div>

			<h2 class="pt-4">Summary</h2>
			<hr class="mb-2" />
			<p>{{ personalInfo.summary }}</p>

			<h2 class="pt-4">Leadership Highlights</h2>
			<hr class="mb-2" />
			<ul>
				<li v-for="highlight in leadershipHighlights" :key="highlight">
					{{ highlight }}
				</li>
			</ul>

			<h2 class="pt-4">Skills</h2>
			<hr class="mb-2" />
			<div v-for="skill in skills" :key="skill.title" class="mb-4">
				<h4 class="font-semibold">{{ skill.title }}</h4>
				<ul>
					<li v-for="item in skill.items" :key="item">{{ item }}</li>
				</ul>
			</div>

			<h2 class="pt-4 experience-section-start">Experience</h2>
			<hr class="mb-2 border-gray-500" />
			<div
				v-for="experience in experiences"
				:key="experience.company"
				class="mb-6 experience-item"
			>
				<h3 class="font-semibold experience-company">
					{{ experience.company }}
					<span class="company-url">({{ experience.companyUrl }})</span>
				</h3>
				<div class="mb-1">
					<div title="Role" class="font-semibold text-gray-600 role-text">
						{{ experience.roles.join(", ") }} ({{ experience.startDate }} -
						{{ experience.endDate }})
					</div>
				</div>
				<hr class="mb-2 border-gray-400" />
				<h3>Achievements</h3>
				<hr class="mb-2 border-gray-300" />
				<ul>
					<li v-for="task in experience.achievements" :key="task">
						{{ task }}
					</li>
				</ul>
			</div>

			<h2 class="pt-4">Selected Projects</h2>
			<Divider class="mb-2" height="2" />

			<div
				v-for="project in selectedProjects"
				:key="project.title"
				class="mb-6 project-item"
			>
				<h3 class="font-semibold">{{ project.title }}</h3>
				<hr class="mb-2" />
				<p class="mb-1">{{ project.description }}</p>
				<p class="mb-2 text-sm italic">{{ project.impact }}</p>
				<div class="mb-1 text-sm">
					<strong class="mr-3">Stack:</strong> {{ project.stack.join(", ") }}
				</div>
				<div
					v-if="project.links && Object.keys(project.links).length"
					class="flex gap-4 mb-2 flex-wrap project-links"
				>
					<strong>Links:</strong>
					<template v-for="(value, key, idx) in project.links" :key="key">
						<span class="capitalize">
							{{ key }}: {{ value }}
							<span v-if="idx < Object.keys(project.links).length - 1">
								,
							</span>
						</span>
					</template>
				</div>
			</div>

			<h2 class="pt-4">Education</h2>
			<hr class="mb-2" />

			<div v-for="edu in education" :key="edu.name" class="mb-4">
				<h3 class="font-semibold">{{ edu.degree }} in {{ edu.name }}</h3>
				<h4>{{ edu.major }}</h4>
				<p>{{ edu.startDate }} - {{ edu.endDate }}</p>
			</div>

			<h2 class="pt-4">Extras</h2>
			<hr class="mb-2" />
			<ul>
				<li v-for="extra in extras" :key="extra">{{ extra }}</li>
			</ul>
		</div>
		<hr class="border-gray-200 dark:border-gray-700 my-4" />
		<footer class="flex justify-between">
			<div>kiranparajuli.com.np</div>
			<div>All rights reserved &copy; {{ new Date().getFullYear() }}</div>
		</footer>
	</div>
</template>
<style scoped>
.resume-pdf {
	padding: 0.5rem;
	font-size: 1rem;
	max-width: 1000px;
	margin: 0 auto;
	line-height: 1.6;
}

.resume-pdf .role {
	font-weight: 600;
}

.resume-pdf .p-list .link-item {
	color: #0e62c0;
}

.resume-pdf .p-list .link-url {
	font-size: 0.85em;
	color: #666;
	font-weight: normal;
}

.resume-pdf ul {
	list-style-type: disc;
	padding-left: 1.5rem;
}

.resume-pdf ul > li {
	margin-left: 0;
	margin-bottom: 0.5rem;
}

.resume-pdf h1 {
	font-size: 1.75rem;
	margin-bottom: 0.5rem;
}

.resume-pdf h2 {
	font-size: 1.25rem;
	margin-top: 1.5rem;
	margin-bottom: 0.5rem;
	page-break-after: avoid;
}

.resume-pdf h3 {
	font-size: 1.1rem;
	margin-top: 0.75rem;
	margin-bottom: 0.25rem;
}

.resume-pdf h4 {
	font-size: 1rem;
	margin-top: 0.5rem;
	margin-bottom: 0.25rem;
}

.resume-pdf .experience-item,
.resume-pdf .project-item {
	page-break-inside: avoid;
}

.resume-pdf .contact-info {
	font-size: 0.95rem;
}

.resume-pdf .company-url {
	font-size: 0.85em;
	color: #666;
	font-weight: normal;
}

.resume-pdf .role-text {
	color: #4b5563;
}

.print-hide {
	display: inline-block;
}

/* Print Styles */
@media print {
	@page {
		size: letter;
		margin: 0.75in;
	}

	.resume-pdf {
		padding: 0;
		font-size: 11pt;
		max-width: 100%;
		margin: 0;
	}

	.resume-pdf h1 {
		font-size: 20pt;
		margin-bottom: 0.25rem;
	}

	.resume-pdf h2 {
		font-size: 14pt;
		margin-top: 12pt;
		margin-bottom: 6pt;
		page-break-after: avoid;
		border-bottom: 1pt solid #000;
		padding-bottom: 3pt;
	}

	.resume-pdf .experience-section-start {
		page-break-before: always;
		margin-top: 0;
	}

	.resume-pdf h3 {
		font-size: 12pt;
		margin-top: 8pt;
		margin-bottom: 4pt;
		page-break-after: avoid;
	}

	.resume-pdf h4 {
		font-size: 11pt;
		margin-top: 6pt;
		margin-bottom: 3pt;
	}

	.resume-pdf p {
		margin-bottom: 6pt;
		font-size: 11pt;
	}

	.resume-pdf ul {
		margin-bottom: 8pt;
	}

	.resume-pdf ul > li {
		margin-bottom: 4pt;
		font-size: 11pt;
	}

	.resume-pdf hr {
		border: none;
		border-top: 1pt solid #ccc;
		margin: 6pt 0;
	}

	/* Hide hr elements immediately following h2 to avoid double lines (h2 already has border-bottom) */
	.resume-pdf h2 + hr {
		display: none;
	}

	/* Hide icons in print */
	.print-hide {
		display: none !important;
	}

	/* Remove colors and links */
	.resume-pdf .p-list .link-item {
		color: #000 !important;
	}

	.resume-pdf .p-list .link-url {
		color: #666 !important;
		font-size: 9pt;
	}

	.resume-pdf .company-url {
		color: #666 !important;
		font-size: 9pt;
	}

	.resume-pdf .role-text {
		color: #4b5563 !important;
	}

	/* Page break controls */
	.resume-pdf .experience-item,
	.resume-pdf .project-item {
		page-break-inside: avoid;
		margin-bottom: 12pt;
	}

	/* Footer only on last page */
	.resume-pdf footer {
		page-break-inside: avoid;
		margin-top: 20pt;
		padding-top: 10pt;
		border-top: 1pt solid #ccc;
		font-size: 9pt;
		color: #666;
	}

	/* Remove dark mode classes */
	.resume-pdf * {
		color: #000 !important;
		background: transparent !important;
	}

	/* Ensure proper spacing */
	.resume-pdf .mb-2 {
		margin-bottom: 6pt;
	}

	.resume-pdf .mb-4 {
		margin-bottom: 12pt;
	}

	.resume-pdf .mb-6 {
		margin-bottom: 18pt;
	}

	.resume-pdf .pt-4 {
		padding-top: 12pt;
	}

	/* Project links formatting */
	.resume-pdf .project-links {
		font-size: 10pt;
	}
}
</style>
