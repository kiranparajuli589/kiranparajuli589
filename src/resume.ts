import { Experience, Service, Technology, Work, Education } from "./customTypes"

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
		summary: "Detail-oriented software engineer with extensive experience in Quality Assurance and full-stack development. Proficient in designing and implementing robust testing frameworks, ensuring optimal functionality and performance across complex systems. Skilled in backend development using Python, PHP, and Node.js, complemented by expertise in frontend technologies like React.js and Vue.js. Demonstrates a strong commitment to delivering high-quality, error-free solutions through meticulous testing and collaboration. Passionate about driving innovation and maintaining the highest standards in software quality assurance.",
		summaryQa: "Results-driven Quality Assurance Engineer with expertise in WebUI, API, CLI, Unit, and E2E testing. Skilled in planning, writing, and maintaining test cases. Passionate about mentoring and continuous improvement within teams. Utilizes music and creative outlets to stay inspired."
	},
	experiences: [
		{
			company: "Asians Group LLC",
			description: "A vital internet intermediary, offering fast CDN services, custom nodes, DNS acceleration, and free SSL certification to improve content delivery and ensure optimal user experiences for businesses and individuals alike.",
			roles: ["Senior Frontend Developer"],
			startDate: "2025",
			endDate: "Present",
			technologies: [
				"Vue.js", "CoreUI", "AntDesign", "Typescript", "JavaScript",
				"Figma", "Github", "JIRA", "Postman", "NGINX",
			],
			achievements: [
				"Led the development of a comprehensive lua condition expression builders.",
				"Optimized frontend performance, achieving a 30% reduction in load times.",
				"Collaborated with cross-functional teams to ensure seamless integration of services.",
				"Conducted code reviews and provided mentorship to junior developers.",
				"Streamlined deployment processes using CI/CD pipelines."
			],
			companyUrl: "https://asians.group",
			companyLogo: "asians_group.png",
			projects: [
				{
					name: "Lua Condition Expression Builder",
					description: "Developed a user-friendly interface for building complex lua expressions.",
					job: [
						"Designed and implemented the frontend using Vue.js and CoreUI.",
						"Collaborated with backend teams to ensure seamless integration.",
						"Conducted user testing to gather feedback and improve usability."
					],
					url: "https://expr-builder.netlify.app/#/rule"
				},
				{
					name: "Design System",
					description: "Created a design system to ensure consistency across all products.",
					job: [
						"Developed reusable components using Vue.js and AntDesign.",
						"Documented design guidelines and best practices for the team.",
						"Conducted workshops to train team members on the new design system."
					],
				}
			]

		},
		{
			company: "ourBuddy.ai",
			description: "A cutting-edge SaaS platform tailored for insurance brokerages.",
			roles: ["Senior Software Developer"],
			startDate: "2024",
			endDate: "2025",
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
			company: "Dimitra",
			description: "Dimitra Incorporated is a global Agtech company with a mission to help smallholder farmers across the world.",
			roles: ["QA Engineer"],
			startDate: "2024",
			endDate: "2024",
			technologies: [
				"Jest", "Cypress", "Postman", "GitHub", "JIRA", "JMeter"
			],
			achievements: [
				"Optimized test case preparation and execution processes.",
				"Developed and maintained a comprehensive testing framework.",
				"Enhanced CI/CD pipelines for automated testing.",
				"Loaded and analyzed test data for performance assessments.",
			],
			companyUrl: "https://dimitra.io/about-us/",
			companyLogo: "dimitra.ico",
			projects: [
				{
					name: "Contract Based Testing Optimizations",
					description: "Optimized test case preparation and execution processes.",
					job: [
						"Developed and maintained a comprehensive testing framework.",
						"Enhanced CI/CD pipelines for automated testing.",
						"Loaded and analyzed test data for performance assessments.",
						"Collaborated with cross-functional teams to enhance product quality."
					],
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
						"Created load testing CUSTOM infrastructure based on the system requirements.",
						"Helped visualization and analysis of load testing results.",
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
					url: "https://owncloud.com",
					badge: {
						dark: "/oc-badge-community-contributor-dark.png",
						light: "/oc-badge-community-contributor-light.png"
					}
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
				},
				{
					name: "E2E Tests for My Second Teacher Website",
					description: "An online learning platform for students in Nepal.",
					job: [
						"Wrote E2E tests for different website features using Cypress.",
						"Maintained CI/CD pipelines for continuous test execution."
					],
					url: "https://www.mysecondteacher.com/"
				}
			]
		},
		{
			company: "Tech Himalaya",
			description: "Nepal's leading IT company providing software, hardware, and cloud solutions.",
			roles: ["Freelance Frontend Developer"],
			startDate: "2019",
			endDate: "2020",
			technologies: [
				"VueJs", "VuetifyJs", "Sass", "GitHub"
			],
			achievements: [
				"Gained experience in remote teamwork and time management.",
				"Enhanced website implementation strategies using Vue.js."
			],
			companyUrl: "https://techhimalaya.com/",
			companyLogo: "tech-himalaya.png",
			projects: [
				{
					name: "Leave Management Dashboard",
					description: "A web dashboard for managing employee leaves within a company.",
					job: [
						"Developed the frontend using Vue.js and Vuetify."
					]
				},
				{
					name: "Bit Coins Survey",
					description: "A survey website displaying results in graphs and charts.",
					job: [
						"Built the frontend using Vue.js and Vuetify."
					]
				}
			]
		},
		{
			company: "Nipuna Prabidhik Sewa",
			description: "Technology service provider specializing in Web Cloud, Professional, and Managed Services.",
			roles: ["Software Developer Intern"],
			startDate: "2018",
			endDate: "2019",
			technologies: [
				"Python", "Django", "HTML", "CSS", "JavaScript", "Ajax", "jQuery",
				"Bootstrap", "MySQL", "Git"
			],
			achievements: [
				"Gained first exposure to real-world programming and Python OOP principles.",
				"Built APIs and integrated them with frontend using Ajax.",
				"Developed an inventory management system for a retail shop.",
				"Implemented an attendance system using Raspberry Pi."
			],
			companyUrl: "https://www.nipunasewa.com/",
			companyLogo: "nps.png",
			projects: [
				{
					name: "Inventory Management System",
					description: "A web application for managing a small retailer's inventory.",
					job: [
						"Implemented a cart system for customer purchases.",
						"Developed an admin panel for managing products, customers, and orders.",
						"Generated reports for sales and orders."
					]
				},
				{
					name: "Attendance System",
					description: "An employee attendance management system using Raspberry Pi and fingerprint module.",
					job: [
						"Collected daily attendance using a fingerprint module.",
						"Generated reports for employee attendance."
					]
				}
			]
		}
	],
	works: [
		{
			title: "Vue Formik",
			description: "A Vue library to use Formik with Vue.js. Formik is a popular form library for React.js.",
			thumbnail: "vue-formik.png",
			technologies: ["VueJs", "Formik", "Yup", "Typescript"],
			links: {
				github: "https://github.com/vue-formik/vue-formik",
				demo: "https://vue-formik.netlify.app/"
			}
		},
		{
			title: "Vue Spotify",
			description: "A Spotify clone built using Vue.js and faker.js. The project is built to demonstrate the use of Vue.js with some improvements over the original Spotify.",
			thumbnail: "vue-spotify.png",
			technologies: ["VueJs", "Vuetify", "FakerJS"],
			links: {
				github: "https://github.com/kiranparajuli589/vue-spotify",
				demo: "https://vuespotify589.netlify.app/"
			}
		},
		{
			title: "RentShare",
			description: "A platform to facilitate rent payments and sharing among roommates.",
			thumbnail: "rentShare.png",
			technologies: ["VueJs", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				github: "https://github.com/rent-share",
				demo: "https://irental.netlify.app/"
			}
		},
		{
			title: "VueYtframe",
			description: "A Vue library to embed YouTube videos in your Vue app.",
			thumbnail: "vue-ytframe.png",
			technologies: ["VueJs", "YouTube Iframe API"],
			links: {
				github: "https://github.com/kiranparajuli589/vue3-ytframe",
				demo: "https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=getting-started",
				playground: "https://kiranparajuli589.github.io/vue3-ytframe/#/playground"
			}
		},
		{
			title: "Markdown Parser",
			description: "A simple yet powerful markdown parser for Node.js or JavaScript.",
			thumbnail: "markdown-parser.png",
			technologies: ["NodeJS", "JavaScript", "Modular Programming", "Recursion"],
			links: {
				github: "https://github.com/kiranparajuli589/md-parser",
				demo: "https://kiranparajuli589.github.io/md-parser/"
			}
		},
		{
			title: "Sachchai Kendra Nepal",
			description: "A website for Sachchai Kendra Nepal, offering social media features like posting, commenting, and management for organizational branches.",
			thumbnail: "sachchai-kendra-nepal.png",
			technologies: ["Vue3", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				demo: "https://sachchaikendranepal.org.np/"
			}
		},
		{
			title: "FoodSwipe",
			description: "A food delivery e-commerce website with order and transaction management.",
			thumbnail: "foodswipe.png",
			technologies: ["Vue2", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				demo: "https://foodswipe.com.np/",
				github: "https://github.com/foodswipe"
			}
		},
		{
			title: "WordClub",
			description: "A social media website for writers and readers with live notifications.",
			thumbnail: "wordclub.png",
			technologies: ["Vue2", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				github: "https://github.com/word-club",
				demo: "https://wordclub.kiranparajuli.com.np/"
			}
		},
		{
			title: "Bagmati Nepal Sports Website",
			description: "A website for Bagmati Nepal Sports Government, providing news on current sports events.",
			thumbnail: "bagmati-nepal-sports.png",
			technologies: ["Vue2", "Vuetify", "Laravel", "MySQL"],
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
				"Smoke Testing", "Regression Testing", "API Testing", "UI Testing",
				"Performance Testing", "Security Testing", "Load Testing", "Integration Testing",
				"Unit Testing", "Continuous Integration", "Continuous Deployment"
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
				{ tooltip: "Regex", image: "regex.svg" },
			]
		},
		{
			name: "Frontend Development",
			tools: [
				{ class: "devicon-html5-plain-wordmark", tooltip: "HTML5" },
				{ class: "devicon-css3-plain-wordmark", tooltip: "CSS3" },
				{ image: "sass.png", tooltip: "SASS/SCSS" },
				{ class: "devicon-javascript-plain", tooltip: "JavaScript" },
				{ class: "devicon-vuejs-plain-wordmark", tooltip: "VueJS" },
				{ class: "devicon-vuetify-line", tooltip: "Vuetify" },
				{ class: "devicon-react-original-wordmark", tooltip: "ReactJS" },
				{ class: "devicon-nextjs-original-wordmark", tooltip: "NextJS" },
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
