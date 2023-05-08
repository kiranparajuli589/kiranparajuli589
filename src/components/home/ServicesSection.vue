<template>
	<div class="home--services">
		<h1 class="section-title">What can I do?</h1>
		<div class="section-subtitle">Service Offers</div>
		<div class="section-divider" />
		<v-card v-for="service in services"
			:key="service.name" elevation="4"
			variant="elevated" class="mb-12"
		>
			<v-card-title class="list py-4">
				<v-icon :color="service.iconColor">mdi-{{service.icon}}</v-icon>
				<h2>{{service.name}}</h2>
				<v-chip color="red">Experience: <span class="exp">{{service.experience}}</span> years</v-chip>
			</v-card-title>
			<v-card-text>
				{{service.description}}
			</v-card-text>
			<v-card-text class="list">
				<v-icon size="small">mdi-tools</v-icon>
				<h3>Technologies:</h3>
			</v-card-text>
			<v-card-text class="tech-list">
				<div class="chip"
					v-for="tech in service.techs"
					:key="tech"
				>
					{{tech}}
				</div>
			</v-card-text>
			<v-card-text class="list" v-if="service.types">
				<v-icon size="22">mdi-format-list-bulleted-type</v-icon>
				<h3>Types:</h3>
			</v-card-text>
			<v-card-text v-if="service.types" class="type-list">
				<div class="chip"
					v-for="type in service.types"
					:key="type"
				>
					{{type}}
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>
<script setup lang="ts">
type Service = {
	name: string;
	description: string;
	icon: string;
	techs: string[];

	types?: string[],
	experience: number;
	iconColor: string;
}

const services: Service[] = [
	{
		name: "Frontend Development",
		description: "I can build a responsive and interactive frontend for your application." +
			" I'm not the best designer you can hire but I can implement complex designs.",
		icon: "web-box", iconColor: "primary",
		techs: [
			"HTML",
			"CSS",
			"JavaScript",
			"Vue.js",
			"Vuetify",
			"Figma",
		],
		experience: new Date().getFullYear() - 2018,
	},
	{
		name: "Backend Development",
		description: "I have been working with different technologies to build a scalable and secure backend." +
			" I can build REST APIs and Websokets for your application." +
			" I have few experience in microservices architecture too." +
			" For the advanced part, I can do more engineering over Data Structure operations," +
			" Query Optimizations and more.",
		icon: "server", iconColor: "indigo",
		techs: [
			"Python",
			"Django",
			"Djangorestframework",
			"Node.js",
			"Express.js",
			"PostgreSQL",
			"Redis",
			"Websockets",
			"GraphQL",
		],
		experience: new Date().getFullYear() - 2018,
	},
	{
		name: "QA Automation",
		description: "I can write automated tests for your application." +
			" We can work together to increase your test coverage, reduce flakiness," +
			" implement CI/CD, optimize CI/CD pipelines and many more.",
		icon: "lightbulb-auto", iconColor: "green",
		techs: [
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
			"Locusts",
			"GitHub Actions",
			"GitLab CI",
			"GitHub CI",
			"Travis CI",
			"Drone CI",
		],
		types: [
			"Smoke Testing",
			"Regression Testing",
			"API Testing",
			"UI Testing",
			"Performance Testing",
			"Security Testing",
			"Load Testing",
			"Integration Testing",
			"Unit Testing",
			"Continuous Integration",
			"Continuous Deployment",
		],
		experience: new Date().getFullYear() - 2019,
	},
	{
		name: "DevOps",
		description: "I have few years of experience in DevOps, I can deploy your web application to the cloud and organize load balancing for clients or servers." +
			" I can also create and maintain CI/CD pipelines for your application.",
		icon: "cloud", iconColor: "grey",
		techs: [
			"Docker",
			"CPanel",
			"VPS",
			"Nginx",
			"Apache",
		],
		experience: new Date().getFullYear() - 2020,
	}
]
</script>
