<template>
	<div class="home--experience">
		<h1 class="section-title">My Experiences</h1>
		<div class="section-subtitle">Where I had been engaged.</div>
		<div class="section-divider" />
		<v-card v-for="exp in experiences" :key="exp.company" class="mb-8">
			<v-card-title class="list">
				<v-avatar :image="exp.companyLogo" size="60" />
				<h3>{{exp.company}}</h3>
				<a :href="exp.companyUrl" target="_blank" :title="exp.company">
					<v-icon size="x-small">mdi-open-in-new</v-icon>
				</a>
			</v-card-title>
			<v-card-subtitle>
				{{exp.roles.join(', ')}}
				<span class="mx-2">|</span>
				{{exp.startDate}} - {{exp.endDate}}
			</v-card-subtitle>
			<v-card-text>
				{{exp.description}}
			</v-card-text>
			<v-card-text>
				<h2 class="mb-4">Achievements:</h2>
				<ItemList :items="exp.achievements" no-split />
			</v-card-text>
			<v-card-text>
				<h2 class="mb-4">Projects:</h2>
				<v-card v-for="proj in exp.projects"
								:key="proj.name" class="mb-4" variant="outlined"
				>
					<v-card-title class="list">
						<h4>{{proj.name}}</h4>
						<a :href="proj.url" target="_blank" :title="proj.name">
							<v-icon size="x-small">mdi-open-in-new</v-icon>
						</a>
					</v-card-title>
					<v-card-text>{{proj.description}}</v-card-text>
					<v-card-text>
						<h3 class="mb-3">Responsibilities:</h3>
						<ItemList :items="proj.job" no-split />
					</v-card-text>
				</v-card>
			</v-card-text>
		</v-card>
	</div>
</template>
<script setup lang="ts">
import Resume from "@/resume"
import ItemList from "@/components/home/ItemList.vue"
const experiences = Resume.experiences
</script>
