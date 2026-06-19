import Resume, { getResumePdf, yearsOfExperience } from "~/utils/resume";
import type { ResumePdfVariant } from "~/customTypes";

const personalInfo = Resume.personalInfo;

const ACHIEVEMENT_VERB_PATTERN =
	/^(Architected|Built|Created|Delivered|Developed|Drove|Engineered|Established|Implemented|Introduced|Led|Migrated|Modernized|Optimized|Owned|Partnered|Redesigned|Shipped|Shrank|Spearheaded|Transformed|Upgraded)\s+(.*)$/i;

/** Lowercase verb + rest for embedding after "I" or "I also". */
const formatAchievementForFirstPerson = (achievement: string): string => {
	if (!achievement) return "";
	const trimmed = achievement.replace(/\.$/, "");
	const match = trimmed.match(ACHIEVEMENT_VERB_PATTERN);
	if (!match) {
		return trimmed.charAt(0).toLowerCase() + trimmed.slice(1);
	}
	const verb = match[1].toLowerCase();
	const rest = match[2].charAt(0).toLowerCase() + match[2].slice(1);
	return `${verb} ${rest}`;
};

/** Same phrasing for "My experience …" closings. */
const formatAchievementForExperience = formatAchievementForFirstPerson;

type JobThemes = {
	design: boolean;
	ai: boolean;
	qa: boolean;
};

function detectJobThemes(jobDescription: string): JobThemes {
	const lower = jobDescription.toLowerCase();
	return {
		design:
			/\b(figma|design system|design-to-code|wireframe|prototype|prototyping|ux\/ui|ui\/ux|pixel-perfect|visual design|user interface design)\b/.test(
				lower,
			),
		ai: /\b(ai[- ]augmented|cursor|copilot|claude|chatgpt|llm|mcp|codex)\b/.test(
			lower,
		),
		qa: /\b(qa|quality assurance|test automation|playwright|cypress|e2e|bdd)\b/.test(
			lower,
		),
	};
}

function extractTechnologiesFromPdfSkills(
	skills: ReturnType<typeof getResumePdf>["skills"],
	themes: JobThemes,
): string {
	const frontend = skills.find((skill) => skill.title === "Frontend")?.items[0];
	if (!frontend) return "";

	const items = frontend.split(", ").filter(Boolean);
	const core = items.slice(0, 5);
	const figma = items.find((item) => /^figma\b/i.test(item));

	if (themes.design && figma && !core.some((item) => /^figma\b/i.test(item))) {
		core.push(figma);
	}

	return core.join(", ");
}

function getStackFallback(
	variant: ResumePdfVariant,
	themes: JobThemes,
): string {
	const base =
		variant === "react"
			? "React.js, Next.js, TypeScript, shadcn/ui, and Tailwind CSS"
			: "Vue.js, Nuxt.js, TypeScript, shadcn-vue, and Tailwind CSS";
	return themes.design ? `${base}, and Figma design-to-code` : base;
}

function resolveStackVariantFromJobDescription(
	jobDescription: string,
	activeVariant: ResumePdfVariant,
): ResumePdfVariant {
	const lower = jobDescription.toLowerCase();
	const prefersReact = /\b(react(\.js)?|next(\.js)?|nextjs)\b/.test(lower);
	const prefersVue = /\b(vue(\.js)?|nuxt(\.js)?|nuxtjs)\b/.test(lower);
	if (prefersReact && !prefersVue) return "react";
	if (prefersVue && !prefersReact) return "vue";
	return activeVariant;
}

function splitSummarySentences(summary: string): string[] {
	return summary
		.split(/(?<=[.!?])\s+/)
		.map((sentence) => sentence.trim())
		.filter(Boolean);
}

function getSummaryExcerpt(
	summary: string,
	themes: JobThemes,
	hasJobDescription: boolean,
): string {
	const sentences = splitSummarySentences(summary);
	if (!hasJobDescription) return "";

	const lead = sentences.slice(0, 2).join(" ");
	const extras: string[] = [];

	if (themes.design) {
		const figmaSentence = sentences.find((sentence) =>
			/figma|design-to-code|wireframe/i.test(sentence),
		);
		if (figmaSentence && !lead.includes(figmaSentence)) {
			extras.push(figmaSentence);
		}
	}

	if (themes.ai) {
		const aiSentence = sentences.find((sentence) =>
			/ai-augmented|cursor|claude|mcp/i.test(sentence),
		);
		if (aiSentence && !lead.includes(aiSentence)) {
			extras.push(aiSentence);
		}
	}

	return [lead, ...extras].join(" ");
}

function pickExperienceAchievements(
	experiences: ReturnType<typeof getResumePdf>["experiences"],
	themes: JobThemes,
): [string, string] {
	const recent = experiences[0];
	if (!recent?.achievements.length) return ["", ""];

	const { achievements } = recent;
	let first = achievements[0] ?? "";
	let second = achievements[1] ?? "";

	if (themes.design) {
		const designAchievement = achievements.find((achievement) =>
			/figma|design-to-code|wireframe|redesign|pixel-perfect/i.test(achievement),
		);
		if (designAchievement && designAchievement !== first) {
			second = first === designAchievement ? second : first;
			first = designAchievement;
		}
	}

	return [first, second];
}

function buildKeyQualifications(
	technologies: string,
	themes: JobThemes,
	template: CoverLetterTemplate,
): string[] {
	const qualifications = [
		`${yearsOfExperience}+ years of experience in frontend engineering, full-stack collaboration, and QA automation`,
		`Proven track record delivering high-performance applications using ${technologies}`,
		"Figma design-to-code—wireframing, prototyping, design variables, and stakeholder review through production UI",
		`${Resume.aiEngineering.pdfToolsLine} for AI-augmented delivery (${Resume.aiEngineering.pdfPracticesLine})`,
		"Strong leadership skills with experience mentoring engineers and leading cross-functional teams",
		"Expertise in performance optimization, accessibility (WCAG), and modern web standards",
		"Comprehensive experience with CI/CD pipelines, automated testing, and quality gates",
	];

	if (template === "leadership") {
		qualifications.splice(
			4,
			0,
			"Track record owning frontend roadmaps, design-system rollout, and cross-functional delivery",
		);
	}

	if (themes.qa) {
		qualifications.push(
			"Deep QA automation background with Playwright, Cypress, Gherkin/Cucumber.js, and CI quality gates",
		);
	}

	return qualifications.slice(0, 6);
}

export type CoverLetterTemplate =
	| "standard"
	| "technical"
	| "leadership"
	| "startup"
	| "enterprise";

export function getCoverLetterVariantLabel(variant: ResumePdfVariant): string {
	return variant === "react" ? "React / Next.js resume" : "Vue / Nuxt resume";
}

export const useCoverLetterGenerator = () => {
	const generateCoverLetterTemplate = (
		companyName: string,
		position: string,
		jobDescription: string,
		template: CoverLetterTemplate = "standard",
		variant: ResumePdfVariant = "vue",
	): string => {
		if (!companyName || !position) {
			return "";
		}

		const currentDate = new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		const themes = detectJobThemes(jobDescription);
		const resumePdf = getResumePdf(variant);
		const recentExperience = resumePdf.experiences[0];
		const [firstAchievement, secondAchievement] = pickExperienceAchievements(
			resumePdf.experiences,
			themes,
		);

		const stackVariant = resolveStackVariantFromJobDescription(
			jobDescription,
			variant,
		);
		const stackResumePdf = getResumePdf(stackVariant);
		const technologies =
			extractTechnologiesFromPdfSkills(stackResumePdf.skills, themes) ||
			getStackFallback(stackVariant, themes);

		const formattedFirstAchievement =
			formatAchievementForFirstPerson(firstAchievement);
		const formattedSecondAchievement =
			formatAchievementForFirstPerson(secondAchievement);
		const formattedSecondForExperience =
			formatAchievementForExperience(secondAchievement);

		const variantFocus =
			variant === "react"
				? "React, Next.js, and TypeScript product engineering"
				: "Vue.js, Nuxt.js, and TypeScript product engineering";

		const designFocus =
			"Figma-driven design-to-code, from wireframes through stakeholder review to production UI";

		const getOpening = (): string => {
			if (jobDescription && jobDescription.length > 50) {
				const summaryExcerpt = getSummaryExcerpt(
					resumePdf.summary,
					themes,
					true,
				);
				const focus =
					themes.design && themes.ai
						? `${variantFocus}, ${designFocus}, and AI-augmented engineering`
						: themes.design
							? `${variantFocus} and ${designFocus}`
							: themes.ai
								? `${variantFocus} and AI-augmented engineering`
								: variantFocus;
				return `I am excited to apply for the ${position} position at ${companyName}. After reviewing the job requirements, I am confident that my ${yearsOfExperience}+ years in ${focus} align well with what you're seeking. ${summaryExcerpt}`;
			}

			switch (template) {
				case "technical":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. As a ${personalInfo.role} with ${yearsOfExperience}+ years building scalable ${variant === "react" ? "React and Next.js" : "Vue and Nuxt"} applications and translating Figma designs into production UI, I am excited about the opportunity to contribute to your technical team.`;
				case "leadership":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years leading engineering delivery—from Figma design-to-code workflows to design-system rollout—in ${variantFocus}, I am excited about the opportunity to help shape your organization's technical direction.`;
				case "startup":
					return `I am excited to apply for the ${position} position at ${companyName}. As someone who thrives in fast-paced environments and enjoys shipping high-impact frontend work—from wireframes to production—I am drawn to the opportunity to make a meaningful contribution at a growing company.`;
				case "enterprise":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years delivering large-scale web platforms, design-system consistency, and cross-functional collaboration, I am excited about the opportunity to contribute to your organization's continued success.`;
				default:
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years in ${variantFocus}, Figma design-to-code, quality engineering, and team leadership, I am excited about the opportunity to contribute to your organization's success.`;
			}
		};

		const experienceParagraph = recentExperience
			? `In my recent role as ${recentExperience.roles[0]} at ${recentExperience.company}, I ${formattedFirstAchievement || "have consistently delivered high-quality software solutions that drive business value"}. ${formattedSecondAchievement ? `I also ${formattedSecondAchievement}.` : ""} This work strengthened my expertise in ${technologies}${themes.design ? ", Figma design-to-code, and pixel-perfect UI implementation" : ""}, and I am confident these skills would be valuable in the ${position} role at ${companyName}.`
			: `As a ${personalInfo.role}, I have consistently delivered high-quality software solutions that drive business value. My expertise in ${technologies} would be valuable in the ${position} role at ${companyName}.`;

		const getClosing = (): string => {
			switch (template) {
				case "technical":
					return `I am particularly excited about the opportunity to apply my technical expertise—including ${themes.design ? "Figma handoffs, " : ""}${technologies}${themes.ai ? ", and AI-augmented workflows" : ""}—to solve complex challenges at ${companyName}. I would welcome the chance to discuss how my skills can contribute to your team's success.`;
				case "leadership":
					return `I am particularly excited about the opportunity to lead and mentor a talented team at ${companyName}. ${formattedSecondForExperience ? `My experience ${formattedSecondForExperience} has prepared me to drive technical excellence and team growth.` : "I would welcome the chance to discuss how my leadership experience can contribute to your team's success."}`;
				case "startup":
					return `I am particularly excited about the opportunity to work in a dynamic environment where I can make a meaningful impact. ${formattedSecondForExperience ? `My experience ${formattedSecondForExperience} demonstrates my ability to deliver results in fast-paced settings.` : `I thrive on solving complex problems and am eager to contribute to ${companyName}'s growth.`}`;
				case "enterprise":
					return `I am particularly excited about the opportunity to work on large-scale systems at ${companyName}. ${formattedSecondForExperience ? `My experience ${formattedSecondForExperience} has prepared me to handle the complexity and scale of enterprise-level projects.` : "I would welcome the chance to discuss how my experience can contribute to your organization's technical initiatives."}`;
				default:
					return `My combination of technical expertise, ${themes.design ? "design-to-code proficiency, " : ""}leadership experience, and passion for building scalable solutions makes me well-suited for this position. ${formattedSecondForExperience ? `I am particularly excited about the opportunity to ${formattedSecondForExperience} at ${companyName}.` : `I am excited about the opportunity to contribute to innovative projects and drive technical excellence at ${companyName}.`}`;
			}
		};

		const keyQualifications = buildKeyQualifications(
			technologies,
			themes,
			template,
		);

		return `Dear Hiring Manager,

${getOpening()}

${experienceParagraph}

Key Qualifications:
${keyQualifications.map((item) => `• ${item}`).join("\n")}

What I Can Bring to ${companyName}:
${getClosing()}

I am eager to discuss how my background, skills, and enthusiasm can contribute to your team's success. Thank you for considering my application. I look forward to hearing from you.

Sincerely,

${personalInfo.name}
${personalInfo.role}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
${personalInfo.linkedin ? `LinkedIn: ${personalInfo.linkedin}` : ""}
${personalInfo.website ? `Website: ${personalInfo.website}` : ""}

${currentDate}`;
	};

	return {
		generateCoverLetterTemplate,
	};
};
