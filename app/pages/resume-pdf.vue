<template>
	<div class="resume-pdf">
		<div class="pdf">
			<h1>{{ personalInfo.name }}</h1>
			<h4>{{ personalInfo.role }}</h4>
			<p class="flex items-center gap-4 flex-wrap">
				<UIcon name="i-mdi-phone" />
				{{ personalInfo.phone }}
				<UIcon name="i-mdi-at" />
				{{ personalInfo.email }}
				<UIcon name="i-mdi-map-marker" />
				{{ personalInfo.municipality }}, {{ personalInfo.country }} {{ personalInfo.postalCode }}
			</p>
			<div class="p-list flex gap-4 flex-wrap items-center">
				<a :href="personalInfo.linkedin" target="_blank">
					<UIcon name="i-mdi-linkedin" />
					{{ personalInfo.linkedin.replace('https://', '') }}
				</a>
				<a :href="personalInfo.github" target="_blank">
					<UIcon name="i-mdi-github" class="text-black" />
					{{ personalInfo.github.replace('https://', '') }}
				</a>
				<a :href="personalInfo.website" target="_blank">
					<UIcon name="i-mdi-web" class="text-indigo-600" />
					{{ personalInfo.website.replace('https://', '') }}
				</a>
				<a :href="personalInfo.devto" target="_blank" class="flex gap-2 items-center">
					<img src="/tech/devto.png" width="25" />
					{{ personalInfo.devto.replace('https://', '') }}
				</a>
			</div>

			<h2 class="pt-4">Summary</h2>
			<Divider class="mb-2" height="2" />
			<p>{{ personalInfo.summary }}</p>

			<h2 class="pt-4">Education</h2>
			<Divider class="mb-2" height="2" />

			<div class="mb-4" v-for="edu in education" :key="edu.name">
				<h3>{{ edu.degree }} in {{ edu.name }}</h3>
				<h4>{{ edu.major }}</h4>
				<p>{{ edu.startDate }} - {{ edu.endDate }}</p>
			</div>

			<h2 class="pt-4">Tools and Technologies</h2>
			<Divider class="mb-2" height="2" />

			<div v-for="tech in technologies" :key="tech.name" class="mb-4">
				<h4>{{ tech.name }}</h4>
				<div>
					<template v-for="(tool, index) in tech.tools">
						{{ tool.tooltip }}<template v-if="index !== tech.tools.length - 1">,  </template>
					</template>
				</div>
			</div>
			<div class="my-16" />

			<h2 class="pt-4">Experience</h2>
			<Divider class="mb-2" height="2" />
			<div v-for="(experience, index) in experiences" :key="experience.company" class="mb-4">
				<h3>
					{{ index + 1 }}. {{ experience.company }}
					<a :href="experience.companyUrl" target="_blank" :title="experience.company">
						<UIcon name="i-heroicons-arrow-top-right-on-square" class="text-xs" />
					</a>
				</h3>
				<Divider />
				<div class="mb-2">
					<div title="Role" class="font-semibold">{{ experience.roles.join(', ') }} ({{ experience.startDate }} - {{ experience.endDate }})</div>
				</div>
				<h3>Achievements</h3>
				<div class="border-t border-gray-200 dark:border-gray-700 my-4 mb-2" />
				<ul>
					<li v-for="task in experience.achievements" :key="task" v-html="task" />
				</ul>
				<h3 class="pt-2">Projects</h3>
				<div class="border-t border-gray-200 dark:border-gray-700 my-4 pb-2" />
				<div v-for="(project, index) in experience.projects" :key="index">
					<h4>{{ index + 1 }}. {{ project.name }}</h4>
					<p>{{ project.description }}</p>
				</div>
			</div>

			<h2 class="pt-4">Works</h2>
			<Divider class="mb-2" height="2" />

			<div v-for="(work, index) in works" :key="work.title" class="mb-6">
				<h3>{{ index + 1 }}. {{ work.title }}</h3>
				<Divider class="mb-2" />
				<p class="mb-2">{{ work.description }}</p>
				<div class="flex gap-4 mb-2">
					<strong>Links:</strong>
					<template v-for="[key, value] in Object.entries(work.links)" :key="key">
						<a :href="value" target="_blank" class="capitalize">
							{{ key }}
							<UIcon name="i-heroicons-arrow-top-right-on-square" class="text-xs inline" />
						</a>
					</template>
				</div>
			</div>
		</div>
		<div class="border-t border-gray-200 dark:border-gray-700 my-4" />
		<footer class="flex justify-between">
			<div>kiranparajuli.com.np</div>
			<div>All rights reserved &copy; {{ new Date().getFullYear() }}</div>
		</footer>
	</div>
</template>
<script setup lang="ts">
import Resume from '~/utils/resume'
import { onMounted } from 'vue'
import Divider from '~/components/Divider.vue'

definePageMeta({
  layout: 'pdf-view',
})

const personalInfo = Resume.personalInfo
const experiences = Resume.experiences
const works = Resume.works
const technologies = Resume.technologies
const education = Resume.education

onMounted(() => {
	setTimeout(() => {
		if (import.meta.client) {
			window.print()
		}
	}, 1000)
})
</script>
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

.resume-pdf ul > li {
	margin-left: 1rem;
}
</style>

