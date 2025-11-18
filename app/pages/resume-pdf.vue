<script setup lang="ts">
import Resume from "~/utils/resume";
import { onMounted } from "vue";
import Divider from "~/components/Divider.vue";
import { useSeo } from "~/composables/useSeo";

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
const coreSkills = Resume.coreSkills;
const additionalSkills = Resume.additionalSkills;
const leadershipHighlights = Resume.leadershipHighlights;
const selectedProjects = Resume.selectedProjects;
const extras = Resume.extras;

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

onMounted(() => {
	setTimeout(() => {
		// Set document title for PDF filename
		const filename = `${personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`;
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
			<h1 class="font-semibold text-lg">{{ personalInfo.name }}</h1>
			<h4>{{ personalInfo.role }}</h4>
			<p class="flex items-center gap-4 flex-wrap">
				<a :href="`tel:${personalInfo.phone}`">
					<span class="mr-1">📞</span>
					{{ personalInfo.phone }}
				</a>
				<a :href="`mailto:${personalInfo.email}`">
					<span class="mr-1">✉️</span>
					{{ personalInfo.email }}
				</a>
				<a
					target="_blank"
					title="Open in Google Maps"
					:href="`https://maps.app.goo.gl/tjWvTf761EWywkCU9`"
				>
					<span class="mr-1">📍</span>
					{{ personalInfo.municipality }}, {{ personalInfo.country }}
					{{ personalInfo.postalCode }}
				</a>
			</p>
			<div class="p-list flex gap-2 flex-wrap items-center">
				<span class="font-semibold">Links:</span>
				<a target="_blank" :href="personalInfo.linkedin || '#'">
					<span>LinkedIn</span>
				</a>
				<a target="_blank" :href="personalInfo.github || '#'">
					<span>GitHub</span>
				</a>
				<a target="_blank" :href="personalInfo.website || '#'">
					<span>Website</span>
				</a>
				<a target="_blank" :href="personalInfo.devto || '#'">
					<span>Dev.to</span>
				</a>
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

			<h2 class="pt-4">Core Skills</h2>
			<hr class="mb-2" />
			<div v-for="skill in coreSkills" :key="skill.title" class="mb-4">
				<h4 class="font-semibold">{{ skill.title }}</h4>
				<ul>
					<li v-for="item in skill.items" :key="item">{{ item }}</li>
				</ul>
			</div>

			<h2 class="pt-4">Experience</h2>
			<hr class="mb-2 border-gray-500" />
			<div
				v-for="(experience, index) in experiences"
				:key="experience.company"
				class="mb-6"
			>
				<h3 class="font-semibold">
					{{ index + 1 }}. {{ experience.company }}
					<a
						target="_blank"
						:href="experience.companyUrl"
						:title="experience.company"
					>
						↗
					</a>
				</h3>
				<div class="mb-1">
					<div
						title="Role"
						class="font-semibold text-gray-600 dark:text-gray-400"
					>
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
				v-for="(project, index) in selectedProjects"
				:key="project.title"
				class="mb-6"
			>
				<h3 class="font-semibold">{{ index + 1 }}. {{ project.title }}</h3>
				<hr class="mb-2" />
				<p class="mb-1">{{ project.description }}</p>
				<p class="mb-2 text-sm italic">{{ project.impact }}</p>
				<div class="mb-1 text-sm">
					<strong class="mr-3">Stack:</strong> {{ project.stack.join(", ") }}
				</div>
				<div
					v-if="project.links && Object.keys(project.links).length"
					class="flex gap-4 mb-2"
				>
					<strong>Links:</strong>
					<template
						v-for="[key, value] in Object.entries(project.links)"
						:key="key"
					>
						<a target="_blank" class="capitalize" :href="value">
							{{ key }} ↗
						</a>
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

			<h2 class="pt-4">Additional Skills</h2>
			<hr class="mb-2" />

			<div v-for="skill in additionalSkills" :key="skill.title" class="mb-4">
				<h4 class="font-semibold">{{ skill.title }}</h4>
				<ul>
					<li v-for="item in skill.items" :key="item">{{ item }}</li>
				</ul>
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
	font-size: 0.875rem;
	max-width: 1000px;
	margin: 0 auto;
}

.resume-pdf .role {
	font-weight: 600;
}

.resume-pdf .p-list a {
	color: #0e62c0;
}

.resume-pdf ul {
	list-style-type: disc;
	padding-left: 1.5rem;
}

.resume-pdf ul > li {
	margin-left: 0;
	margin-bottom: 0.25rem;
}
</style>
