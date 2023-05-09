<template>
	<div class="home--services">
		<h1 class="section-title">What can I do?</h1>
		<div class="section-subtitle">Service Offers</div>
		<div class="section-divider" />
		<div class="d-flex flex-wrap"  style="gap: 2rem;">
			<v-card v-for="service in services"
							:key="service.name" elevation="4"
							variant="elevated"
							max-width="460"
			>
				<v-card-title class="list py-4">
					<v-icon :color="service.iconColor">mdi-{{service.icon}}</v-icon>
					<h2>{{service.name}}</h2>
				</v-card-title>
				<v-card-text class="pt-0 experience">
					<p class="mb-1">Experience: <span class="exp">{{service.experience}}</span> years</p>
				</v-card-text>
				<!-- eslint-disable-next-line -->
				<v-card-text v-html="service.description" />
				<v-card-text v-if="service.types">
					<div class="list mb-3">
						<v-icon size="22">mdi-format-list-bulleted-type</v-icon>
						<h3>Types:</h3>
					</div>
					{{service.types.join(', ')}}.
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>
<script setup lang="ts">
import {Service} from "@/customTypes"

const services: Service[] = [
	{
		name: "Frontend Development",
		description: "I can build a responsive and interactive frontend for your web application." +
			" It is true that I am not the best designer you can hire, but I can implement complex" +
			" designs on your website.",
		icon: "web-box", iconColor: "primary",
		experience: new Date().getFullYear() - 2018,
	},
	{
		name: "Backend Development",
		description: "I have been working with different technologies to build a scalable and" +
			" secure backend. You can hire me to build REST APIs or Websockets for your application." +
			" I also have some experience with microservices architecture. The advanced part of my" +
			" work entails more engineering work relating to Data Structure operations, Query Optimization, and more.",
		icon: "server", iconColor: "indigo",
		experience: new Date().getFullYear() - 2018,
	},
	{
		name: "QA Automation",
		description: "I can write <b>automated tests</b> for your application." +
			" We can work together to increase test coverage of your application," +
			" reduce flakiness inside existing test cases and implement, maintain" +
			" and optimize the CI/CD pipelines.",
		icon: "lightbulb-auto", iconColor: "green",
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
		description: "I have few years of experience in DevOps, I can deploy your web application to the" +
			" cloud and organize load balancing for clients or servers." +
			" I can also create and maintain CI/CD pipelines for your application.",
		icon: "cloud", iconColor: "grey",
		experience: new Date().getFullYear() - 2020,
	}
]
</script>
