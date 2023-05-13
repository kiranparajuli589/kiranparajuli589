<template>
	<div class="resume">
		<h1 class="mb-10 pt-12">
			Resume
			<v-chip color="primary" @click="downloadPdf"
				title="Download a copy of my resume"
			>
				<v-icon>mdi-download</v-icon>

				<span class="px-1 font-weight-bold">Download Pdf</span>
			</v-chip>
		</h1>
		<h2>Tools I Use</h2>
		<div class="section-divider" />
		<p class="mb-7">These are, but not limited to, the techs I use for different services.</p>
		<i class=" colored" />

		<v-card v-for="tech in Techs" :key="tech.name"
			class="mb-4" variant="outlined"
		>
			<v-card-title>{{tech.name}}</v-card-title>
			<v-divider />
			<v-card-text class="tech-list">
				<div v-for="(tool, index) in tech.tools" :key="index" :title="tool.tooltip">
					<i v-if="tool.class" class="colored" :class="tool.class" />
					<img v-if="tool.image" :src="getAssetUrl(tool.image)" />
				</div>
			</v-card-text>
		</v-card>
		<div class="py-12" />
		<ExperienceSection />
	</div>
</template>
<script setup lang="ts">
import {Technology} from "@/customTypes"
import ExperienceSection from "@/components/home/ExperienceSection.vue"
import {getAssetUrl} from "@/helper"

const Techs: Technology[] = [
	{
		name: "Frontend Development",
		tools: [
			{class: "devicon-html5-plain-wordmark", tooltip: "HTML5"},
			{class: "devicon-css3-plain-wordmark", tooltip: "CSS3"},
			{class: "devicon-javascript-plain", tooltip: "JavaScript"},
			{class: "devicon-vuejs-plain-wordmark", tooltip: "VueJS"},
			{class: "devicon-vuetify-line", tooltip: "Vuetify"},
			{class: "devicon-figma-plain-wordmark", tooltip: "Figma"},
		],
	},
	{
		name: "Backend Development",
		tools: [
			{ class: "devicon-python-plain", tooltip: "Python"},
			{ class: "devicon-django-plain", tooltip: "Django"},
			{ class: "devicon-nodejs-plain", tooltip: "NodeJS"},
			{ class: "devicon-postgresql-plain-wordmark", tooltip: "PostgreSQL"},
			{ class: "devicon-mysql-plain-wordmark", tooltip: "MySQL"},
			{ class: "devicon-redis-plain-wordmark", tooltip: "Redis"},
			{ tooltip: "Websockets", image: "websockets.png"},
			{ tooltip: "Djangorestframework", image: "drf.png"},
		],
	},
	{
		name: "Quality Assurance",
		tools: [
			{tooltip: "Behat", image: "behat.png"},
			{tooltip: "CypressJs", image: "cypress.png"},
			{tooltip: "NightwatchJs", image: "nightwatchjs.png"},
			{class: "devicon-jest-plain",tooltip: "Jest"},
			{tooltip: "PHPUnit", image: "phpunit.png"},
			{tooltip: "Playwright", image: "playwright.png"},
			{tooltip: "Postman", image: "postman.svg"},
			{class: "devicon-vuejs-plain-wordmark", tooltip: "Vue Unit Tests"},
			{tooltip: "Locust", image: "locust.jpeg"},
			{class: "devicon-gitlab-original-wordmark", tooltip: "GitLab CI"},
			{class: "devicon-github-original-wordmark", tooltip: "GitHub CI"},
			{tooltip: "Drone CI", image: "droneci.png"},
		]
	},
	{
		name: "DevOps",
		tools: [
			{class: "devicon-docker-plain-wordmark", tooltip: "Docker"},
			{image: "CPanel.png", tooltip: "Cpanel"},
			{image: "vps.png", tooltip: "VPS"},
			{class: "devicon-nginx-plain-wordmark", tooltip: "Nginx"},
			{class: "devicon-apache-plain-wordmark", tooltip: "Apache"},
		],
	}
]

const downloadPdf = () => {

}
</script>
<style lang="scss">
.tech-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	i {
		font-size: 4rem;
	}
	img {
		width: 4rem;
		height: auto;
	}
	filter: grayscale(1);
	&:hover {
		filter: grayscale(0);
	}
}
div[title='Behat'] {
	img {
		height: 3.8rem;
		width: 3rem;
	}
}
body.dark {
	div[title='Behat'], div[title='VPS'] {
		filter: invert(1);
	}
}
</style>
