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
import {Experience} from "@/customTypes"
import ItemList from "@/components/home/ItemList.vue"

const experiences: Experience[] = [
	{
		company: "JankariTech Pvt. Ltd.",
		description: "An IT company situated at Pokhara, Nepal and specializes in helping customers set up test automation.",
		roles: ["Software Developer", "Junior Programmer"],
		startDate: "2019",
		endDate: "2022",
		technologies: [
			"VueJs", "Vue Unit Tests",
			"Playwright", "Behat", "PhpUnit",
			"NightwatchJs", "GitHub", "GithubCI",
			"DroneCI"
		],
		achievements: [
			"A blog website for the JankariTech peoples using markdowns and VueJS.",
			"Help peoples from Programiz team to write unit and e2e tests for their website.",
			"Organize a workshop on Automation Testing using Playwright.",
			"Run weekly trainings about different technologies like Websockets, VueJS, Playwright, etc.",
			"Colab with the fellow programmers to get more quality test infrastructures.",
		],
		companyUrl: "www.jankaritech.com",
		companyLogo: "https://scontent.fpkr1-1.fna.fbcdn.net/v/t1.6435-1/162117560_191427782781785_7284501706623852323_n.jpg?stp=dst-jpg_p320x320&_nc_cat=111&ccb=1-7&_nc_sid=c6021c&_nc_ohc=deTdfoGevOYAX9q18Zo&_nc_ht=scontent.fpkr1-1.fna&oh=00_AfB3vZ6YR9sCn-SL1S5bxZEdWnFjAO0rZaScWYD6Eglc7g&oe=648195C0",
		projects: [
			{
				name: "Owncloud",
				description: "'ownCloud' develops and provides open-source software for content collaboration, allowing teams to easily share and work on files seamlessly regardless of device or location.",
				job: [
					"Write e2e and unit tests for new features added or bugs fixed.",
					"Maintain CI/CD pipelines for the daily running builds or tests.",
					"Automate the product release processes",
					"Build necessary test infrastructures like 'test-middleware', 'testing-app' for better test coverage and performance",
				],
				url: "https://owncloud.com"
			}, {
				name: "Integration app for OpenProject and Nextcloud",
				description: "An integration app for OpenProject and Nextcloud to sync the files and folders" +
					" from Nextcloud to the work-packages in the OpenProject application..",
				job: [
					"Implement the designs for the features in the Nextcloud integration app.",
					"Write backend for the nextcloud integration app to implement searches, database actions and OAuth.",
					"Write e2e and unit tests for the new features added or bugs fixed.",
					"Maintain CI/CD pipelines for the daily running builds or tests.",
				],
				url: "https://github.com/nextcloud/integration_openproject"
			}, {
				name: "Programiz",
				description: "'Programiz' helps to learn program with their beginner-friendly tutorials and examples",
				job: [
					"Write e2e tests for the new Programiz Pro features.",
					"Maintain UI test infrastructure to be completely independent of the backend service",
					"Organize a workshop on Automation Testing using Playwright to help Programiz team to write better tests.",
				],
				url: "https://www.programiz.com/"
			}, {
				name: "My Second Teacher",
				description: "'My Second Teacher' is an online learning platform for students to learn from the best teachers in Nepal.",
				job: [
					"Write e2e tests for the different features (B2B, B2C) of the website.",
					"Maintain CI/CD pipelines for the daily running builds or tests.",
				],
				url: "https://www.mysecondteacher.com/"
			}
		]
	},
	{
		company: "Tech Himalaya",
		companyLogo: "https://kaha6.com/wp-content/uploads/Tech-Himalaya-1024x1024.png",
		companyUrl: "https://techhimalaya.com/",
		roles: ["Freelance Frontend Developer"],
		description: "'Tech Himalaya' is a Nepal's leading IT Company dealing with all sorts of Software, Hardware and Cloud Solutions.",
		startDate: "2019",
		endDate: "2020",
		achievements: [
			"Learnt to work with a remote team and manage the time to complete the tasks.",
			"Learnt better strategies to implement websites using VueJS (concept of mixins)."
		],
		projects: [
			{
				name: "Leave Management Dashboard",
				description: "A dashboard for a company to manage their employees' leaves.",
				job: [
					"Developed the frontend using VueJS and Vuetify",
				]
			},
			{
				name: "Bit Coins Survey",
				description: "A survey website for different Bit Coins.",
				job: [
					"Developed the frontend using VueJS and Vuetify",
				]
			}
		]
	},
	{
		company: "Nipuna Prabidhik Sewa",
		description: "Nipuna Prabidhik Sewa is a technology service provider specializing in Web Cloud, Professional, and Managed Services.",
		roles: ["Software Developer Internship"],
		startDate: "2018",
		endDate: "2019",
		technologies: [
			"Python", "Django", "HTML", "CSS", "JS", "Ajax", "JQuery", "Bootstrap", "MySQL", "Git"
		],
		achievements: [
			"Developed a inventory management system for a small retailer shop",
			"Developed a attendance system using Raspberry Pi for the company",
		],
		projects: [
			{
				name: "Inventory Management System",
				description: "A web application for a small retailer shop to manage their inventory.",
				job: [
					"Cart system for the customers to buy products",
					"Admin panel to manage the products, customers, orders, etc.",
					"Generate reports for the sales, orders, etc.",
				],
				url: "",
			}, {
				name: "Attendance System",
				description: "A web application to manage the attendance of the employees using RPi and a fingerprint module.",
				job: [
					"Collect daily attendance of the employees using fingerprint module",
					"Generate reports for the attendance of the employees",
				]
			}
		],
		companyLogo: "https://nipunasewa.com/wp-content/uploads/2020/01/nipuna-prabidhik-sewa.png",
		companyUrl: "https://www.nipunasewa.com/",
	}
]
</script>
