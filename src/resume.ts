import { Experience, Service, Technology, Work, Education } from "./customTypes";

interface ResumeInterface {
	personalInfo: { [key: string]: string },
	experiences: Experience[],
	works: Work[],
	services: Service[],
	technologies: Technology[],
	education: Education[]
}

const Resume: ResumeInterface = {
	personalInfo: {
		name: "Kiran Parajuli",
		role: "Software Engineer",
		municipality: "Panchkhal, Kavre",
		country: "Nepal",
		postalCode: "45200",
		phone: "+977 984-3530425",
		email: "kiranparajuli589@gmail.com",
		devto: "https://dev.to/kiranparajuli589",
		linkedin: "https://linkedin.com/in/kiranparajuli589",
		github: "https://github.com/kiranparajuli589",
		website: "https://kiranparajuli.com.np",
		bio: "Full Stack Developer, QA Automation Engineer, and Tech Enthusiast",
		summary: "Experienced software engineer specializing in full stack development and quality assurance. Proficient in Python, PHP, and Node.js for backend services, and skilled in modern frontend technologies including React.js and Vue.js. Adept at creating sophisticated web designs and implementing comprehensive testing frameworks. Strong focus on delivering high-quality results through attention to detail. Enthusiastic about collaboration and innovation.",
		summaryQa: "Results-driven Quality Assurance Engineer with expertise in WebUI, API, CLI, Unit, and E2E testing. Skilled in planning, writing, and maintaining test cases. Passionate about mentoring and continuous improvement within teams. Utilizes music and creative outlets to stay inspired."
	},
	experiences: [
		{
			company: "ourBuddy.ai",
			description: "A cutting-edge SaaS platform tailored for insurance brokerages.",
			roles: ["Senior Frontend Engineer"],
			startDate: "2024",
			endDate: "Present",
			technologies: [
				"React.js", "Next.js", "JavaScript", "Docker", "Docker Compose",
				"Playwright", "Postman", "Figma", "ClickUp"
			],
			achievements: [
				"Led a team of 5 developers to deliver high-quality software solutions.",
				"Implemented streamlined task management and sprint planning using ClickUp.",
				"Engineered a browser-based recording system for seamless audio, video, and screen capture.",
				"Modernized legacy systems with React, Next.js, and Docker, enhancing platform performance.",
				"Oversaw release processes to ensure smooth product deployments.",
				"Developed a robust testing framework to maintain product reliability.",
				"Optimized CI/CD pipelines, automating build and test processes."
			],
			companyUrl: "https://www.ourbuddy.ai",
			companyLogo: "ourBuddy.png",
			projects: [
				{
					name: "Browser-Based Recording System",
					description: "Engineered a versatile recording system for audio, video, and screen capture.",
					job: [
						"Built a responsive frontend using React and Next.js.",
						"Integrated recording functionalities using Playwright.",
						"Maintained CI/CD pipelines for continuous testing and builds."
					],
				},
				{
					name: "ourBuddy.ai Platform",
					description: "Designed a comprehensive SaaS platform for insurance brokerages.",
					job: [
						"Built and maintained the frontend with React and Next.js.",
						"Enhanced CI/CD pipelines for efficient deployments.",
						"Revamped an outdated system with modern technologies.",
						"Authored detailed documentation for knowledge sharing."
					],
				},
				{
					name: "Astral Nexus",
					description: "A client management system with activity logs and site blogs.",
					job: [
						"Developed a dynamic frontend using React and Next.js.",
						"Built the backend using Python (FastAPI) for data management."
					],
				},
				{
					name: "Quality Assurance",
					description: "Established a meticulous QA process for the ourBuddy.ai platform.",
					job: [
						"Developed and maintained a robust testing framework.",
						"Optimized CI/CD pipelines for automated testing.",
						"Conducted QA workshops to enhance team skills.",
						"Created detailed test documentation."
					]
				}
			]
		},
		{
			company: "12iD",
			description: "Leading multi-authentication solution for digital identity and user identification.",
			roles: ["Senior Quality Assurance Engineer"],
			startDate: "2023",
			endDate: "2024",
			technologies: [
				"Jest", "Cucumber.js", "Playwright", "Express.js", "Node.js",
				"React.js", "Hyperledger", "Python", "GitHub", "Notion"
			],
			achievements: [
				"Developed and maintained a comprehensive testing framework.",
				"Implemented CI/CD pipelines to streamline build and testing automation.",
				"Designed a load-testing framework to ensure optimal system performance.",
				"Collaborated with cross-functional teams to enhance product quality.",
				"Led a workshop on Automation Testing with Playwright.",
				"Delivered system demos to stakeholders and clients.",
				"Effectively managed tasks in a hybrid work environment."
			],
			companyUrl: "https://www.12id.com",
			companyLogo: "12iD.png",
			projects: [
				{
					name: "Unit Testing of Microservices",
					description: "Ensured microservice integrity through unit testing.",
					job: [
						"Developed unit tests for microservice functionality validation.",
						"Maintained CI/CD pipelines for consistent builds and testing.",
						"Automated product release processes."
					],
				},
				{
					name: "Load Testing of the 12iD System",
					description: "Validated system performance under various load conditions.",
					job: [
						"Created and executed load tests.",
						"Maintained CI/CD pipelines for performance assessments.",
						"Optimized release processes for better load management."
					],
				},
				{
					name: "E2E Testing of the 12iD System",
					description: "Verified end-to-end functionalities for user experience.",
					job: [
						"Developed E2E tests across system components.",
						"Integrated CI/CD pipelines for consistent E2E testing.",
						"Automated release processes for reliability."
					],
				}
			]
		},
		{
			company: "JankariTech Pvt. Ltd.",
			description: "An IT company specializing in test automation solutions.",
			roles: ["Software Developer", "Junior Programmer"],
			startDate: "2019",
			endDate: "2023",
			technologies: [
				"Playwright", "Behat", "NightwatchJs", "PhpUnit", "Postman", "GitHub",
				"GitLab", "DroneCI", "TravisCI", "Cypress", "NodeJS", "Python", "PHP",
				"VueJs", "Regex", "Bash"
			],
			achievements: [
				"Developed web UI, API, CLI, E2E, and unit tests across various projects.",
				"Authored and maintained comprehensive test documentation.",
				"Built and maintained CI/CD pipelines for daily test executions.",
				"Mentored team members on unit and E2E test writing.",
				"Organized workshops on automation testing using Playwright.",
				"Led weekly training sessions on technologies like Cypress, WebSockets, and VueJS.",
				"Developed a blog website for internal knowledge sharing."
			],
			companyUrl: "https://www.jankaritech.com",
			companyLogo: "jankaritech.jpg",
			projects: [
				{
					name: "QA with Owncloud",
					description: "Provided open-source software for content collaboration.",
					job: [
						"Implemented web UI, API, E2E, and unit tests for new features and bug fixes.",
						"Maintained CI/CD pipelines for consistent test coverage.",
						"Enhanced testing infrastructure for better performance."
					],
					url: "https://owncloud.com"
				},
				{
					name: "Integration app for OpenProject and Nextcloud",
					description: "Synced files and folders between Nextcloud and OpenProject.",
					job: [
						"Implemented feature designs for the integration app.",
						"Developed backend functionalities using Node.js.",
						"Wrote unit and E2E tests for added features."
					],
					url: "https://github.com/nextcloud/integration_openproject"
				},
				{
					name: "E2E Tests Workshop with the Programiz Team",
					description: "Enhanced testing skills within the Programiz team.",
					job: [
						"Wrote E2E tests for Programiz Pro features.",
						"Organized workshops to guide on best practices for UI tests."
					],
					url: "https://www.programiz.com/"
				}
			]
		}
	],
	works: [
		{
			title: "RentShare",
			description: "A platform to facilitate rent payments and sharing among roommates.",
			thumbnail: "rentShare.png",
			technologies: ["VueJs", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				github: "https://github.com/rent-share",
				demo: "https://irental.netlify.app/"
			}
		}
	],
	services: [
		{
			name: "Frontend Development",
			description: "Build responsive, interactive frontends for sophisticated web applications.",
			icon: "web-box", iconColor: "primary",
			experience: new Date().getFullYear() - 2018,
		},
		{
			name: "Backend Development",
			description: "Develop scalable, secure backend solutions, including REST APIs and Websockets.",
			icon: "server", iconColor: "indigo",
			experience: new Date().getFullYear() - 2018,
		},
		{
			name: "QA Automation",
			description: "Implement comprehensive automated testing to ensure high product quality.",
			icon: "lightbulb-auto", iconColor: "green",
			types: [
				"Smoke Testing", "Regression Testing", "API Testing", "UI Testing",
				"Performance Testing", "Security Testing", "Load Testing", "Integration Testing",
				"Unit Testing", "Continuous Integration", "Continuous Deployment"
			],
			experience: new Date().getFullYear() - 2019,
		},
		{
			name: "DevOps",
			description: "Deploy web applications to the cloud and maintain efficient CI/CD pipelines.",
			icon: "cloud", iconColor: "grey",
			experience: new Date().getFullYear() - 2020,
		}
	],
	technologies: [
		{
			name: "Quality Assurance",
			tools: [
				{ tooltip: "Behat", image: "behat.png" },
				{ tooltip: "CypressJs", image: "cypress.png" },
				{ tooltip: "NightwatchJs", image: "nightwatchjs.png" },
				{ class: "devicon-jest-plain", tooltip: "Jest" },
				{ tooltip: "PHPUnit", image: "phpunit.png" },
				{ tooltip: "Playwright", image: "playwright.png" },
				{ tooltip: "Postman", image: "postman.svg" }
			]
		}
	],
	education: [
		{
			name: "Paschimanchal Engineering Campus",
			degree: "Bachelor's Degree in Computer Engineering",
			startDate: "2017",
			endDate: "2021"
		},
		{
			name: "Nist Banepa",
			degree: "High School in Science (Maths)",
			startDate: "2015",
			endDate: "2017"
		}
	]
};

export default Resume;
