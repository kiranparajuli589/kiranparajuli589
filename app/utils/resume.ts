import type {
	Experience,
	Service,
	Technology,
	Work,
	Education,
	Language,
	ResumePdfExport,
	ResumePdfVariant,
	Credential,
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
	skills: SkillCategory[];
	leadershipHighlights: string[];
	selectedProjects: SelectedProject[];
	languages: Language[];
	extras: string[];
	credentials: Credential[];
	resumePdfs: Record<ResumePdfVariant, ResumePdfExport>;
	resumePdf: ResumePdfExport;
}

// Helper function to calculate years of experience (excludes internships by default)
function calculateYearsOfExperience(experiences: Experience[]): number {
	const eligible = experiences.filter(
		(exp) => exp.includeInYearsCalc !== false,
	);
	if (eligible.length === 0) return 0;
	const earliestYear = Math.min(
		...eligible.map((exp) => parseInt(exp.startDate, 10)),
	);
	const currentYear = new Date().getFullYear();
	return currentYear - earliestYear;
}

function mapExperienceToPdf(
	exp: Experience,
	variant: ResumePdfVariant,
): ResumePdfExport["experiences"][number] {
	const source =
		variant === "react"
			? (exp.achievementsPdfReact ?? exp.achievementsPdf ?? exp.achievements)
			: (exp.achievementsPdf ?? exp.achievements);
	const maxBullets =
		variant === "react"
			? (exp.pdfMaxBulletsReact ?? exp.pdfMaxBullets ?? source.length)
			: (exp.pdfMaxBullets ?? source.length);
	return {
		company: exp.company,
		roles: exp.roles,
		startDate: exp.startDate,
		endDate: exp.endDate,
		employmentType: exp.employmentType,
		concurrent: exp.concurrent,
		pageBreakBefore: exp.pdfPageBreakBefore,
		companyUrl: exp.companyUrl,
		achievements: source.slice(0, maxBullets),
	};
}

function sortExperiencesForPdf(
	experiences: Experience[],
	variant: ResumePdfVariant,
): Experience[] {
	return experiences
		.filter((exp) => exp.includeInPdf !== false)
		.sort((a, b) => {
			const orderA = a.pdfSortOrder?.[variant] ?? 999;
			const orderB = b.pdfSortOrder?.[variant] ?? 999;
			if (orderA !== orderB) return orderA - orderB;
			return parseInt(b.startDate, 10) - parseInt(a.startDate, 10);
		});
}

export function formatResumeLink(url: string): string {
	return url.replace(/^https?:\/\/(www\.)?/, "");
}

function buildResumePdfVariant(
	variant: ResumePdfVariant,
	experiences: Experience[],
	years: number,
): ResumePdfExport {
	const summaries: Record<ResumePdfVariant, string> = {
		vue: `Senior Frontend Engineer with ${years}+ years building Vue.js, Nuxt.js, React, Next.js, and TypeScript applications and leading engineering teams. Strong in scalable UI systems, accessibility, and performance optimization. Partner with backend teams on API design (Node.js, Django) and ship cohesive product experiences. Established quality bars via test automation and CI; active open-source contributor (Vue3-Ytframe, Vue Formik).`,
		react: `Senior Frontend Engineer with ${years}+ years building React, Next.js, Vue.js, Nuxt.js, and TypeScript applications and leading engineering teams. Strong in Next.js SSR, shadcn/ui, scalable UI systems, and performance optimization (Lighthouse 97+). Partner with backend teams on API design (Node.js, Django, Flask) and ship cohesive product experiences. Established quality bars via test automation and CI.`,
	};

	const skills: Record<ResumePdfVariant, ResumePdfExport["skills"]> = {
		vue: [
			{
				title: "Frontend",
				items: [
					"Vue.js, Nuxt.js, TypeScript, shadcn-vue, Tailwind CSS, PrimeVue, CoreUI, Radix UI, React.js, Next.js, design systems, WCAG, Core Web Vitals",
				],
			},
			{
				title: "Backend & Platform",
				items: [
					"Python, Django, DRF, Flask, Node.js, Express.js, REST, GraphQL, PostgreSQL, Redis, GitHub Actions, GitLab CI, Jenkins, Docker",
				],
			},
			{
				title: "Quality Engineering",
				items: [
					"Playwright, Cypress, Gherkin, Cucumber.js, Jest, BDD E2E, contract/regression/load testing (Locust), CI quality gates",
				],
			},
		],
		react: [
			{
				title: "Frontend",
				items: [
					"React.js, Next.js, TypeScript, shadcn/ui, Tailwind CSS, Radix UI, Zustand, Redux, SSR/SSG, design systems, WCAG, Core Web Vitals",
				],
			},
			{
				title: "Backend & Platform",
				items: [
					"Node.js, Express.js, Flask, Python, Django, DRF, REST, GraphQL, PostgreSQL, Redis, GitHub Actions, Docker",
				],
			},
			{
				title: "Quality Engineering",
				items: [
					"Playwright, Cypress, Jest, React component testing, BDD E2E, API/contract testing, CI quality gates",
				],
			},
		],
	};

	const selectedProjects: Record<
		ResumePdfVariant,
		ResumePdfExport["selectedProjects"]
	> = {
		vue: [
			{
				title: "Vue Formik",
				line: "Open-source Vue 3 form library adopted by 1k+ developers — github.com/vue-formik/vue-formik",
			},
			{
				title: "Vue3-Ytframe",
				line: "Open-source Vue 3 library for embedding YouTube videos via the IFrame API — kiranparajuli589.github.io/vue3-ytframe",
			},
		],
		react: [
			{
				title: "Browser Recording System",
				line: "Flagship WebRTC/MediaRecorder suite for insurance brokerages—replaced a legacy recorder and enabled scalable training/onboarding without third-party SDKs",
			},
		],
	};

	return {
		summary: summaries[variant],
		skills: skills[variant],
		experiences: sortExperiencesForPdf(experiences, variant).map((exp) =>
			mapExperienceToPdf(exp, variant),
		),
		selectedProjects: selectedProjects[variant],
	};
}

// We'll create the base resume object first, then calculate and update summary
const baseResume = {
	personalInfo: {
		name: "Kiran Parajuli",
		role: "Senior Frontend Engineer",
		municipality: "Panchkhal, Kavre",
		country: "Nepal",
		postalCode: "45200",
		locationLine: "Panchkhal, Nepal | Open to remote | UTC+5:45",
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
	skills: [
		{
			title: "Frontend Engineering",
			items: [
				"React.js, Next.js, Vue.js, Nuxt, TypeScript",
				"shadcn-vue, TailwindCSS, Radix UI, PrimeVue, CoreUI",
				"State management (Redux, Zustand, Pinia, Vuex)",
				"Component-driven architecture & design systems",
				"Premium UX, accessibility (WCAG), Core Web Vitals, GSAP",
				"Performance optimization & responsive UI engineering",
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
		{
			title: "QA Automation",
			items: [
				"Playwright, Cypress, Gherkin, Cucumber.js, Jest, PHPUnit, Behat",
				"BDD end-to-end testing with Gherkin & Cucumber.js",
				"Contract, regression, and load testing (Locust)",
				"CI-based quality gates with reporting & triage rituals",
			],
		},
		{
			title: "DevOps & Platform",
			items: [
				"Docker, Docker Compose, Nginx, Apache",
				"GitLab CI, Drone CI",
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
				"Flagship browser-native suite for audio, video, screen, and picture-in-picture screen+camera capture—rebuilt from a failing legacy integration.",
			impact:
				"Became the platform's core product differentiator, eliminating third-party SDK costs and enabling broker training workflows at scale.",
			stack: [
				"React",
				"Next.js",
				"TypeScript",
				"WebRTC",
				"MediaRecorder API",
				"Canvas API",
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
			title: "Vue3-Ytframe",
			description:
				"Open-source Vue 3 component library for embedding YouTube videos using the YouTube IFrame API.",
			impact:
				"Provides a simple, composable embed experience with docs and an interactive playground for Vue developers.",
			stack: ["Vue.js", "TypeScript", "YouTube IFrame API"],
			links: {
				github: "https://github.com/kiranparajuli589/vue3-ytframe",
				demo: "https://kiranparajuli589.github.io/vue3-ytframe/#/",
			},
		},
	],
	languages: [
		{
			name: "English",
			level: "Professional working proficiency; async remote collaboration",
			icon: "twemoji:flag-united-states",
		},
		{ name: "Nepali", level: "Native", icon: "twemoji:flag-nepal" },
		{ name: "Hindi", level: "Conversational", icon: "twemoji:flag-india" },
	],
	extras: [
		"Mentor for Playwright, automation testing, and frontend best practices.",
		"Active open-source contributor across Vue and Node.js ecosystems.",
		"Strong documentation habits, code-quality discipline, and knowledge sharing.",
	],
	credentials: [
		{
			label: "ClickUp Power User",
			image: "/verified-modal-graphic-power-user-GWGUOOQT.png",
			href: "https://www.linkedin.com/posts/kiranparajuli589_im-now-verified-on-clickup-activity-7275173835375587336-k-Fs",
		},
		{
			label: "ownCloud Community Contributor",
			badge: {
				dark: "/oc-badge-community-contributor-dark.png",
				light: "/oc-badge-community-contributor-light.png",
			},
			href: "https://owncloud.com/",
		},
	],
	experiences: [
		{
			company: "Asians Group LLC",
			description:
				"A vital internet intermediary powering CDN services, custom nodes, DNS acceleration, and SSL for global customers, with internal business platforms and AI-powered employee tools.",
			roles: ["Senior Frontend Engineer"],
			employmentType: "Full-time",
			startDate: "2024",
			endDate: "Present",
			pdfMaxBullets: 5,
			pdfSortOrder: { vue: 1, react: 2 },
			technologies: [
				"Nuxt.js",
				"Vue.js",
				"TypeScript",
				"PrimeVue",
				"shadcn-vue",
				"TailwindCSS",
				"Figma",
				"CoreUI",
				"Jenkins",
				"Docker",
				"Django",
				"PostgreSQL",
				"GitHub Actions",
				"Gherkin",
				"Cucumber.js",
				"Playwright",
			],
			achievements: [
				"Spearheaded frontend delivery of the Key Account Management platform with shadcn-vue, Tailwind CSS, and Nuxt.js; co-designed backend APIs and established BDD end-to-end coverage with Gherkin, Cucumber.js, and Playwright.",
				"Delivered an AI assistance portal integrating employee calendars, Drive-sourced work records, and company data—featuring streamed HTTP chat, thinking-state UX, persistent history, translations, and theming.",
				"Architected the Asians Group public website and internal portals on Nuxt.js SSR with PrimeVue and Tailwind CSS, increasing qualified inbound leads by 25% within two quarters.",
				"Migrated the legacy WordPress stack to Nuxt.js with Django/DRF content management, structured data, and prefetching—improving Core Web Vitals (FCP 2.8s → 1.2s) and boosting organic impressions by 40%.",
				"Engineered a Lua condition expression builder with visual validation (Vue.js, CoreUI), cutting CDN policy configuration time by 60% and eliminating syntax defects before deployment.",
				"Transformed a 3,000+ line monolithic core feature into reusable mixins, components, helpers, and constants—cutting maintainability overhead by 90%+ and accelerating new feature delivery.",
				"Elevated engineering quality by mentoring backend/full-stack engineers, instituting review rubrics, and automating accessibility/performance checks in Jenkins, reducing failed deployments by 30%.",
				"Optimized loading-state and socket handling to eliminate redundant calls, improving perceived responsiveness by 40% and reducing drop-offs during critical user actions.",
			],
			achievementsPdf: [
				"Spearheaded frontend delivery of the Key Account Management platform (Nuxt.js, shadcn-vue, Tailwind CSS); co-designed backend APIs and established BDD end-to-end coverage with Gherkin, Cucumber.js, and Playwright.",
				"Delivered an AI assistance portal with streamed HTTP chat, thinking-state UX, persistent history, translations, and theming.",
				"Architected the Asians Group public website and internal portals on Nuxt.js SSR with PrimeVue and Tailwind CSS, increasing qualified inbound leads by 25% within two quarters.",
				"Migrated legacy WordPress to Nuxt.js with Django/DRF—improving Core Web Vitals (FCP 2.8s → 1.2s) and boosting organic impressions by 40%.",
				"Transformed a 3,000+ line monolithic core feature into reusable mixins, components, helpers, and constants—cutting maintainability overhead by 90%+ and accelerating new feature delivery.",
			],
			companyUrl: "https://asians.group",
			companyLogo: "asians_group.png",
			projects: [
				{
					name: "Key Account Management",
					description:
						"Led development of a key account management platform for strategic client relationships.",
					job: [
						"Led frontend development and worked closely with backend engineers to design and build APIs and services.",
						"Delivered an accessibility-first UI with shadcn-vue, TailwindCSS, and Nuxt.js.",
						"Implemented end-to-end test coverage using Gherkin, Cucumber.js, and Playwright.",
					],
					url: "https://console-kam.uat.asians.group",
				},
				{
					name: "Company Smart Assistance",
					description:
						"ChatGPT-like AI portal for querying employee calendars, daily work records from Drive, and other company data via conversational chat.",
					job: [
						"Engineered a premium AI chat UI with sleek transitions, WCAG-aligned patterns, and performance-tuned API orchestration.",
						"Streamed server HTTP responses with live thinking indicators and finalized answer delivery.",
						"Implemented chat history propagation, translations, and theming with an extensive color palette.",
					],
					url: "https://aeri.uat.asians.group",
				},
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
						"Migrated the legacy WordPress stack to Nuxt.js with Django/DRF content management, structured data, and prefetching—improving Core Web Vitals (FCP 2.8s → 1.2s) and boosting organic impressions by 40%.",
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
			roles: ["Senior Frontend Engineer"],
			employmentType: "Part-time Contract",
			concurrent: true,
			startDate: "2024",
			endDate: "2025",
			pdfMaxBullets: 4,
			pdfMaxBulletsReact: 6,
			pdfSortOrder: { vue: 2, react: 1 },
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
				"Led a five-engineer squad delivering multi-tenant brokerage features, backlog prioritization, and code-quality initiatives across the platform.",
				"Owned ourBuddy's flagship browser recording suite—the product's core differentiator—rebuilding a failing legacy recorder into React, Next.js, WebRTC, and MediaRecorder; enabled scalable broker training and onboarding workflows while eliminating third-party SDK costs and optimizing blob output for Java backend ingestion.",
				"Modernized a legacy React codebase into a modular Next.js architecture with shared UI primitives, achieving a 40% reduction in build time and unlocking SSR caching.",
				"Drove performance optimization with budgets, lazy loading, and real-user monitoring, improving LCP from 3.1s to 1.7s across top customer workspaces.",
				"Delivered document and media workflows for training and onboarding, including a searchable PDF viewer, streaming media players, and interactive quizzes.",
				"Delivered a full-SSR help center with React/Next.js and Flask/Python, achieving a Lighthouse score of 97 for performance and usability.",
				"Established Playwright, API, and contract-test suites in CI, reducing production regressions by 35%.",
				"Owned release cadences—sprint planning, QA sign-off, and phased rollouts—achieving 95% on-time delivery with a sub-1% bug escape rate.",
			],
			achievementsPdf: [
				"Led a five-engineer squad delivering multi-tenant brokerage features, backlog prioritization, and code-quality initiatives across the platform.",
				"Owned the flagship browser recording suite—rebuilt a failing legacy recorder on React, Next.js, WebRTC, and MediaRecorder; enabled scalable broker training and onboarding while eliminating third-party SDK costs.",
				"Modernized a legacy React codebase into a modular Next.js architecture with shared UI primitives, achieving a 40% reduction in build time and unlocking SSR caching.",
				"Established Playwright, API, and contract-test suites in CI, reducing production regressions by 35%.",
			],
			achievementsPdfReact: [
				"Owned ourBuddy's flagship browser recording suite—the product's core differentiator—rebuilding a failing legacy recorder into React, Next.js, WebRTC, and MediaRecorder; enabled scalable broker training and onboarding workflows while eliminating third-party SDK costs and optimizing blob output for Java backend ingestion.",
				"Modernized a legacy React codebase into a modular Next.js architecture with shared UI primitives, achieving a 40% reduction in build time and unlocking SSR caching.",
				"Delivered a full-SSR help center with React/Next.js and Flask/Python, achieving a Lighthouse score of 97 for performance and usability.",
				"Shipped document and media workflows, including a searchable PDF viewer, improved media players, and interactive training quizzes.",
				"Established Playwright, API, and contract-test suites in CI, reducing production regressions by 35%.",
			],
			companyUrl: "https://www.ourbuddy.ai",
			companyLogo: "ourBuddy.png",
			projects: [
				{
					name: "Browser-Based Recording System",
					description:
						"Flagship browser-native recording suite for insurance brokerages—audio, video, screen, and picture-in-picture screen+camera capture without third-party SDKs.",
					job: [
						"Inherited a failing legacy recorder built on an outdated library with unreliable blob output; led a full rewrite using React, Next.js, WebRTC, and MediaRecorder APIs.",
						"Delivered device selection (camera/microphone), live audio visualization, recording duration limits, pre-roll countdowns, and a draggable camera canvas for screen+camera recordings.",
						"Refined UI/UX with the product designer and tuned MediaRecorder blob generation and chunk handling for reliable Java backend ingestion.",
						"Maintained CI/CD and Playwright coverage for continuous validation of recording flows across browsers.",
					],
				},
				{
					name: "ourBuddy.ai Platform",
					description:
						"Designed a comprehensive SaaS platform for insurance brokerages.",
					job: [
						"Developed and maintained the frontend with React and Next.js.",
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
						"Implemented the backend using Python (FastAPI) for data management.",
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
			employmentType: "Full-time",
			startDate: "2023",
			endDate: "2024",
			pdfMaxBullets: 3,
			pdfPageBreakBefore: true,
			pdfSortOrder: { vue: 3, react: 3 },
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
				"Defined the automation strategy across React frontends, Node.js microservices, and APIs, tripling automated test coverage within two quarters.",
				"Engineered a Locust-based load-testing suite validating 100,000+ concurrent authentication flows before enterprise launches.",
				"Drove integration of Playwright UI and contract tests into CI/CD pipelines, reducing regression escapes by 40%.",
				"Partnered with security, product, and customer teams on quality audits, release demos, and sign-off for regulated deployments.",
				"Led a Playwright training program adopted by 5+ engineers, reducing new-hire QA onboarding time by 30%.",
			],
			achievementsPdf: [
				"Defined the automation strategy across React frontends, Node.js microservices, and APIs, tripling automated test coverage within two quarters.",
				"Engineered a Locust-based load-testing suite validating 100,000+ concurrent authentication flows before enterprise launches.",
				"Drove integration of Playwright UI and contract tests into CI/CD pipelines, reducing regression escapes by 40%.",
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
			employmentType: "Full-time",
			startDate: "2022",
			endDate: "2023",
			pdfMaxBullets: 2,
			pdfSortOrder: { vue: 4, react: 4 },
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
				"Shipped full-stack capabilities across Connected Farmer and Connected Coffee—spanning React frontends, backend APIs, analytics, and QA automation pipelines.",
				"Engineered interactive dashboards with modern charting libraries, enabling agronomists to monitor field activity and performance KPIs in real time.",
				"Architected Express.js and GraphQL APIs with optimized resolvers and caching, achieving a 25% reduction in average response time.",
				"Collaborated with data and ops teams to deliver field-operations, supply-chain visibility, and stakeholder-reporting workflows.",
				"Elevated the QA team's automation capabilities by mentoring on Playwright and Cypress, achieving a 100% increase in test coverage and seamless integration into CI quality gates.",
			],
			achievementsPdf: [
				"Engineered interactive dashboards with modern charting libraries, enabling agronomists to monitor field activity and performance KPIs in real time.",
				"Architected Express.js and GraphQL APIs with optimized resolvers and caching, achieving a 25% reduction in average response time.",
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
			employmentType: "Full-time",
			startDate: "2019",
			endDate: "2022",
			includeInPdf: false,
			pdfMaxBullets: 3,
			pdfSortOrder: { vue: 5, react: 5 },
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
				"Delivered production Vue.js features, REST APIs, CLI tools, and automation suites for enterprise clients across finance, education, and SaaS.",
				"Standardized reusable UI patterns and accessibility fixes, driving a 20% reduction in front-end defect counts across key accounts.",
				"Deployed and maintained CI/CD pipelines (GitHub, GitLab, Drone, Travis) running daily UI, API, and E2E suites across 15+ repositories.",
				"Authored Cypress, Playwright, and WebSocket testing playbooks and led weekly enablement sessions for engineers and QA.",
				"Scaled documentation and onboarding through internal knowledge platforms, blogs, and workshops.",
			],
			achievementsPdf: [
				"Delivered production Vue.js features, REST APIs, CLI tools, and automation suites for enterprise clients across finance, education, and SaaS.",
				"Deployed and maintained CI/CD pipelines (GitHub, GitLab, Drone, Travis) running daily UI, API, and E2E suites across 15+ repositories.",
				"Authored Cypress, Playwright, and WebSocket testing playbooks and led weekly enablement sessions for engineers and QA.",
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
			employmentType: "Freelance",
			concurrent: true,
			includeInPdf: false,
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
					job: ["Developed the frontend using Vue.js and Vuetify."],
				},
			],
		},
		{
			company: "Sachchai Kendra Nepal",
			description:
				"A spiritual and community organization platform with social engagement and multi-branch management.",
			roles: ["Freelance Full-Stack Developer"],
			employmentType: "Part-time",
			concurrent: true,
			startDate: "2019",
			endDate: "Present",
			includeInPdf: false,
			pdfMaxBullets: 2,
			pdfMaxBulletsReact: 4,
			pdfSortOrder: { vue: 6, react: 6 },
			technologies: ["Vue.js", "Vuetify", "Django REST Framework", "MySQL"],
			achievements: [
				"Launched the production platform with Vue 3, Nuxt.js, Shadcn-vue, Tailwind CSS, and Django REST Framework—live at sachchaikendranepal.org.np.",
				"Delivered social features (posts, comments, feeds) and multi-branch administration for organizational chapters.",
				"Ongoing maintenance, media optimization, and feature updates for the live platform.",
				"Rebuilt the next-generation frontend with React, Next.js, and shadcn/ui as part of a platform modernization initiative.",
				"Upgraded platform infrastructure with Django REST APIs, CI/CD hardening, and observability-ready frontend tooling; implemented multi-placement ads management and consolidated administration into an enhanced Django admin.",
			],
			achievementsPdf: [
				"Launched the production platform with Vue 3, Nuxt.js, Shadcn-vue, Tailwind CSS, and Django REST Framework—live at sachchaikendranepal.org.np.",
				"Delivered social features and multi-branch administration; ongoing maintenance and media optimization.",
			],
			achievementsPdfReact: [
				"Rebuilt the next-generation frontend with React, Next.js, and shadcn/ui, improving load performance and maintainability across member-facing flows.",
				"Upgraded platform infrastructure with Django REST APIs, CI/CD hardening, and observability-ready frontend tooling.",
				"Implemented multi-placement ads management with configurable targeting across branch and public content surfaces.",
				"Consolidated administration into an enhanced Django admin, reducing operational overhead for chapter managers by streamlining content workflows.",
			],
			companyUrl: "https://sachchaikendranepal.org.np/",
			companyLogo: "sachchai-kendra-nepal.png",
			projects: [
				{
					name: "Sachchai Kendra Nepal Platform",
					description:
						"A website offering social media features and branch management for Sachchai Kendra Nepal.",
					job: [
						"Developed the frontend with Vue 3 and Vuetify.",
						"Developed REST APIs with Django REST Framework and MySQL.",
						"Deployed and maintained the live site at sachchaikendranepal.org.np.",
					],
					url: "https://sachchaikendranepal.org.np/",
				},
			],
		},
		{
			company: "Nipuna Prabidhik Sewa",
			description:
				"Technology service provider specializing in Web Cloud, Professional, and Managed Services.",
			roles: ["Software Developer Intern"],
			includeInYearsCalc: false,
			includeInPdf: false,
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
				"Developed APIs and integrated them with the frontend using Ajax.",
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
			description:
				"A fully typed YouTube Iframe API wrapper for Vue applications",
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
			iconColor: "text-primary",
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
			iconColor: "text-indigo-500",
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
			iconColor: "text-green-500",
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
			iconColor: "text-purple-500",
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
			degree: "Bachelor of Engineering",
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
} as Omit<ResumeInterface, "personalInfo" | "resumePdf" | "resumePdfs"> & {
	personalInfo: Omit<ResumeInterface["personalInfo"], "summary"> & {
		summary: string;
	};
};

// Calculate years of experience dynamically
const yearsOfExperience = calculateYearsOfExperience(baseResume.experiences);

const resumePdfs: Record<ResumePdfVariant, ResumePdfExport> = {
	vue: buildResumePdfVariant("vue", baseResume.experiences, yearsOfExperience),
	react: buildResumePdfVariant(
		"react",
		baseResume.experiences,
		yearsOfExperience,
	),
};

// Create the final Resume object with dynamically calculated summary
const Resume: ResumeInterface = {
	...baseResume,
	personalInfo: {
		...baseResume.personalInfo,
		summary: `Senior Frontend Engineer with ${yearsOfExperience}+ years building Vue.js, Nuxt.js, React, Next.js, and TypeScript applications and leading engineering teams. Strong in scalable UI systems, accessibility, and performance optimization. Partner with backend teams on API design (Node.js, Django) and ship cohesive product experiences. Established quality bars via test automation and CI; active open-source contributor (Vue3-Ytframe, Vue Formik). Proven track record of modernizing platforms, improving performance by 40%+, and mentoring engineers.`,
	},
	resumePdfs,
	resumePdf: resumePdfs.vue,
};

export default Resume;
export { calculateYearsOfExperience, yearsOfExperience };

export function getResumePdf(
	variant: ResumePdfVariant = "vue",
): ResumePdfExport {
	return Resume.resumePdfs[variant];
}
