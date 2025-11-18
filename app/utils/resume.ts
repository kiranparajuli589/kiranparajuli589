import type {
	Experience,
	Service,
	Technology,
	Work,
	Education,
} from "~/customTypes";

type SkillCategory = {
	title: string;
	items: string[];
};

type SelectedProject = {
	title: string;
	description: string;
	impact: string;
	stack: string[];
	links?: {
		[key: string]: string;
	};
};

interface ResumeInterface {
	personalInfo: { [key: string]: string };
	experiences: Experience[];
	works: Work[];
	services: Service[];
	technologies: Technology[];
	education: Education[];
	coreSkills: SkillCategory[];
	additionalSkills: SkillCategory[];
	leadershipHighlights: string[];
	selectedProjects: SelectedProject[];
	extras: string[];
}

// Helper function to calculate years of experience
function calculateYearsOfExperience(experiences: Experience[]): number {
	if (experiences.length === 0) return 0;
	const earliestYear = Math.min(
		...experiences.map((exp) => parseInt(exp.startDate, 10)),
	);
	const currentYear = new Date().getFullYear();
	return currentYear - earliestYear;
}

// We'll create the base resume object first, then calculate and update summary
const baseResume = {
	personalInfo: {
		name: "Kiran Parajuli",
		role: "Senior Frontend Engineer",
		municipality: "Panchkhal, Kavre",
		country: "Nepal",
		postalCode: "45200",
		phone: "+977 984-3530425",
		email: "kiranparajuli589@gmail.com",
		devto: "https://dev.to/kiranparajuli589",
		linkedin: "https://linkedin.com/in/kiranparajuli589",
		github: "https://github.com/kiranparajuli589",
		website: "https://kiranparajuli.com.np",
		bio: "Senior Frontend Engineer | React.js • Vue.js • TypeScript • QA Automation",
		summary: "", // Will be set after experiences are defined
		summaryQa:
			"Results-driven Quality Assurance Engineer with expertise in WebUI, API, CLI, Unit, and E2E testing. Skilled in planning, writing, and maintaining test cases. Passionate about mentoring and continuous improvement within teams. Utilizes music and creative outlets to stay inspired.",
	},
	coreSkills: [
		{
			title: "Frontend Engineering",
			items: [
				"React.js, Next.js, Vue.js, Nuxt, TypeScript",
				"State management (Redux, Zustand, Pinia, Vuex)",
				"Component-driven architecture & design systems",
				"Responsive UI, TailwindCSS, Radix UI, GSAP",
				"Performance optimization, Core Web Vitals, accessibility",
			],
		},
		{
			title: "Backend & Platform Collaboration",
			items: [
				"Node.js, Express.js, Django, DRF",
				"REST APIs, GraphQL, WebSocket servers",
				"PostgreSQL, MySQL, Redis",
				"Architecture reviews & cross-functional delivery leadership",
				"CI/CD ownership with GitHub Actions, GitLab CI, Jenkins",
			],
		},
	],
	additionalSkills: [
		{
			title: "QA Automation",
			items: [
				"Playwright, Cypress, Jest, PHPUnit, Behat",
				"Contract, regression, and load testing (Locust)",
				"CI-based quality gates with reporting & triage rituals",
			],
		},
		{
			title: "DevOps & Platform",
			items: [
				"Docker, Docker Compose, Nginx, Apache",
				"GitHub Actions, GitLab CI, Drone CI",
				"Linux/VPS administration, monitoring, and logs",
			],
		},
	],
	leadershipHighlights: [
		"Architect scalable UI platforms that balance performance, accessibility, and velocity.",
		"Own the frontend roadmap—from modernization sequencing to design system rollout.",
		"Mentor engineers through pairing, structured reviews, and onboarding playbooks.",
		"Partner with design, product, and backend teams to ship cohesive user journeys.",
		"Uphold engineering excellence via coding standards, testing strategy, and CI quality bars.",
	],
	selectedProjects: [
		{
			title: "Browser Recording System",
			description:
				"Full recording suite that captures camera, audio, and screen feeds without third-party SDKs.",
			impact:
				"Expanded ourBuddy.ai’s platform capabilities while cutting vendor costs and latency.",
			stack: [
				"React",
				"Next.js",
				"TypeScript",
				"WebRTC",
				"MediaRecorder API",
				"Node.js",
			],
			links: {
				website: "https://www.ourbuddy.ai",
			},
		},
		{
			title: "Lua Expression Builder",
			description:
				"Drag-and-drop interface that lets CDN operators compose complex Lua conditions safely.",
			impact:
				"Reduced policy configuration time by 60% and eliminated syntax errors before deployment.",
			stack: ["Vue.js", "CoreUI", "TypeScript", "Node.js", "PrimeVue"],
			links: {
				demo: "https://expr-builder.netlify.app/#/rule",
			},
		},
		{
			title: "Vue Formik",
			description:
				"Open-source Vue.js library that brings Formik-style declarative form patterns to Vue 3.",
			impact:
				"Adopted by 1k+ developers, enabling consistent validation and DX improvements.",
			stack: ["Vue.js", "TypeScript", "Formik", "Yup"],
			links: {
				github: "https://github.com/vue-formik/vue-formik",
				demo: "https://vue-formik.netlify.app/",
			},
		},
		{
			title: "Markdown Parser",
			description:
				"Modular Markdown parser for Node.js with plugin-based extensions and custom syntax.",
			impact:
				"Replaced brittle third-party dependency and reduced parsing time by 40% on large docs.",
			stack: ["Node.js", "TypeScript", "Recursion", "AST"],
			links: {
				github: "https://github.com/kiranparajuli589/md-parser",
				demo: "https://kiranparajuli589.github.io/md-parser/",
			},
		},
	],
	extras: [
		"Mentor for Playwright, automation testing, and frontend best practices.",
		"Active open-source contributor across Vue and Node.js ecosystems.",
		"Strong documentation habits, code-quality discipline, and knowledge sharing.",
	],
	experiences: [
		{
			company: "Asians Group LLC",
			description:
				"A vital internet intermediary that powers CDN services, custom nodes, DNS acceleration, and SSL offerings for global customers.",
			roles: ["Senior Frontend Engineer"],
			startDate: "2025",
			endDate: "Present",
			technologies: [
				"Nuxt.js",
				"Vue.js",
				"TypeScript",
				"PrimeVue",
				"TailwindCSS",
				"Figma",
				"CoreUI",
				"Jenkins",
				"Docker",
				"Django",
				"PostgreSQL",
				"GitHub Actions",
			],
			achievements: [
				"Architected Nuxt.js SSR marketing site and internal portals, increasing qualified inbound leads by 25% within two quarters.",
				"Migrated the legacy WordPress stack to Nuxt with structured data and prefetching, improving Core Web Vitals (FCP 2.8s → 1.2s) and boosting organic impressions by 40%.",
				"Built a Lua condition expression builder with visual validation, cutting CDN policy configuration time by 60% and eliminating syntax defects pre-deploy.",
				"Created a token-driven design system adopted by 4 squads, reducing UI defects by 45% and accelerating new feature delivery by 35%.",
				"Shrank JavaScript bundles by 35% via route-level code-splitting, asset compression, and smarter caching, yielding a 30% drop in perceived load time.",
				"Mentored backend/fullstack engineers, instituted review rubrics, and added automated accessibility/performance checks in Jenkins, reducing failed deployments by 30%.",
				"Redesigned loading-state and socket handling to eliminate redundant calls, improving perceived responsiveness by 40% and reducing drop-offs during key user actions.",
			],
			companyUrl: "https://asians.group",
			companyLogo: "asians_group.png",
			projects: [
				{
					name: "Asians Group Public Website",
					description:
						"Developed a comprehensive public website for Asians Group LLC.",
					job: [
						"Designed and implemented the frontend using PrimeVue, TailwindCSS & Vue.js and Nuxt.js.",
						"Collaborated with designers to ensure a visually appealing layout.",
						"Optimized website performance for faster load times.",
						"Backend integration for dynamic content management.",
						"Simple django and rest framework based backend for managing content easily.",
					],
					url: "https://asians.group",
				},
				{
					name: "Lua Condition Expression Builder",
					description:
						"Developed a user-friendly interface for building complex lua expressions.",
					job: [
						"Designed and implemented the frontend using Vue.js and CoreUI.",
						"Collaborated with backend teams to ensure seamless integration.",
						"Conducted user testing to gather feedback and improve usability.",
					],
					url: "https://expr-builder.netlify.app/#/rule",
				},
				{
					name: "Design System",
					description:
						"Created a design system to ensure consistency across all products.",
					job: [
						"Developed reusable components using Vue.js and AntDesign.",
						"Documented design guidelines and best practices for the team.",
						"Conducted workshops to train team members on the new design system.",
					],
				},
			],
		},
		{
			company: "ourBuddy.ai",
			description:
				"A cutting-edge SaaS platform tailored for insurance brokerages.",
			roles: ["Senior Software Developer"],
			startDate: "2024",
			endDate: "2025",
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
				"Led a squad of five engineers delivering multi-tenant features, backlog prioritization, and code-quality initiatives for the brokerage platform.",
				"Engineered a browser-based recording suite (audio/video/screen) using WebRTC + MediaRecorder, expanding product capability without third-party SDK costs.",
				"Modernized the legacy React codebase into a modular Next.js architecture with shared UI primitives, reducing build time by 40% and unlocking SSR caching.",
				"Introduced performance budgets, lazy loading, and real-user monitoring, improving LCP from 3.1s → 1.7s across top customer workspaces.",
				"Implemented comprehensive Playwright, API, and contract-test suites tied to CI, cutting production regressions by 35%.",
				"Owned release cadences—sprint planning, QA sign-off, and phased rollouts—achieving 95% on-time delivery while keeping bug escape rate below 1%.",
			],
			companyUrl: "https://www.ourbuddy.ai",
			companyLogo: "ourBuddy.png",
			projects: [
				{
					name: "Browser-Based Recording System",
					description:
						"Engineered a versatile recording system for audio, video, screen capture and video with screen captures.",
					job: [
						"Built a responsive frontend using React and Next.js.",
						"Integrated recording functionalities using core Browser APIs.",
						"Maintained CI/CD pipelines for continuous testing and builds.",
					],
				},
				{
					name: "ourBuddy.ai Platform",
					description:
						"Designed a comprehensive SaaS platform for insurance brokerages.",
					job: [
						"Built and maintained the frontend with React and Next.js.",
						"Enhanced CI/CD pipelines for efficient deployments.",
						"Revamped an outdated system with modern technologies.",
						"Authored detailed documentation for knowledge sharing.",
					],
				},
				{
					name: "Astral Nexus",
					description:
						"A client management system with activity logs and site blogs.",
					job: [
						"Developed a dynamic frontend using React and Next.js.",
						"Built the backend using Python (FastAPI) for data management.",
					],
				},
				{
					name: "Quality Assurance",
					description:
						"Established a meticulous QA process for the ourBuddy.ai platform.",
					job: [
						"Developed and maintained a robust testing framework.",
						"Optimized CI/CD pipelines for automated testing.",
						"Conducted QA workshops to enhance team skills.",
						"Created detailed test documentation.",
					],
				},
			],
		},
		{
			company: "12iD",
			description:
				"Leading multi-authentication solution for digital identity and user identification.",
			roles: ["Senior Quality Assurance Engineer"],
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
				"Notion",
			],
			achievements: [
				"Designed the automation strategy across React frontends, Node microservices, and APIs—tripling automated coverage in two quarters.",
				"Built a Locust-driven load-testing suite that validated 100k+ concurrent authentication flows prior to enterprise launches.",
				"Integrated Playwright UI suites and contract tests into CI/CD, reducing regression escapes by 40%.",
				"Partnered with security, product, and customer teams to run quality audits, deliver demos, and sign off on regulated releases.",
				"Ran Playwright training program used by 5+ engineers and reduced onboarding time of new hires by 30%.",
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
						"Automated product release processes.",
					],
				},
				{
					name: "Load Testing of the 12iD System",
					description:
						"Validated system performance under various load conditions.",
					job: [
						"Created load testing CUSTOM infrastructure based on the system requirements.",
						"Helped visualization and analysis of load testing results.",
						"Maintained CI/CD pipelines for performance assessments.",
						"Optimized release processes for better load management.",
					],
				},
				{
					name: "E2E Testing of the 12iD System",
					description:
						"Verified end-to-end functionalities for user experience.",
					job: [
						"Developed E2E tests across system components.",
						"Integrated CI/CD pipelines for consistent E2E testing.",
						"Automated release processes for reliability.",
					],
				},
			],
		},
		{
			company: "Dimitra",
			description:
				"Global AgTech company delivering digital products that help smallholder farmers improve yields and supply-chain visibility.",
			roles: ["Full-Stack Engineer"],
			startDate: "2022",
			endDate: "2023",
			technologies: [
				"React.js",
				"Express.js",
				"GraphQL",
				"Python",
				"Jest",
				"Cypress",
				"PostgreSQL",
			],
			achievements: [
				"Delivered features for Connected Farmer and Connected Coffee platforms spanning frontend, backend, analytics, and QA pipelines.",
				"Built interactive dashboards with modern charting libraries, giving agronomists real-time insight into field activity and performance KPIs.",
				"Developed Express.js + GraphQL APIs with optimized resolvers and caching, reducing average response time by 25%.",
				"Partnered with data/ops teams to ship workflows for field operations, supply-chain visibility, and stakeholder reporting.",
				"Mentored QA engineers on Playwright/Cypress automation, doubling coverage and integrating suites into CI quality gates.",
			],
			companyUrl: "https://dimitra.io/about-us/",
			companyLogo: "dimitra.ico",
			projects: [
				{
					name: "Contract Based Testing Optimizations",
					description:
						"Optimized test case preparation and execution processes.",
					job: [
						"Developed and maintained a comprehensive testing framework.",
						"Enhanced CI/CD pipelines for automated testing.",
						"Loaded and analyzed test data for performance assessments.",
						"Collaborated with cross-functional teams to enhance product quality.",
					],
				},
			],
		},
		{
			company: "JankariTech Pvt. Ltd.",
			description: "An IT company specializing in test automation solutions.",
			roles: ["Software Developer", "Junior Programmer"],
			startDate: "2019",
			endDate: "2022",
			technologies: [
				"Playwright",
				"Behat",
				"NightwatchJs",
				"PhpUnit",
				"Postman",
				"GitHub",
				"GitLab",
				"DroneCI",
				"TravisCI",
				"Cypress",
				"NodeJS",
				"Python",
				"PHP",
				"VueJs",
				"Regex",
				"Bash",
			],
			achievements: [
				"Developed production Vue.js features, REST APIs, CLI tools, and automation suites for enterprise clients in finance, education, and SaaS.",
				"Implemented reusable UI patterns and accessibility fixes that reduced front-end bug counts by 20% across key accounts.",
				"Built and maintained CI/CD pipelines (GitHub, GitLab, Drone, Travis) executing daily UI/API/E2E suites for 15+ repositories.",
				"Authored playbooks for Cypress, Playwright, and WebSocket testing; led weekly enablement sessions for engineers and QA.",
				"Created internal knowledge platforms (blog + workshops) to scale documentation and onboarding.",
			],
			companyUrl: "https://www.jankaritech.com",
			companyLogo: "jankaritech.jpg",
			projects: [
				{
					name: "QA with Owncloud",
					description:
						"Provided open-source software for content collaboration.",
					job: [
						"Implemented web UI, API, E2E, and unit tests for new features and bug fixes.",
						"Maintained CI/CD pipelines for consistent test coverage.",
						"Enhanced testing infrastructure for better performance.",
					],
					url: "https://owncloud.com",
					badge: {
						dark: "/oc-badge-community-contributor-dark.png",
						light: "/oc-badge-community-contributor-light.png",
					},
				},
				{
					name: "Integration app for OpenProject and Nextcloud",
					description:
						"Synced files and folders between Nextcloud and OpenProject.",
					job: [
						"Implemented feature designs for the integration app.",
						"Developed backend functionalities using Node.js.",
						"Wrote unit and E2E tests for added features.",
					],
					url: "https://github.com/nextcloud/integration_openproject",
				},
				{
					name: "E2E Tests Workshop with the Programiz Team",
					description: "Enhanced testing skills within the Programiz team.",
					job: [
						"Wrote E2E tests for Programiz Pro features.",
						"Organized workshops to guide on best practices for UI tests.",
					],
					url: "https://www.programiz.com/",
				},
				{
					name: "E2E Tests for My Second Teacher Website",
					description: "An online learning platform for students in Nepal.",
					job: [
						"Wrote E2E tests for different website features using Cypress.",
						"Maintained CI/CD pipelines for continuous test execution.",
					],
					url: "https://www.mysecondteacher.com/",
				},
			],
		},
		{
			company: "Tech Himalaya",
			description:
				"Nepal's leading IT company providing software, hardware, and cloud solutions.",
			roles: ["Freelance Frontend Developer"],
			startDate: "2019",
			endDate: "2020",
			technologies: ["VueJs", "VuetifyJs", "Sass", "GitHub"],
			achievements: [
				"Gained experience in remote teamwork and time management.",
				"Enhanced website implementation strategies using Vue.js.",
			],
			companyUrl: "https://techhimalaya.com/",
			companyLogo: "tech-himalaya.png",
			projects: [
				{
					name: "Leave Management Dashboard",
					description:
						"A web dashboard for managing employee leaves within a company.",
					job: ["Developed the frontend using Vue.js and Vuetify."],
				},
				{
					name: "Bit Coins Survey",
					description:
						"A survey website displaying results in graphs and charts.",
					job: ["Built the frontend using Vue.js and Vuetify."],
				},
			],
		},
		{
			company: "Nipuna Prabidhik Sewa",
			description:
				"Technology service provider specializing in Web Cloud, Professional, and Managed Services.",
			roles: ["Software Developer Intern"],
			startDate: "2018",
			endDate: "2019",
			technologies: [
				"Python",
				"Django",
				"HTML",
				"CSS",
				"JavaScript",
				"Ajax",
				"jQuery",
				"Bootstrap",
				"MySQL",
				"Git",
			],
			achievements: [
				"Gained first exposure to real-world programming and Python OOP principles.",
				"Built APIs and integrated them with frontend using Ajax.",
				"Developed an inventory management system for a retail shop.",
				"Implemented an attendance system using Raspberry Pi.",
			],
			companyUrl: "https://www.nipunasewa.com/",
			companyLogo: "nps.png",
			projects: [
				{
					name: "Inventory Management System",
					description:
						"A web application for managing a small retailer's inventory.",
					job: [
						"Implemented a cart system for customer purchases.",
						"Developed an admin panel for managing products, customers, and orders.",
						"Generated reports for sales and orders.",
					],
				},
				{
					name: "Attendance System",
					description:
						"An employee attendance management system using Raspberry Pi and fingerprint module.",
					job: [
						"Collected daily attendance using a fingerprint module.",
						"Generated reports for employee attendance.",
					],
				},
			],
		},
	],
	works: [
		{
			title: "Vue Formik",
			description:
				"A Vue library to use Formik with Vue.js. Formik is a popular form library for React.js.",
			thumbnail: "vue-formik.png",
			technologies: ["VueJs", "Formik", "Yup", "Typescript"],
			links: {
				github: "https://github.com/vue-formik/vue-formik",
				demo: "https://vue-formik.netlify.app/",
			},
		},
		{
			title: "Vue Spotify",
			description:
				"A Spotify clone built using Vue.js and faker.js. The project is built to demonstrate the use of Vue.js with some improvements over the original Spotify.",
			thumbnail: "vue-spotify.png",
			technologies: ["VueJs", "Vuetify", "FakerJS"],
			links: {
				github: "https://github.com/kiranparajuli589/vue-spotify",
				demo: "https://vuespotify589.netlify.app/",
			},
		},
		{
			title: "RentShare",
			description:
				"A platform to facilitate rent payments and sharing among roommates.",
			thumbnail: "rentShare.png",
			technologies: ["VueJs", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				github: "https://github.com/rent-share",
				demo: "https://irental.netlify.app/",
			},
		},
		{
			title: "VueYtframe",
			description: "A Vue library to embed YouTube videos in your Vue app.",
			thumbnail: "vue-ytframe.png",
			technologies: ["VueJs", "YouTube Iframe API"],
			links: {
				github: "https://github.com/kiranparajuli589/vue3-ytframe",
				demo: "https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=getting-started",
				playground:
					"https://kiranparajuli589.github.io/vue3-ytframe/#/playground",
			},
		},
		{
			title: "Markdown Parser",
			description:
				"A simple yet powerful markdown parser for Node.js or JavaScript.",
			thumbnail: "markdown-parser.png",
			technologies: [
				"NodeJS",
				"JavaScript",
				"Modular Programming",
				"Recursion",
			],
			links: {
				github: "https://github.com/kiranparajuli589/md-parser",
				demo: "https://kiranparajuli589.github.io/md-parser/",
			},
		},
		{
			title: "Sachchai Kendra Nepal",
			description:
				"A website for Sachchai Kendra Nepal, offering social media features like posting, commenting, and management for organizational branches.",
			thumbnail: "sachchai-kendra-nepal.png",
			technologies: ["Vue3", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				demo: "https://sachchaikendranepal.org.np/",
			},
		},
		{
			title: "FoodSwipe",
			description:
				"A food delivery e-commerce website with order and transaction management.",
			thumbnail: "foodswipe.png",
			technologies: ["Vue2", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				demo: "https://foodswipe.com.np/",
				github: "https://github.com/foodswipe",
			},
		},
		{
			title: "WordClub",
			description:
				"A social media website for writers and readers with live notifications.",
			thumbnail: "wordclub.png",
			technologies: ["Vue2", "Vuetify", "Djangorestframework", "MySQL"],
			links: {
				github: "https://github.com/word-club",
				demo: "https://wordclub.kiranparajuli.com.np/",
			},
		},
		{
			title: "Bagmati Nepal Sports Website",
			description:
				"A website for Bagmati Nepal Sports Government, providing news on current sports events.",
			thumbnail: "bagmati-nepal-sports.png",
			technologies: ["Vue2", "Vuetify", "Laravel", "MySQL"],
			links: {
				website: "http://sports.bagamati.gov.np/",
			},
		},
	],
	services: [
		{
			name: "Frontend Development",
			description:
				"I can build a responsive and interactive frontend for your web application." +
				" It is true that I am not the best designer you can hire, but I can implement complex" +
				" designs on your website.",
			icon: "web-box",
			iconColor: "primary",
			experience: new Date().getFullYear() - 2018,
		},
		{
			name: "Backend Development",
			description:
				"I have been working with different technologies to build a scalable and" +
				" secure backend. You can hire me to build REST APIs or Websockets for your application." +
				" I also have some experience with microservices architecture. The advanced part of my" +
				" work entails more engineering work relating to Data Structure operations, Query Optimization, and more.",
			icon: "server",
			iconColor: "indigo",
			experience: new Date().getFullYear() - 2018,
		},
		{
			name: "QA Automation",
			description:
				"I can write <b>automated tests</b> for your application." +
				" We can work together to increase test coverage of your application," +
				" reduce flakiness inside existing test cases and implement, maintain" +
				" and optimize the CI/CD pipelines.",
			icon: "lightbulb-auto",
			iconColor: "green",
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
			description:
				"I have few years of experience in DevOps, I can deploy your web application to the" +
				" cloud and organize load balancing for clients or servers." +
				" I can also create and maintain CI/CD pipelines for your application.",
			icon: "cloud",
			iconColor: "grey",
			experience: new Date().getFullYear() - 2020,
		},
	],
	technologies: [
		{
			name: "Frontend Development",
			tools: [
				{ class: "devicon-html5-plain-wordmark", tooltip: "HTML5" },
				{ class: "devicon-css3-plain-wordmark", tooltip: "CSS3" },
				{ image: "sass.png", tooltip: "SASS/SCSS" },
				{ tooltip: "WebSockets", image: "websockets.png" },
				{ class: "devicon-javascript-plain", tooltip: "JavaScript" },
				{ class: "devicon-typescript-plain", tooltip: "TypeScript" },
				{ class: "devicon-vuejs-plain-wordmark", tooltip: "VueJS" },
				{ class: "devicon-vuetify-line", tooltip: "Vuetify" },
				{ class: "devicon-nuxtjs-plain-wordmark", tooltip: "Nuxt" },
				{ class: "devicon-react-original-wordmark", tooltip: "ReactJS" },
				{ class: "devicon-nextjs-original-wordmark", tooltip: "NextJS" },
				{ class: "devicon-tailwindcss-plain", tooltip: "TailwindCSS" },
				{ class: "devicon-figma-plain-wordmark", tooltip: "Figma" },
				{ class: "devicon-bootstrap-plain-wordmark", tooltip: "Bootstrap" },
				{ tooltip: "RadixUI", image: "radixui.png", class: "dark:invert" },
				{ tooltip: "Axios", image: "axios.svg" },
				{ tooltip: "GSAP", image: "gsap.png" },
			],
		},
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
				{ tooltip: "Regex", image: "regex.svg", class: "dark:invert" },
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
				{ class: "devicon-linux-plain", tooltip: "Linux" },
			],
		},
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
		},
	],
} as Omit<ResumeInterface, "personalInfo"> & {
	personalInfo: Omit<ResumeInterface["personalInfo"], "summary"> & {
		summary: string;
	};
};

// Calculate years of experience dynamically
const yearsOfExperience = calculateYearsOfExperience(baseResume.experiences);

// Create the final Resume object with dynamically calculated summary
const Resume: ResumeInterface = {
	...baseResume,
	personalInfo: {
		...baseResume.personalInfo,
		summary: `Senior Frontend Engineer with ${yearsOfExperience}+ years of experience shipping high-performance web applications, modernizing platforms, and leading product-focused engineering teams. Specializes in React.js, Vue.js, TypeScript, and cross-browser architecture, backed by strong backend fundamentals in Node.js, Django, and PostgreSQL plus deep automation expertise. Known for building scalable UI systems, driving performance budgets, mentoring engineers, and owning features end-to-end—from architecture and development to testing, CI/CD, and deployment.`,
	},
};

export default Resume;
