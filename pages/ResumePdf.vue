<template>
	<div class="resume-pdf">
		<div class="pdf">
			<h1>{{ personalInfo.name }}</h1>
			<h4>{{ personalInfo.role }}</h4>
			<p>
				{{ personalInfo.phone }}
				{{ personalInfo.email }}
				{{ personalInfo.municipality }},
				{{ personalInfo.country }}
				{{ personalInfo.postalCode }}
			</p>
			<div class="p-list">
				<a :href="personalInfo.linkedin" target="_blank">
					<v-icon>mdi-linkedin</v-icon>
					{{ personalInfo.linkedin.replace("https://", "") }}
				</a>
				<a :href="personalInfo.github" target="_blank">
					<v-icon :color="isDarkTheme ? 'white' : 'black'">mdi-github</v-icon>
					{{ personalInfo.github.replace("https://", "") }}
				</a>
				<a :href="personalInfo.website" target="_blank">
					<v-icon color="indigo">mdi-web</v-icon>
					{{ personalInfo.website.replace("https://", "") }}
				</a>
				<a :href="personalInfo.devto" target="_blank" class="list">
					<v-img :src="getAssetUrl('devto.png')" width="25"/>
					{{ personalInfo.devto.replace("https://", "") }}
				</a>
			</div>

			<h2 class="pt-4">Summary</h2>
			<v-divider class="mb-2" />
			<p>
				{{ personalInfo.summary }}
			</p>

			<h2 class="pt-4">Experience</h2>
			<v-divider class="mb-2" />
			<div v-for="(experience, index) in experiences" :key="experience.company" class="mb-4">
				<h3>
					{{index + 1}}. {{ experience.company }}
					<a :href="experience.companyUrl" target="_blank" :title="experience.company">
						<v-icon size="x-small">mdi-open-in-new</v-icon>
					</a>
				</h3>
				<v-divider />
				<span></span>
				<h4>{{ experience.roles.join(", ") }}</h4>
				<p class="mb-2">
					{{ experience.startDate }} - {{ experience.endDate }}
				</p>
				<h3>Achievements</h3>
				<v-divider class="mb-2" />
				<ul>
					<li v-for="task in experience.achievements" :key="task" v-html="task"/>
				</ul>
				<h3 class="pt-2">Projects</h3>
				<v-divider class="pb-2" />
				<div v-for="(project, index) in experience.projects" :key="index">
					<h4>
						<v-icon>mdi-chevron-right</v-icon>
						{{ project.name }}
					</h4>
					<p>{{ project.description }}</p>
					<h4 class="py-2">Jobs:</h4>
					<ul class="mb-3">
						<li v-for="task in project.job" :key="task" v-html="task"/>
					</ul>
				</div>
			</div>

			<h2 class="pt-4">Works</h2>
			<hr class="mb-2">
			<div v-for="(work, index) in works" :key="work.title" class="mb-4">
				<h3>{{index + 1}}. {{ work.title }}</h3>
				<v-divider class="mb-2" />
				<p class="mb-2">
					{{ work.description }}
				</p>
				<ul class="mb-3">
					<h3>Technologies:</h3>
					<v-divider />
					<li v-for="tech in work.technologies" :key="tech" v-html="tech"/>
				</ul>
				<ul>
					<h3>Links:</h3>
					<v-divider class="mb-2" />
					<li v-for="[key, value] in Object.entries(work.links)"
							:key="key"
					>
						<a :href="value" target="_blank" class="text-capitalize">
							{{ key }}
							<v-icon size="small">mdi-open-in-new</v-icon>
						</a>
					</li>
				</ul>
			</div>

			<h2 class="pt-4">Technologies</h2>
			<v-divider class="mb-2" />
			<div v-for="technology in technologies" :key="technology.name" class="mb-4">
				<h3><v-icon>mdi-chevron-right</v-icon>{{ technology.name }}</h3>
				<v-divider />
				<ul>
					<li v-for="(tech, index) in technology.tools" :key="index">
						{{ tech.tooltip }}
					</li>
				</ul>
			</div>
		</div>
		<v-divider/>
		<v-footer class="d-flex justify-space-between">
			<div>
				kiranparajuli.com.np
			</div>
			<div>
				All rights reserved &copy; {{ new Date().getFullYear() }}
			</div>
		</v-footer>
	</div>
</template>
<script setup lang="ts">
import Resume from "@/utils/resume"
import {onMounted} from "vue"
import {getAssetUrl} from "@/utils/helper"
import {useAppStore} from "~/store/app";
import {storeToRefs} from "pinia";

const appStore = useAppStore()
const {isDarkTheme} = storeToRefs(appStore)

const personalInfo = Resume.personalInfo
const experiences = Resume.experiences
const works = Resume.works
const technologies = Resume.technologies

onMounted(() => {
	setTimeout(() => {
		window.print()
	}, 1000)
})
</script>
<style lang="scss">
.resume-pdf {
	padding: .5rem;
	font-size: .875rem;
	max-width: 1000px;
	margin: 0 auto;

	.p-list {
		display: flex;
		gap: .5rem;
		flex-wrap: wrap;
		align-items: center;

		a {
			color: #0e62c0;
		}
	}

	ul > li {
		margin-left: 1rem;
	}
}
</style>
