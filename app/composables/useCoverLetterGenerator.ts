import Resume, { getResumePdf, yearsOfExperience } from "~/utils/resume";
import type { ResumePdfVariant } from "~/customTypes";

const personalInfo = Resume.personalInfo;

const formatAchievement = (achievement: string): string => {
	if (!achievement) return "";
	const cleaned = achievement
		.replace(
			/^(Architected|Built|Created|Delivered|Developed|Engineered|Implemented|Introduced|Led|Migrated|Modernized|Owned|Redesigned|Shipped|Shrank)\s+/i,
			"",
		)
		.toLowerCase();
	return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

function extractTechnologiesFromPdfSkills(
	skills: ReturnType<typeof getResumePdf>["skills"],
): string {
	const frontend = skills.find((skill) => skill.title === "Frontend")?.items[0];
	if (!frontend) return "";
	return frontend.split(", ").filter(Boolean).slice(0, 6).join(", ");
}

function getStackFallback(variant: ResumePdfVariant): string {
	return variant === "react"
		? "React.js, Next.js, TypeScript, shadcn/ui, and Tailwind CSS"
		: "Vue.js, Nuxt.js, TypeScript, shadcn-vue, and Tailwind CSS";
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

		const resumePdf = getResumePdf(variant);
		const recentExperience = resumePdf.experiences[0];
		const firstAchievement = recentExperience?.achievements[0] || "";
		const secondAchievement = recentExperience?.achievements[1] || "";

		const stackVariant = resolveStackVariantFromJobDescription(
			jobDescription,
			variant,
		);
		const stackResumePdf = getResumePdf(stackVariant);
		const technologies =
			extractTechnologiesFromPdfSkills(stackResumePdf.skills) ||
			getStackFallback(stackVariant);

		const formattedFirstAchievement = formatAchievement(firstAchievement);
		const formattedSecondAchievement = formatAchievement(secondAchievement);

		const variantFocus =
			variant === "react"
				? "React, Next.js, and TypeScript product engineering"
				: "Vue.js, Nuxt.js, and TypeScript product engineering";

		const getOpening = (): string => {
			if (jobDescription && jobDescription.length > 50) {
				return `I am excited to apply for the ${position} position at ${companyName}. After reviewing the job requirements, I am confident that my ${yearsOfExperience}+ years in ${variantFocus} align well with what you're seeking. ${resumePdf.summary.split(".")[0]}.`;
			}

			switch (template) {
				case "technical":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. As a ${personalInfo.role} with ${yearsOfExperience}+ years building scalable ${variant === "react" ? "React and Next.js" : "Vue and Nuxt"} applications, I am excited about the opportunity to contribute to your technical team.`;
				case "leadership":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years leading engineering delivery and driving technical strategy in ${variantFocus}, I am excited about the opportunity to help shape your organization's technical direction.`;
				case "startup":
					return `I am excited to apply for the ${position} position at ${companyName}. As someone who thrives in fast-paced environments and enjoys shipping high-impact frontend work, I am drawn to the opportunity to make a meaningful contribution at a growing company.`;
				case "enterprise":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years delivering large-scale web platforms and collaborating with cross-functional teams, I am excited about the opportunity to contribute to your organization's continued success.`;
				default:
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years in ${variantFocus}, quality engineering, and team leadership, I am excited about the opportunity to contribute to your organization's success.`;
			}
		};

		const experienceParagraph = recentExperience
			? `In my recent role as ${recentExperience.roles[0]} at ${recentExperience.company}, I ${formattedFirstAchievement.replace(/\.$/, "") || "have consistently delivered high-quality software solutions that drive business value"}. ${formattedSecondAchievement ? `I also ${formattedSecondAchievement.replace(/\.$/, "")}.` : ""} This work strengthened my expertise in ${technologies}, and I am confident these skills would be valuable in the ${position} role at ${companyName}.`
			: `As a ${personalInfo.role}, I have consistently delivered high-quality software solutions that drive business value. My expertise in ${technologies} would be valuable in the ${position} role at ${companyName}.`;

		const getClosing = (): string => {
			switch (template) {
				case "technical":
					return `I am particularly excited about the opportunity to apply my technical expertise to solve complex challenges at ${companyName}. I would welcome the chance to discuss how my skills in ${technologies} can contribute to your team's success.`;
				case "leadership":
					return `I am particularly excited about the opportunity to lead and mentor a talented team at ${companyName}. ${formattedSecondAchievement ? `My experience ${formattedSecondAchievement.replace(/\.$/, "")} has prepared me to drive technical excellence and team growth.` : "I would welcome the chance to discuss how my leadership experience can contribute to your team's success."}`;
				case "startup":
					return `I am particularly excited about the opportunity to work in a dynamic environment where I can make a meaningful impact. ${formattedSecondAchievement ? `My experience ${formattedSecondAchievement.replace(/\.$/, "")} demonstrates my ability to deliver results in fast-paced settings.` : `I thrive on solving complex problems and am eager to contribute to ${companyName}'s growth.`}`;
				case "enterprise":
					return `I am particularly excited about the opportunity to work on large-scale systems at ${companyName}. ${formattedSecondAchievement ? `My experience ${formattedSecondAchievement.replace(/\.$/, "")} has prepared me to handle the complexity and scale of enterprise-level projects.` : "I would welcome the chance to discuss how my experience can contribute to your organization's technical initiatives."}`;
				default:
					return `My combination of technical expertise, leadership experience, and passion for building scalable solutions makes me well-suited for this position. ${formattedSecondAchievement ? `I am particularly excited about the opportunity to ${formattedSecondAchievement.replace(/\.$/, "")} at ${companyName}.` : `I am excited about the opportunity to contribute to innovative projects and drive technical excellence at ${companyName}.`}`;
			}
		};

		return `Dear Hiring Manager,

${getOpening()}

${experienceParagraph}

Key Qualifications:
• ${yearsOfExperience}+ years of experience in frontend engineering, full-stack collaboration, and QA automation
• Proven track record delivering high-performance applications using ${technologies}
• Strong leadership skills with experience mentoring engineers and leading cross-functional teams
• Expertise in performance optimization, accessibility, and modern web standards
• Comprehensive experience with CI/CD pipelines, automated testing, and quality gates

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
