<template>
	<div class="resume">
		<h1 class="mb-10 pt-12">Resume</h1>
		<h2>Tools I Use</h2>
		<div class="section-divider" />
		<p class="mb-7">These are, but not limited to, the techs I use for different services.</p>
		<v-card v-for="tech in Techs" :key="tech.name"
			class="mb-4" variant="outlined"
		>
			<v-card-title>{{tech.name}}</v-card-title>
			<v-divider />
			<v-card-text>
				<ItemList :items="tech.tools" :max-items-in-a-column="tech.maxItemsInAColumn" />
			</v-card-text>
		</v-card>
		<div class="py-12" />
		<ExperienceSection />
	</div>
</template>
<script setup lang="ts">
import {Technology} from "@/customTypes"
import ItemList from "@/components/home/ItemList.vue"
import ExperienceSection from "@/components/home/ExperienceSection.vue"

const Techs: Technology[] = [
	{
		name: "Frontend Development",
		tools: [
			"HTML",
			"CSS",
			"JavaScript",
			"Vue.js",
			"Vuetify",
			"Figma",
		],
		maxItemsInAColumn: 3
	},
	{
		name: "Backend Development",
		tools: [
			"Python",
			"Django",
			"Node.js",
			"Express.js",
			"PostgreSQL",
			"Redis",
			"Websockets",
			"GraphQL",
			"Djangorestframework",
		],
		maxItemsInAColumn: 3
	},
	{
		name: "Quality Assurance",
		tools: [
			"Behat",
			"Behat Mink",
			"CodeceptJs",
			"CypressJs",
			"NightwatchJs",
			"Jest",
			"PHPUnit",
			"Playwright",
			"Postman",
			"Vue Unit Tests",
			"Locust",
			"GitHub Actions",
			"GitLab CI",
			"GitHub CI",
			"Travis CI",
			"Drone CI",
		]
	},
	{
		name: "DevOps",
		tools: [
			"Docker",
			"CPanel",
			"VPS",
			"Nginx",
			"Apache",
		],
		maxItemsInAColumn: 2
	}
]
</script>
