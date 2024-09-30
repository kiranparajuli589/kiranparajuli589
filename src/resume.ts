import { Experience, Service, Technology, Work, Education } from "./customTypes"

interface ResumeInterface {
	personalInfo: { [key: string]: string },
	experiences: Experience[],
	works: Work[],
	services: Service[],
	technologies: Technology[]
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
		bio: "Full Stack Developer, QA Automation Engineer, and a Tech Enthusiast",
		summary: "I'm a software developer and quality assurance engineer." +
			" My specialties include Python, PHP, and NodeJS for backend work and database management." +
			" I'm skilled in ReactJs VueJs, SaSS and Javascript for creating sophisticated web designs." +
			" I take great pride in my attention to detail and commitment to delivering high-quality results." +
			" When I'm not coding, I enjoy playing guitar and listening to music to stay inspired." +
			" I'm always eager to collaborate with others and help bring their visions to life.",
		summaryQa: "Highly motivated and results-oriented Quality Assurance Engineer with experience in WebUI, APIs, CLIs, Units, and E2E. Proficient at planning, writing, and maintaining test cases across multiple projects. Adept at mentoring team members for continuous improvement. Listen to music and play the guitar to find inspiration."
	},
	experiences: [
		{
			company: "ourBuddy.ai",
			description: "A cutting-edge SaaS platform designed for insurance brokerages.",
			roles: [
				"Senior Frontend Engineer",
			],
			startDate: "2024",
			endDate: "Present",
			technologies: [
				"React.js",
				"Next.js",
				"JavaScript",
				"Docker",
				"Docker Compose",
				"Playwright",
				"Postman",
				"Figma",
				"ClickUp",
			],
			achievements: [
				"Led a team of 5 developers to deliver high-quality software solutions, driving project success.",
				"Streamlined team task management and sprint planning using ClickUp for optimal project delivery.",
				"Developed a seamless browser-based recording system enabling audio, video, and screen capture.",
				"Modernized a legacy system using technologies like React, Next.js, and Docker, enhancing performance and user experience.",
				"Played an active role in the platform's release process, ensuring smooth deployments.",
				"Built a robust testing framework to elevate product quality and reliability.",
				"Implemented CI/CD pipelines, optimizing build and test automation processes."
			],
			companyUrl: "https://www.ourbuddy.ai",
			companyLogo: "ourBuddy.png",
			projects: [
				{
					name: "Browser-Based Recording System",
					description: "Developed a versatile recording system for audio, video, and screen captures.",
					job: [
						"Engineered the frontend using React and Next.js for a seamless user experience.",
						"Implemented the recording functionalities using Playwright for reliability.",
						"Maintained CI/CD pipelines to support continuous builds and testing."
					],
				},
				{
					name: "ourBuddy.ai Platform",
					description: "SaaS platform tailored for the insurance brokerage industry.",
					job: [
						"Built and maintained the platform's frontend with React and Next.js.",
						"Enhanced CI/CD pipelines, improving deployment efficiency.",
						"Revamped an outdated system using modern tech stack, boosting platform usability.",
						"Authored comprehensive documentation to facilitate knowledge sharing and onboarding."
					],
				},
				{
					name: "Astral Nexus",
					description: "A comprehensive client management system featuring profiles, activity logs, and site blogs.",
					job: [
						"Developed a responsive frontend using React and Next.js.",
						"Implemented the backend with Python (FastAPI) for efficient data handling."
					],
				},
				{
					name: "Quality Assurance",
					description: "Enhanced the platform's integrity through a meticulous testing process.",
					job: [
						"Built and maintained a robust testing framework to ensure platform reliability.",
						"Optimized CI/CD pipelines to streamline automated testing.",
						"Conducted skill-enhancement workshops for QA team members.",
						"Created detailed test documentation to support consistent testing practices."
					]
				}
			]
		},
		{
			company: "12iD",
			description: "A leading multi-authentication solution for digital identity issuance and unique end-user identification.",
			roles: [
				"Senior Quality Assurance Engineer"
			],
			startDate: "2023",
			endDate: "2024",
			technologies: [
				"Jest",
				"Cucumber.js",
				"Playwright",
				"Express.js",
				"Node.js",
				"React.js",
				"Hyperledger",
				"Python",
				"GitHub",
				"Notion"
			],
			achievements: [
				"Developed and maintained a robust testing framework for the 12iD identification system.",
				"Implemented and optimized CI/CD pipelines, improving build and test automation.",
				"Designed a load-testing framework to ensure system performance under varying conditions.",
				"Authored comprehensive test documentation for seamless knowledge transfer.",
				"Collaborated closely with developers and architects to enhance system quality and reliability.",
				"Conducted a workshop on Automation Testing with Playwright, empowering the team with UI testing skills.",
				"Presented system demos to stakeholders and potential clients, highlighting key functionalities.",
				"Managed tasks efficiently in a hybrid work environment to meet project deadlines."
			],
			companyUrl: "https://www.12id.com",
			companyLogo: "12iD.png",
			projects: [
				{
					name: "Unit Testing of Microservices",
					description: "Ensured the integrity of 12iD's microservices through comprehensive unit testing.",
					job: [
						"Developed unit tests to validate microservice functionalities.",
						"Maintained CI/CD pipelines for consistent build and test execution.",
						"Automated product release processes to streamline deployments."
					],
				},
				{
					name: "Load Testing of the 12iD System",
					description: "Validated the system's performance under various load conditions.",
					job: [
						"Created and executed load tests to evaluate system performance.",
						"Maintained CI/CD pipelines to ensure regular performance assessments.",
						"Enhanced product release processes for optimal load management."
					],
				},
				{
					name: "E2E Testing of the 12iD System",
					description: "Verified end-to-end functionalities to ensure seamless user experiences.",
					job: [
						"Developed E2E tests to validate system functionalities across components.",
						"Ensured continuous integration with CI/CD pipelines for consistent E2E testing.",
						"Automated release processes for efficient and reliable system deployment."
					],
				}
			]
		},
		{
			company: "JankariTech Pvt. Ltd.",
			description: "An IT company situated at Pokhara, Nepal and specializes in helping customers set up test automation.",
			roles: [
				"Software Developer",
				"Junior Programmer"
			],
			startDate: "2019",
			endDate: "2023",
			technologies: [
				"Playwright",
				"Behat",
				"NightwatchJs",
				"PhpUnit",
				"Postman",
				"GitHub",
				"GithubCI",
				"GitLab",
				"GitlabCI",
				"DroneCI",
				"TravisCI",
				"Cypress",
				"NodeJS",
				"Locust",
				"Python",
				"PHP",
				"Regex",
				"Bash",
				"VueJs",
				"Vue Unit Tests",
			],
			achievements: [
				"Write webUI, API, CLI, e2e and unit tests for various projects.",
				"Write and maintain various test documentations.",
				"Build and maintain CI/CD pipelines for the daily running builds or tests.",
				"Help peoples from the Programiz team to write unit and e2e tests for their website.",
				"Help organize a workshop on Automation Testing using Playwright.",
				"Run weekly trainings about different technologies like Cypress, Websockets, VueJS, Playwright, etc.",
				"Colab with the fellow programmers to get more quality test infrastructures.",
				"Remote work with the team and manage the time to complete the tasks.",
				"A blog website for the JankariTech peoples using markdowns and VueJS." +
				" <a href='https://blog.jankaritech.com' target='_blank' title='blog.jankaritech.com'>🔗</a>",
			],
			companyUrl: "www.jankaritech.com",
			companyLogo: "jankaritech.jpg",
			projects: [
				{
					name: "QA with Owncloud",
					description: "'ownCloud' develops and provides open-source software for content collaboration, allowing teams to easily share and work on files seamlessly regardless of device or location.",
					job: [
						"Write webUI, API, e2e and unit tests for new features added or bugs fixed.",
						"Maintain CI/CD pipelines for the daily running builds or tests.",
						"Automate the product release processes",
						"Contribute on necessary test infrastructures like 'test-middleware', 'testing-app' for better test coverage and performance"
					],
					url: "https://owncloud.com",
					badge: {
						dark: "/oc-badge-community-contributor-dark.png",
						light: "/oc-badge-community-contributor-light.png"
					}
				},
				{
					name: "Integration app for OpenProject and Nextcloud",
					description: "An integration app for OpenProject and Nextcloud to sync the files and folders from Nextcloud to the work-packages in the OpenProject application.",
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
						"Organize a workshop on Automation Testing using Playwright to help Programiz team to write better UI tests."
					],
					url: "https://www.programiz.com/"
				},
				{
					name: "E2E Tests for the My Second Teacher Website",
					description: "'My Second Teacher' is an online learning platform for students to learn from the best teachers in Nepal.",
					job: [
						"Write e2e tests for the different features (B2B, B2C) of the website using Cypress.",
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
					description: "A web dashboard for a company to manage their employees' leaves." +
						" Employees can apply for leaves and the admin can approve or reject the leaves.",
					job: [
						"Developed the frontend using VueJS and Vuetify"
					]
				},
				{
					name: "Bit Coins Survey",
					description: "A survey website for different Bit Coins. The website is used to show the survey results to the users in graphs and charts.",
					job: [
						"Developed the frontend using VueJS and Vuetify"
					]
				}
			],
			technologies: [
				"VueJs", "VuetifyJs", "Sass", "Github"
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
				"First exposure to the real world of programming",
				"OOP and basics of Python",
				"Build APIs and consume them using Ajax in the frontend",
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
			title: "RentShare",
			description: "A platform to give and take rent from the people and also share the rent with the roommates.",
			thumbnail: "rentShare.png",
			technologies: [
				"VueJs",
				"Vuetify",
				"Djangorestframework",
				"MySQL"
			],
			links: {
				github: "https://github.com/rent-share",
				demo: "https://irental.netlify.app/",
			}
		},
		{
			title: "VueYtframe",
			description: "A Vue library to embed YouTube videos in your Vue app.",
			thumbnail: "vue-ytframe.png",
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
			description: "A simple yet powerful markdown parser for NodeJS or Javascript." +
				" It can parse markdowns to HTML and vice versa.",
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
			description: "A website for Sachchai Kendra Nepal, a non-profit religious organization." +
				" The website provides social media features like posting, commenting, liking, etc. to the users." +
				" Also provides a management system for the organization branches and their members.",
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
			description: "A reddit based social media website for writers and readers. It is based on Django channels and have live notifications feature.",
			thumbnail: "wordclub.png",
			technologies: [
				"Vue2",
				"Vuetify",
				"Djangorestframework",
				"MySQL"
			],
			links: {
				github: "https://github.com/word-club",
				demo: "https://wordclub.kiranparajuli.com.np/"
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
				website: "http://sports.bagamati.gov.np/"
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
				{ tooltip: "Postman", image: "postman.svg" },
				{ class: "devicon-vuejs-plain-wordmark", tooltip: "Vue Unit Tests" },
				{ tooltip: "Locust", image: "locust.jpeg" },
				{ class: "devicon-gitlab-original-wordmark", tooltip: "GitLab CI" },
				{ class: "devicon-github-original-wordmark", tooltip: "GitHub CI" },
				{ tooltip: "Drone CI", image: "droneci.png" },
				{ tooltip: "Selenium", class: "devicon-selenium-original" },
				{ tooltip: "Regex", image: "regex.svg"},
			]
		},
		{
			name: "Frontend Development",
			tools: [
				{ class: "devicon-html5-plain-wordmark", tooltip: "HTML5" },
				{ class: "devicon-css3-plain-wordmark", tooltip: "CSS3" },
				{ image: "sass.png", tooltip: "SASS/SCSS"},
				{ class: "devicon-javascript-plain", tooltip: "JavaScript" },
				{ class: "devicon-vuejs-plain-wordmark", tooltip: "VueJS" },
				{ class: "devicon-vuetify-line", tooltip: "Vuetify" },
				{ class: "devicon-figma-plain-wordmark", tooltip: "Figma" },
				{ class: "devicon-bootstrap-plain-wordmark", tooltip: "Bootstrap" },
				{ tooltip: "Axios", image: "axios.svg" },
			],
		},
		{
			name: "Backend Development",
			tools: [
				{ class: "devicon-python-plain", tooltip: "Python" },
				{ class: "devicon-django-plain", tooltip: "Django" },
				{ class: "devicon-nodejs-plain", tooltip: "NodeJS" },
				{ class: "devicon-postgresql-plain-wordmark", tooltip: "PostgreSQL" },
				{ class: "devicon-mysql-plain-wordmark", tooltip: "MySQL" },
				{ class: "devicon-redis-plain-wordmark", tooltip: "Redis" },
				{ tooltip: "Websockets", image: "websockets.png" },
				{ tooltip: "Djangorestframework", image: "drf.png" },
			],
		},
		{
			name: "DevOps",
			tools: [
				{ class: "devicon-docker-plain-wordmark", tooltip: "Docker" },
				{ image: "CPanel.png", tooltip: "Cpanel" },
				{ image: "vps.png", tooltip: "VPS" },
				{ class: "devicon-nginx-plain-wordmark", tooltip: "Nginx" },
				{ class: "devicon-apache-plain-wordmark", tooltip: "Apache" },
				{ class: "devicon-linux-plain", tooltip: "Linux" }
			],
		}
	],
	education: [
		{
			name: "Paschimanchal Engineering Campus",
			degree: "Bachelor's Degree",
			startDate: "2017",
			endDate: "2021",
			major: "Computer Engineering",
		},
		{
			name: "Nist Banepa",
			degree: "High School",
			startDate: "2015",
			endDate: "2017",
			major: "Science (Maths)",
		}
	]
}

export default Resume
