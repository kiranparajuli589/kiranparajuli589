import { Experience, Service, Work } from "./customTypes"

interface ResumeInterface {
	personalInfo: {[key: string]: string},
	experiences: Experience[],
	works: Work[],
	services: Service[],
}

const Resume:ResumeInterface = {
	personalInfo: {
		name: "Kiran Parajuli",
		role: "Software Engineer",
		municipality: "Panchkhal, Kavre",
		country: "Nepal",
		postalCode: "45200",
		phone: "+977 984-3530425",
		email: "kiranparajuli589@gmail.com",
		devto: "https://dev.to/kiranparajuli589",
		linkedin: "https://www.linkedin.com/in/kiranparajuli589/",
		github: "https://www.github.com/kiranparajuli589/",
		bio: "Full Stack Developer, QA Automation Engineer, and a Tech Enthusiast"
	},
	experiences: [
		{
			company: "JankariTech Pvt. Ltd.",
			description: "An IT company situated at Pokhara, Nepal and specializes in helping customers set up test automation.",
			roles: [
				"Software Developer",
				"Junior Programmer"
			],
			startDate: "2019",
			endDate: "2022",
			technologies: [
				"VueJs",
				"Vue Unit Tests",
				"Playwright",
				"Behat",
				"PhpUnit",
				"NightwatchJs",
				"GitHub",
				"GithubCI",
				"DroneCI"
			],
			achievements: [
				"A blog website for the JankariTech peoples using markdowns and VueJS." +
				" <a href='https://blog.jankaritech.com' target='_blank' title='blog.jankaritech.com'>🔗</a>",
				"Help peoples from Programiz team to write unit and e2e tests for their website.",
				"Organize a workshop on Automation Testing using Playwright.",
				"Run weekly trainings about different technologies like Websockets, VueJS, Playwright, etc.",
				"Colab with the fellow programmers to get more quality test infrastructures."
			],
			companyUrl: "www.jankaritech.com",
			companyLogo: "jankaritech.jpg",
			projects: [
				{
					name: "QA with Owncloud",
					description: "'ownCloud' develops and provides open-source software for content collaboration, allowing teams to easily share and work on files seamlessly regardless of device or location.",
					job: [
						"Write e2e and unit tests for new features added or bugs fixed.",
						"Maintain CI/CD pipelines for the daily running builds or tests.",
						"Automate the product release processes",
						"Build necessary test infrastructures like 'test-middleware', 'testing-app' for better test coverage and performance"
					],
					url: "https://owncloud.com"
				},
				{
					name: "Integration app for OpenProject and Nextcloud",
					description: "An integration app for OpenProject and Nextcloud to sync the files and folders from Nextcloud to the work-packages in the OpenProject application..",
					job: [
						"Implement the designs for the features in the Nextcloud integration app.",
						"Write backend for the nextcloud integration app to implement searches, database actions and OAuth.",
						"Write e2e and unit tests for the new features added or bugs fixed.",
						"Maintain CI/CD pipelines for the daily running builds or tests."
					],
					url: "https://github.com/nextcloud/integration_openproject"
				},
				{
					name: "E2E Tests Workshop with the Programiz Team",
					description: "'Programiz' helps to learn program with their beginner-friendly tutorials and examples",
					job: [
						"Write e2e tests for the new Programiz Pro features.",
						"Maintain UI test infrastructure to be completely independent of the backend service",
						"Organize a workshop on Automation Testing using Playwright to help Programiz team to write better tests."
					],
					url: "https://www.programiz.com/"
				},
				{
					name: "E2E Tests for the My Second Teacher Website",
					description: "'My Second Teacher' is an online learning platform for students to learn from the best teachers in Nepal.",
					job: [
						"Write e2e tests for the different features (B2B, B2C) of the website.",
						"Maintain CI/CD pipelines for the daily running builds or tests."
					],
					url: "https://www.mysecondteacher.com/"
				}
			]
		},
		{
			company: "Tech Himalaya",
			companyLogo: "tech-himalaya.png",
			companyUrl: "https://techhimalaya.com/",
			roles: [
				"Freelance Frontend Developer"
			],
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
						"Developed the frontend using VueJS and Vuetify"
					]
				},
				{
					name: "Bit Coins Survey",
					description: "A survey website for different Bit Coins.",
					job: [
						"Developed the frontend using VueJS and Vuetify"
					]
				}
			]
		},
		{
			company: "Nipuna Prabidhik Sewa",
			description: "Nipuna Prabidhik Sewa is a technology service provider specializing in Web Cloud, Professional, and Managed Services.",
			roles: [
				"Software Developer Internship"
			],
			startDate: "2018",
			endDate: "2019",
			technologies: [
				"Python",
				"Django",
				"HTML",
				"CSS",
				"JS",
				"Ajax",
				"JQuery",
				"Bootstrap",
				"MySQL",
				"Git"
			],
			achievements: [
				"Developed a inventory management system for a small retailer shop",
				"Developed a attendance system using Raspberry Pi for the company"
			],
			projects: [
				{
					name: "Inventory Management System",
					description: "A web application for a small retailer shop to manage their inventory.",
					job: [
						"Cart system for the customers to buy products",
						"Admin panel to manage the products, customers, orders, etc.",
						"Generate reports for the sales, orders, etc."
					],
					url: ""
				},
				{
					name: "Attendance System",
					description: "A web application to manage the attendance of the employees using RPi and a fingerprint module.",
					job: [
						"Collect daily attendance of the employees using fingerprint module",
						"Generate reports for the attendance of the employees"
					]
				}
			],
			companyLogo: "nps.png",
			companyUrl: "https://www.nipunasewa.com/"
		}
	],
	works: [
		{
			title: "VueYtframe",
			description: "A Vue component to embed YouTube videos in your Vue app.",
			thumbnail: "vue-ytparser.png",
			technologies: [
				"VueJs",
				"Youtube Iframe API"
			],
			links: {
				github: "https://github.com/kiranparajuli589/vue3-ytframe",
				demo: "https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=getting-started",
				playground: "https://kiranparajuli589.github.io/vue3-ytframe/#/playground"
			}
		},
		{
			title: "Markdown Parser",
			description: "A simple yet powerful markdown parser for NodeJS or Javascript.",
			thumbnail: "markdown-parser.png",
			technologies: [
				"NodeJS",
				"Javascript",
				"Modular Programming",
				"Recursion"
			],
			links: {
				github: "https://github.com/kiranparajuli589/md-parser",
				demo: "https://kiranparajuli589.github.io/md-parser/"
			}
		},
		{
			title: "Sachchai Kendra Nepal",
			description: "A website for Sachchai Kendra Nepal, a non-profit religious organization.",
			thumbnail: "sachchai-kendra-nepal.png",
			technologies: [
				"Vue3",
				"Vuetify",
				"Djangorestframework",
				"MySQL"
			],
			links: {
				demo: "https://sachchaikendranepal.org.np/"
			}
		},
		{
			title: "FoodSwipe",
			description: "A food delivery e-commerce website with beautiful carts and powerful order & transaction management.",
			thumbnail: "foodswipe.png",
			technologies: [
				"Vue2",
				"Vuetify",
				"Djangorestframework",
				"MySQL"
			],
			links: {
				demo: "https://foodswipe.com.np/",
				github: "https://github.com/foodswipe"
			}
		},
		{
			title: "WordClub",
			description: "A reddit based social media website for writers and readers.",
			thumbnail: "wordclub.png",
			technologies: [
				"Vue2",
				"Vuetify",
				"Djangorestframework",
				"MySQL"
			],
			links: {
				github: "https://github.com/word-club",
				demo: "https://wordclub.com.np/"
			}
		},
		{
			title: "Bagmati Nepal Sports Website",
			description: "A website for Bagmati Nepal Sports Government, providing news and information about the current sports events.",
			thumbnail: "bagmati-nepal-sports.png",
			technologies: [
				"Vue2",
				"Vuetify",
				"Laravel",
				"MySQL"
			],
			links: {
				website: "https://sports.bagamati.gov.np/"
			}
		}
	],
	services: [
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
}

export default Resume
