<template>
	<div class="resume-pdf">
		<div class="pdf">
			<h1>{{ personalInfo.name }}
			</h1>
			<h4>{{ personalInfo.role }}</h4>
			<p>
				<v-icon>mdi-phone</v-icon>
				{{ personalInfo.phone }}
				<v-icon>mdi-at</v-icon>
				{{ personalInfo.email }}
				<v-icon>mdi-map-marker</v-icon>
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
					<v-icon color="black">mdi-github</v-icon>
					{{ personalInfo.github.replace("https://", "") }}
				</a>
				<a :href="personalInfo.website" target="_blank">
					<v-icon color="indigo">mdi-web</v-icon>
					{{ personalInfo.website.replace("https://", "") }}
				</a>
				<a :href="personalInfo.devto" target="_blank" class="dev-to-link">
					<v-img src="@/assets/devto.png" width="25"/>
					{{ personalInfo.devto.replace("https://", "") }}
				</a>
			</div>

			<h2 class="pt-4">Summary</h2>
			<divider class="mb-2" height="2" />
			<p>
				{{ personalInfo.summary }}
			</p>

			<h2 class="pt-4">Works</h2>
			<divider class="mb-2" height="2" />

			<div v-for="(work, index) in works" :key="work.title" class="mb-6">
				<h3>{{index + 1}}. {{ work.title }}</h3>
				<divider class="mb-2" />
				<p class="mb-2">
					{{ work.description }}
				</p>
				<div class="list mb-2">
					<strong>Links:</strong>
					<template v-for="[key, value] in Object.entries(work.links)" :key="key">
						<a :href="value" target="_blank" class="text-capitalize">
							{{ key }}
							<v-icon size="small">mdi-open-in-new</v-icon>
						</a>
					</template>
				</div>
				<ul class="mb-3">
					<h3>Technologies:</h3>
					<v-divider />
					<ItemList :items="work.technologies" />
				</ul>
			</div>

			<h2 class="pt-4">Experience</h2>
			<divider class="mb-2" height="2" />
			<div v-for="(experience, index) in experiences" :key="experience.company" class="mb-4">
				<h3>
					{{index + 1}}. {{ experience.company }}
					<a :href="experience.companyUrl" target="_blank" :title="experience.company">
						<v-icon size="x-small">mdi-open-in-new</v-icon>
					</a>
				</h3>
				<divider />
				<div class="mb-2">
					<div title="Role" class="role">{{ experience.roles.join(", ") }} ({{ experience.startDate }} - {{ experience.endDate }})</div>
				</div>
				<h3>Achievements</h3>
				<v-divider class="mb-2" />
				<ul>
					<li v-for="task in experience.achievements" :key="task" v-html="task"/>
				</ul>
				<h3 class="pt-2">Projects</h3>
				<v-divider class="pb-2" />
				<div v-for="(project, index) in experience.projects" :key="index">
					<h4>
						{{index + 1}}. {{ project.name }}
					</h4>
					<p>{{ project.description }}</p>
					<h4 class="py-2">
						{{ experience.company === 'JankariTech Pvt. Ltd.' ? 'Jobs' : 'Main Features' }}:
					</h4>
					<ul class="mb-3">
						<li v-for="task in project.job" :key="task" v-html="task"/>
					</ul>
				</div>

				<h3 class="pt-2">Tools and Technologies</h3>
				<v-divider class="pb-2" />

				<ItemList :items="experience.technologies" />
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
import Resume from "@/resume"
import {onMounted} from "vue"
import Divider from "@/components/Divider.vue"
import ItemList from "@/components/home/ItemList.vue"

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
	.dev-to-link {
		display: flex; gap: .3rem;
	}
	.role {
		font-weight: 600;
	}
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
