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
	AiEngineering,
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
	aiEngineering: AiEngineering;
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

function calculateSeniorFrontendYears(experiences: Experience[]): number {
	const seniorRoles = experiences.filter((exp) =>
		exp.roles.some((role) => /senior frontend engineer/i.test(role)),
	);
	if (seniorRoles.length === 0) return 0;
	const earliestYear = Math.min(
		...seniorRoles.map((exp) => parseInt(exp.startDate, 10)),
	);
	return new Date().getFullYear() - earliestYear;
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
		roles: exp.pdfRoles ?? exp.roles,
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

const aiEngineering: AiEngineering = {
	title: "AI-Augmented Engineering",
	subtitle:
		"Daily workflow tools and practices for faster, higher-quality delivery.",
	tools: [
		{ tooltip: "Cursor", image: "cursor.png" },
		{ tooltip: "Claude", image: "claude.png" },
		{
			tooltip: "Claude Code",
			image: "claude-code.png",
			imageDark: "claude-code-dark.png",
		},
		{ tooltip: "ChatGPT", image: "chatgpt.png" },
		{ tooltip: "Codex", image: "codex.png", imageDark: "codex-dark.png" },
	],
	practices: [
		"MCP server setup and context-aware tooling",
		"Cursor rules, Agent Skills, and project conventions",
		"Token-efficient prompts and model selection",
		"AI-assisted code review, refactoring, and test generation",
	],
	pdfToolsLine: "Cursor, Claude, Claude Code, ChatGPT, Codex",
	pdfPracticesLine:
		"MCP servers, rules/skills, token-efficient prompts, AI code reviews",
};

const figmaSummaryClause =
	"Figma design-to-code from wireframes and prototypes through stakeholder review to production UI.";

function buildWebSummary(years: number): string {
	return `Senior Frontend Engineer with ${years}+ years in frontend and product UI delivery. Led CDN console modernization (Vue 2 to Vue 3, shadcn-vue, Tailwind)—high-traffic tables, WebSocket batch queue, and complex forms. ${figmaSummaryClause}`;
}

function buildResumePdfVariant(
	variant: ResumePdfVariant,
	experiences: Experience[],
	years: number,
	_seniorYears: number,
): ResumePdfExport {
	const summaries: Record<ResumePdfVariant, string> = {
		vue: `Senior Frontend Engineer with ${years}+ years in frontend and product UI delivery. Led CDN console modernization (Vue 2 to Vue 3, shadcn-vue, Tailwind)—high-traffic tables, WebSocket batch queue, and complex forms. ${figmaSummaryClause}`,
		react: `Senior Frontend Engineer with ${years}+ years in frontend and product UI delivery. Rebuilt ourBuddy's flagship WebRTC recording suite on React/Next.js and delivered a Lighthouse 97 SSR help center. ${figmaSummaryClause}`,
	};

	const skills: Record<ResumePdfVariant, ResumePdfExport["skills"]> = {
		vue: [
			{
				title: "Frontend",
				items: [
					"Primary: Vue.js, Nuxt.js, TypeScript, shadcn-vue, Tailwind CSS, Figma (wireframing, prototyping, design variables)",
					"Also: React.js, Next.js, PrimeVue, Radix UI, design systems, WCAG, Core Web Vitals, i18n",
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
					"Primary: React.js, Next.js, TypeScript, custom hooks, shadcn/ui, Tailwind CSS, Zustand, Tanstack Query, Figma (wireframing, prototyping, design variables)",
					"Also: Vue.js, Nuxt.js, SSR/SSG, Radix UI, Redux, design systems, WCAG, Core Web Vitals, i18n",
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
					"Playwright, Cypress, Jest, React Testing Library, BDD E2E, API/contract testing, CI quality gates",
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
				title: "CDN Management Console",
				line: "Vue 2 to Vue 3 CDN console—60% faster tables (Chrome Performance, 5k+ rows), WebSocket batch queue 35%+ faster vs prior flow",
			},
			{
				title: "Lua Expression Builder",
				line: "Drag-and-drop CDN policy builder—replaced manual Lua editing and eliminated syntax errors pre-deploy",
			},
			{
				title: "Key Account Management",
				line: "Internal Figma-led platform project—dashboards, forms, filters on Nuxt.js/shadcn-vue with BDD E2E (Playwright)",
			},
			{
				title: "Vue Formik",
				line: "Open-source Vue 3 form library (maintainer) — github.com/vue-formik/vue-formik",
			},
		],
		react: [
			{
				title: "Browser Recording System",
				line: "WebRTC/MediaRecorder suite for insurance brokerages—replaced a legacy recorder; eliminated third-party SDK costs for broker training workflows — react-rtc.netlify.app/en",
			},
			{
				title: "SSR Help Center",
				line: "Lighthouse 97 help center—React/Next.js + Flask/Python SSR, searchable docs and training UX",
			},
			{
				title: "Vue Formik",
				line: "Open-source Vue 3 form library (maintainer) — github.com/vue-formik/vue-formik",
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
		municipality: "Kathmandu",
		country: "Nepal",
		postalCode: "44600",
		locationLine: "Kathmandu, Nepal | Open to remote | UTC+5:45",
		phone: "+977 984-3530425",
		email: "kiranparajuli589@gmail.com",
		devto: "https://dev.to/kiranparajuli589",
		linkedin: "https://linkedin.com/in/kiranparajuli589",
		github: "https://github.com/kiranparajuli589",
		website: "https://kiranparajuli.com.np",
		bio: "Senior Frontend Engineer | React.js • Vue.js • TypeScript • Figma design-to-code • performance and design systems",
		heroTagline:
			"Modernizing high-traffic product UIs—Vue/React, design systems, and performance at scale.",
		summary: "", // Will be set after experiences are defined
	},
	skills: [
		{
			title: "Frontend Engineering",
			items: [
				"React.js, Next.js, Vue.js, Nuxt, TypeScript",
				"shadcn-vue, TailwindCSS, Radix UI, PrimeVue, CoreUI",
				"State management (Redux, Zustand, Pinia, Vuex)",
				"Component-driven architecture & design systems",
				"Figma: wireframing, prototyping, design systems & design variables",
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
			title: "Quality Engineering",
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
		{
			title: "AI-Augmented Engineering",
			items: [
				`${aiEngineering.pdfToolsLine} — ${aiEngineering.pdfPracticesLine}`,
				...aiEngineering.practices,
			],
		},
	],
	aiEngineering,
	leadershipHighlights: [
		"Architect scalable UI platforms that balance performance, accessibility, and velocity.",
		"Own the frontend roadmap—from modernization sequencing to design system rollout.",
		"Mentor engineers through pairing, structured reviews, and onboarding playbooks.",
		"Partner with design, product, and backend teams to ship cohesive user journeys.",
		"Uphold engineering excellence via coding standards, testing strategy, and CI quality bars.",
	],
	selectedProjects: [
		{
			title: "CDN Management Console",
			description:
				"Core internal CDN management console—Vue 2 to Vue 3 modernization with shadcn-vue, Tailwind, and WebSocket batch operations.",
			impact:
				"60% faster table render and 35%+ faster batch operations via centralized WebSocket queue; fully mobile-responsive UX.",
			stack: [
				"Vue 3",
				"shadcn-vue",
				"Tailwind CSS",
				"WebSockets",
				"CoreUI",
				"TypeScript",
			],
		},
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
				demo: "https://react-rtc.netlify.app/en",
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
				"Open-source maintainer—consistent validation patterns and improved developer experience for Vue 3 forms.",
			stack: ["Vue.js", "TypeScript", "Formik", "Yup"],
			links: {
				github: "https://github.com/vue-formik/vue-formik",
				demo: "https://vue-formik.netlify.app/",
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
			startDate: "2025",
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
				"WebSockets",
				"JIRA",
				"Jenkins",
				"Docker",
				"Django",
				"PostgreSQL",
				"GitHub Actions",
				"Gherkin",
				"Cucumber.js",
				"Playwright",
				"Google Tag Manager",
				"Google Analytics 4",
			],
			achievements: [
				"Primary frontend engineer on CDN console migration Vue 2 to Vue 3 (shadcn-vue, Tailwind CSS); extended legacy CoreUI via documentation research and custom components.",
				"Optimized data tables with thousands of rows—60% faster render (Chrome Performance on 5k+ row datasets vs legacy renderer); centralized WebSocket batch queue—35%+ faster batch ops vs prior sequential handling.",
				"Delivered mobile-responsive console UX—scrollable large dialogs, sticky tabs on tabbed forms; refactored 3,000+ line monolithic modules into reusable mixins and components.",
				"Built complex tabbed forms and co-designed REST APIs with backend teams; shipped via JIRA and Jenkins with cross-team i18n (product, CS, backend).",
				"Redesigned in Figma and rebuilt the Asians Group public website and internal portals on Nuxt.js SSR (PrimeVue, Tailwind CSS), migrating off the legacy WordPress stack to Django/DRF—improved sitemaps, canonical URLs, reachable translated routes, structured data, and prefetching (Core Web Vitals FCP 2.8s → 1.2s, +40% organic impressions); implemented GTM/GA4 with careers-page and job-application custom events and site-wide tracking, measurably increasing qualified inbound leads (GA4-tracked, ~25% QoQ in internal analytics).",
				"Built a Figma design system—source of truth in Figma with project themes and design variables; implemented reusable components in Vue.js for legacy Ant Design products with team workshops and documentation.",
				"Engineered a Lua condition expression builder with visual validation (Vue.js, CoreUI)—replacing manual Lua editing and eliminating syntax defects before deployment.",
				"Internal platform project: Owned KAM end-to-end from wireframes and Figma (dashboards, tables, forms, filters) through product-owner review to production with shadcn-vue, Tailwind CSS, and Nuxt.js; co-designed backend APIs and established BDD end-to-end coverage with Gherkin, Cucumber.js, and Playwright.",
				"Delivered an AI assistance portal integrating employee calendars, Drive-sourced work records, and company data—featuring streamed HTTP chat, thinking-state UX, persistent history, translations, and theming.",
				"Elevated engineering quality by mentoring backend/full-stack engineers, instituting review rubrics, and automating accessibility/performance checks in Jenkins, noticeably reducing failed deployments across two release cycles.",
			],
			achievementsPdf: [
				"Primary frontend engineer on CDN console migration Vue 2 to Vue 3 (shadcn-vue, Tailwind); extended CoreUI via documentation research and custom components; complex tabbed forms with API co-design; JIRA/Jenkins releases with cross-team i18n.",
				"Optimized tables with thousands of rows—60% faster render (Chrome Performance, 5k+ rows vs legacy); centralized WebSocket batch queue—35%+ faster batch ops vs prior sequential handling.",
				"Shipped mobile-responsive console UX—scrollable dialogs, sticky tabbed forms; refactored 3,000+ line monolithic modules into mixins and reusable components.",
				"Internal platform project: Figma-led Key Account Management UI on Nuxt.js/shadcn-vue; co-designed APIs; BDD E2E with Playwright.",
				"Redesigned Asians Group public website in Figma (Nuxt.js SSR); GTM/GA4 tracking showed measurably more qualified leads (~25% QoQ, internal analytics).",
			],
			achievementsPdfReact: [
				"Primary frontend engineer on CDN console—complex operational UI, API co-design, and JIRA/Jenkins delivery with product and backend partners.",
				"High-traffic tables—60% faster render (benchmarked on 5k+ rows) and centralized batch queue 35%+ faster ops vs prior flow.",
				"Mobile-responsive UX with scrollable dialogs and sticky tabs; refactored 3,000+ line monolithic modules into reusable components.",
				"Internal platform project: Figma-led Key Account Management UI; BDD E2E with Playwright.",
				"Public website redesign—GTM/GA4 tracking showed measurably more qualified leads (~25% QoQ, internal analytics).",
			],
			companyUrl: "https://asians.group",
			companyLogo: "asians_group.png",
			projects: [
				{
					name: "CDN Management Console",
					description:
						"Core internal CDN management console for customer and infrastructure operations.",
					job: [
						"Migrated legacy Vue 2 console to Vue 3 with shadcn-vue and Tailwind CSS.",
						"Extended legacy CoreUI via documentation research and custom efficient components during migration.",
						"Built complex tabbed forms and co-designed REST APIs with backend teams.",
						"Optimized tables for thousands of rows with dynamic row rendering (60% faster render).",
						"Implemented a centralized WebSocket batch queue tuned to backend/infra—35%+ faster batch operations with informative progress states and messages.",
						"Delivered major UI/UX improvements: fully mobile-responsive layouts, scrollable large dialogs, sticky tabs on tabbed forms.",
						"Shipped via JIRA-tracked releases and Jenkins CI/CD; coordinated i18n with product and CS teams.",
						"Refactored 3,000+ line monolithic modules into reusable mixins and components.",
					],
				},
				{
					name: "Key Account Management",
					description:
						"Internal platform project: key account management platform for strategic client relationships.",
					job: [
						"Owned end-to-end UX from wireframes and Figma through product-owner review—designed dashboards, lists, forms, filters, and tables before implementation.",
						"Co-designed APIs with backend engineers; delivered an accessibility-first UI with shadcn-vue, TailwindCSS, and Nuxt.js.",
						"Implemented end-to-end test coverage using Gherkin, Cucumber.js, and Playwright.",
					],
				},
				{
					name: "Company Smart Assistance",
					description:
						"ChatGPT-like AI portal for querying employee calendars, daily work records from Drive, and other company data via conversational chat.",
					job: [
						"Engineered an AI chat UI with WCAG-aligned patterns, streamed HTTP responses, live thinking indicators, and performance-tuned API orchestration.",
						"Implemented chat history propagation, translations, and theming with an extensive color palette.",
					],
				},
				{
					name: "Asians Group Public Website",
					description:
						"Developed a comprehensive public website for Asians Group LLC.",
					job: [
						"Redesigned the public site in Figma and implemented the frontend using PrimeVue, TailwindCSS, Vue.js, and Nuxt.js.",
						"Implemented GTM/GA4 with custom careers and job-application events, site-wide public-site tracking, and ongoing analytics monitoring.",
						"Improved sitemaps, canonical URLs, and i18n translation URL reachability for SEO and discoverability.",
						"Integrated Django/DRF content APIs for dynamic CMS and careers workflows.",
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
						"Architected a visual rule builder with inline validation, mapping complex Lua conditions to an accessible form UI.",
						"Eliminated syntax errors before deployment by validating expressions client-side ahead of backend submission.",
					],
					url: "https://expr-builder.netlify.app/#/rule",
				},
				{
					name: "Design System",
					description:
						"Created a design system to ensure consistency across all products.",
					job: [
						"Built a Figma component library with project themes, design variables, and prototyping as the cross-product source of truth.",
						"Implemented reusable Vue.js and Ant Design components from Figma specs for legacy product surfaces.",
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
			employmentType: "Contract",
			startDate: "2023",
			endDate: "2025",
			pdfMaxBullets: 4,
			pdfMaxBulletsReact: 5,
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
				"Led delivery across a five-engineer squad—backlog prioritization, release cadence, and code-quality initiatives across the platform.",
				"Partnered with UX design on Figma handoffs—React/Next.js implementation from specs across dashboards, lists, forms, and training workflows.",
				"Owned ourBuddy's flagship browser recording suite—the product's core differentiator—rebuilding a failing legacy recorder into React, Next.js, WebRTC, and MediaRecorder; enabled scalable broker training and onboarding workflows while eliminating third-party SDK costs and optimizing blob output for Java backend ingestion.",
				"Modernized a legacy React codebase into a modular Next.js architecture with shared UI primitives, achieving a 40% reduction in build time and unlocking SSR caching.",
				"Drove performance optimization with budgets, lazy loading, and real-user monitoring, improving LCP from 3.1s to 1.7s across top customer workspaces.",
				"Delivered document and media workflows for training and onboarding, including a searchable PDF viewer, streaming media players, and interactive quizzes.",
				"Delivered a full-SSR help center with React/Next.js and Flask/Python, achieving a Lighthouse score of 97 for performance and usability.",
				"Established Playwright, API, and contract-test suites in CI, reducing production regressions by 35%.",
				"Owned release cadences—sprint planning, QA sign-off, and phased rollouts—with consistently high on-time delivery and a low bug-escape rate.",
			],
			achievementsPdf: [
				"Led delivery across a five-engineer squad—backlog prioritization, release cadence, and code-quality initiatives across the platform.",
				"Owned the flagship browser recording suite—rebuilt a failing legacy recorder on React, Next.js, WebRTC, and MediaRecorder; enabled scalable broker training and onboarding while eliminating third-party SDK costs.",
				"Partnered with UX design on Figma handoffs—React/Next.js implementation from specs across dashboards, lists, forms, and training workflows; modernized a legacy codebase into modular Next.js with shared UI primitives, cutting build time 40% and unlocking SSR caching.",
				"Established Playwright, API, and contract-test suites in CI, reducing production regressions by 35%.",
			],
			achievementsPdfReact: [
				"Led delivery across a five-engineer squad—backlog prioritization, release cadence, and code-quality initiatives across the platform.",
				"Owned ourBuddy's flagship browser recording suite—the product's core differentiator—rebuilding a failing legacy recorder into React, Next.js, WebRTC, and MediaRecorder; enabled scalable broker training and onboarding workflows while eliminating third-party SDK costs and optimizing blob output for Java backend ingestion.",
				"Partnered with UX design on Figma handoffs—React/Next.js implementation from specs across dashboards, lists, forms, and training workflows; modernized a legacy codebase into modular Next.js with shared UI primitives, cutting build time 40% and unlocking SSR caching.",
				"Delivered a Lighthouse 97 SSR help center and document/media training workflows (searchable PDF viewer, streaming players, interactive quizzes) with React/Next.js and Flask/Python.",
				"Established Playwright, API, and contract-test suites in CI, reducing production regressions by 35%.",
			],
			companyUrl: "https://www.ourbuddy.ai",
			companyLogo: "ourBuddy.png",
			projects: [
				{
					name: "Browser-Based Recording System",
					description:
						"Flagship browser-native recording suite for insurance brokerages—audio, video, screen, and picture-in-picture screen+camera capture without third-party SDKs.",
					url: "https://react-rtc.netlify.app/en",
					job: [
						"Inherited a failing legacy recorder built on an outdated library with unreliable blob output; led a full rewrite using React, Next.js, WebRTC, and MediaRecorder APIs.",
						"Delivered device selection (camera/microphone), live audio visualization, recording duration limits, pre-roll countdowns, and a draggable camera canvas for screen+camera recordings.",
						"Reviewed Figma designs with the product designer and implemented UI from specs; tuned MediaRecorder blob generation and chunk handling for reliable Java backend ingestion.",
						"Maintained CI/CD and Playwright coverage for continuous validation of recording flows across browsers.",
					],
				},
				{
					name: "ourBuddy.ai Platform",
					description:
						"Designed a comprehensive SaaS platform for insurance brokerages.",
					job: [
						"Modernized the brokerage platform frontend with React, Next.js, shared UI primitives, and SSR caching—40% build-time reduction.",
						"Implemented Figma-spec UI across dashboards, lists, forms, and multi-tenant training workflows.",
						"Maintained CI/CD pipelines with Playwright coverage for deployment confidence.",
						"Authored technical documentation for component patterns and release workflows.",
					],
				},
				{
					name: "Astral Nexus",
					description:
						"A client management system with activity logs and site blogs.",
					job: [
						"Built a dynamic React/Next.js frontend for client records, activity logs, and blog content.",
						"Implemented a FastAPI (Python) backend with structured data models for client and activity management.",
					],
				},
				{
					name: "Quality Assurance",
					description:
						"Established a meticulous QA process for the ourBuddy.ai platform.",
					job: [
						"Built and maintained a Playwright-based E2E framework covering critical broker workflows.",
						"Integrated automated suites into CI/CD for gated, deployment-ready releases.",
						"Ran QA enablement sessions and authored test documentation to standardize coverage across the team.",
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
			concurrent: true,
			startDate: "2023",
			endDate: "2024",
			includeInPdf: false,
			pdfMaxBullets: 3,
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
			roles: ["Frontend Developer"],
			employmentType: "Full-time",
			startDate: "2022",
			endDate: "2023",
			pdfMaxBullets: 2,
			pdfSortOrder: { vue: 3, react: 3 },
			technologies: [
				"Vue.js 3",
				"Vuetify",
				"JavaScript",
				"TypeScript",
				"GraphQL",
				"Express.js",
				"Geo maps",
				"JIRA",
				"Git",
				"Jest",
				"Cypress",
				"PostgreSQL",
			],
			achievements: [
				"Frontend developer on Connected Farmer and Connected Coffee—supporting backend teams while owning high-quality dashboards, geo maps, and KPI chart visualizations in Vue 3 and Vuetify.",
				"Delivered complex filters, multi-step forms, and rigorous client-side validation with pixel-perfect design-to-code from Figma; tracked delivery in JIRA with Git-based workflows.",
				"Supported Express.js and GraphQL API integration and resolver tuning with backend engineers—a meaningful GraphQL p95 latency reduction after caching optimizations.",
				"Collaborated with data and ops teams on field-operations, supply-chain visibility, and stakeholder-reporting UI workflows.",
				"Contributed Cypress and Jest coverage integrated into CI quality gates alongside the QA team.",
			],
			achievementsPdf: [
				"Built agronomy dashboards in Vue 3 and Vuetify—geo maps, complex filters, KPI charts, and pixel-perfect design-to-code from Figma; rigorous form validation across Connected Farmer and Connected Coffee.",
				"Supported backend integration on GraphQL/Express APIs while shipping via JIRA and Git; Cypress/Jest coverage in CI quality gates.",
			],
			companyUrl: "https://dimitra.io/about-us/",
			companyLogo: "dimitra.ico",
			projects: [
				{
					name: "Connected Farmer & Connected Coffee",
					description:
						"AgTech platforms for field operations, supply-chain visibility, and stakeholder reporting.",
					job: [
						"Built interactive dashboards with geo maps and chart libraries for real-time field activity and performance KPIs.",
						"Implemented complex filters, multi-step forms, and client-side validation with Vue 3 and Vuetify.",
						"Translated Figma specs into pixel-perfect production UI; coordinated API contracts with backend teams on GraphQL and Express.js.",
						"Delivered features through JIRA-tracked sprints with Git-based CI and automated Cypress/Jest tests.",
					],
				},
			],
		},
		{
			company: "JankariTech Pvt. Ltd.",
			description: "An IT company specializing in test automation solutions.",
			roles: ["Software Developer", "Junior Programmer"],
			pdfRoles: ["Software Developer"],
			employmentType: "Full-time",
			startDate: "2019",
			endDate: "2022",
			pdfMaxBullets: 2,
			pdfSortOrder: { vue: 4, react: 4 },
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
				"Delivered production Vue.js features and reusable UI patterns with accessibility fixes for enterprise clients across finance, education, and SaaS.",
				"Contributed to ownCloud open-source web UI work; shipped features with CI-backed UI, API, and E2E validation across client repositories.",
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
			technologies: [
				"VueJs",
				"VuetifyJs",
				"Sass",
				"GitHub",
				"Web3",
				"MetaMask",
			],
			achievements: [
				"Built a Bitcoin dashboard with MetaMask Web3 login, user-configurable currency preferences, and chart-based market visualization (Vue.js, Vuetify).",
				"Delivered a leave-management dashboard and gained experience in remote freelance delivery and time management.",
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
					name: "Bitcoin Dashboard",
					description:
						"A Web3-enabled bitcoin dashboard with wallet authentication, user currency preferences, and data visualizations.",
					job: [
						"Developed the frontend using Vue.js and Vuetify.",
						"Integrated MetaMask for Web3 wallet login and session handling.",
						"Implemented user preference flows to set and persist preferred fiat/crypto display currencies.",
						"Built chart and graph views for survey and market data presentation.",
					],
				},
			],
		},
		{
			company: "Sachchai Kendra Nepal",
			description:
				"A spiritual and community organization platform with social engagement and multi-branch management.",
			roles: ["Freelance Full-Stack Developer"],
			employmentType: "Part-time",
			startDate: "2019",
			endDate: "Present",
			pdfMaxBullets: 1,
			pdfMaxBulletsReact: 1,
			pdfSortOrder: { vue: 5, react: 5 },
			technologies: [
				"Vue.js",
				"Nuxt.js",
				"Shadcn-vue",
				"Tailwind CSS",
				"React.js",
				"Next.js",
				"shadcn/ui",
				"Figma",
				"Django REST Framework",
				"MySQL",
			],
			achievements: [
				"Led a full platform redesign in Figma through stakeholder review; launched a production Vue 3 / Nuxt.js / Shadcn-vue site—live at sachchaikendranepal.org.np.",
				"Built a robust Django REST Framework backend with proper media management—structured uploads, storage, serving, and optimization for branch and public content.",
				"Rebuilt the next-generation member-facing frontend in Figma with Next.js, React, and shadcn/ui.",
				"Delivered social features (posts, comments, feeds) and multi-branch administration for organizational chapters.",
				"Ongoing maintenance, CI/CD hardening, multi-placement ads management, and enhanced Django admin for consolidated chapter administration.",
			],
			achievementsPdf: [
				"Part-time freelance: Figma-led platform redesign; shipped Vue 3/Nuxt production site with Django REST backend—live at sachchaikendranepal.org.np.",
			],
			achievementsPdfReact: [
				"Part-time freelance: Figma-led redesign and Next.js/React/shadcn/ui rebuild with Django REST backend—live at sachchaikendranepal.org.np.",
			],
			companyUrl: "https://sachchaikendranepal.org.np/",
			companyLogo: "sachchai-kendra-nepal.png",
			projects: [
				{
					name: "Sachchai Kendra Nepal Platform",
					description:
						"A website offering social media features and branch management for Sachchai Kendra Nepal.",
					job: [
						"Led a Figma-first platform redesign with stakeholder review before implementation.",
						"Shipped a production Vue 3 / Nuxt.js frontend with Shadcn-vue and Tailwind CSS.",
						"Built robust Django REST Framework APIs with proper media management (uploads, storage, serving, optimization).",
						"Modernizing the legacy site with Next.js, React, and shadcn/ui.",
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
				"Product UI delivery from Figma wireframes and prototypes through stakeholder review to production—complex dashboards, forms, and high-traffic data surfaces with Vue.js, React.js, and TypeScript.",
			icon: "web-box",
			iconColor: "text-primary",
			experience: new Date().getFullYear() - 2018,
		},
		{
			name: "Backend Collaboration",
			description:
				"API design and integration supporting frontend features—REST and GraphQL contracts, data modeling, and performance tuning alongside backend teams.",
			icon: "server",
			iconColor: "text-indigo-500",
			experience: new Date().getFullYear() - 2018,
		},
		{
			name: "DevOps",
			description:
				"CI/CD pipelines, deployment patterns, and release automation for web applications—Jenkins, GitHub Actions, and containerized delivery workflows.",
			icon: "cloud",
			iconColor: "text-purple-500",
			experience: new Date().getFullYear() - 2020,
		},
		{
			name: "Quality Engineering",
			description:
				"Quality bars I bring to frontend delivery—Playwright and BDD E2E coverage, CI quality gates, and test automation that protects release velocity without slowing product teams.",
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
				{ tooltip: "RadixUI", image: "radixui.png", imgClass: "dark:invert" },
				{ tooltip: "Axios", image: "axios.svg" },
				{ tooltip: "GSAP", image: "gsap.png" },
				{ tooltip: "Tanstack Query", image: "tanstack-query.png" },
				{ tooltip: "Zustand", image: "zustand.png" },
				{ tooltip: "Pinia", image: "pinia.png" },
				{ tooltip: "Redux Toolkit", image: "redux.png" },
				{ tooltip: "Shadcn/UI", image: "shadcn-ui.png" },
				{ tooltip: "Zod", image: "zod.png" },
				{ tooltip: "Yup", image: "yup.png" },
				{ tooltip: "i18n", image: "i18n.png" },
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
			startDate: "2015",
			endDate: "2019",
			major: "Computer Engineering",
		},
		{
			name: "Nist Banepa",
			degree: "High School",
			startDate: "2013",
			endDate: "2015",
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
const seniorFrontendYears = calculateSeniorFrontendYears(
	baseResume.experiences,
);

const resumePdfs: Record<ResumePdfVariant, ResumePdfExport> = {
	vue: buildResumePdfVariant(
		"vue",
		baseResume.experiences,
		yearsOfExperience,
		seniorFrontendYears,
	),
	react: buildResumePdfVariant(
		"react",
		baseResume.experiences,
		yearsOfExperience,
		seniorFrontendYears,
	),
};

// Create the final Resume object with dynamically calculated summary
const Resume: ResumeInterface = {
	...baseResume,
	personalInfo: {
		...baseResume.personalInfo,
		summary: buildWebSummary(yearsOfExperience),
	},
	resumePdfs,
	resumePdf: resumePdfs.vue,
};

export default Resume;
export {
	calculateYearsOfExperience,
	calculateSeniorFrontendYears,
	yearsOfExperience,
	seniorFrontendYears,
};

export function getResumePdf(
	variant: ResumePdfVariant = "vue",
): ResumePdfExport {
	return Resume.resumePdfs[variant];
}
