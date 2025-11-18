import Resume from "~/utils/resume";

const personalInfo = Resume.personalInfo;

// Helper function to format achievement for use in sentences
const formatAchievement = (achievement: string): string => {
	if (!achievement) return "";
	// Remove leading action verbs and make it flow better
	const cleaned = achievement
		.replace(
			/^(Architected|Built|Created|Developed|Engineered|Implemented|Led|Migrated|Modernized|Owned|Redesigned|Shrank)\s+/i,
			"",
		)
		.toLowerCase();
	// Capitalize first letter
	return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
};

export type CoverLetterTemplate =
	| "standard"
	| "technical"
	| "leadership"
	| "startup"
	| "enterprise";

export const useCoverLetterGenerator = () => {
	const generateCoverLetterTemplate = (
		companyName: string,
		position: string,
		jobDescription: string,
		template: CoverLetterTemplate = "standard",
	): string => {
		if (!companyName || !position) {
			return "";
		}

		const currentDate = new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		const yearsOfExperience = new Date().getFullYear() - 2018;
		const recentExperience = Resume.experiences[0];
		const firstAchievement = recentExperience?.achievements[0] || "";
		const secondAchievement = recentExperience?.achievements[1] || "";

		// Extract key technologies from experiences
		const technologies = Resume.skills
			.flatMap((skill) => skill.items)
			.join(", ")
			.split(", ")
			.slice(0, 6)
			.join(", ");

		// Format achievements for better readability
		const formattedFirstAchievement = formatAchievement(firstAchievement);
		const formattedSecondAchievement = formatAchievement(secondAchievement);

		// Template-specific openings
		const getOpening = (): string => {
			if (jobDescription && jobDescription.length > 50) {
				return `I am excited to apply for the ${position} position at ${companyName}. After reviewing the job requirements, I am confident that my ${yearsOfExperience}+ years of experience in software development, quality assurance, and engineering leadership align perfectly with what you're seeking.`;
			}

			switch (template) {
				case "technical":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. As a ${personalInfo.role} with ${yearsOfExperience}+ years of hands-on experience building scalable web applications, I am excited about the opportunity to contribute to your technical team.`;
				case "leadership":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years of experience leading engineering teams and driving technical strategy, I am excited about the opportunity to help shape your organization's technical direction.`;
				case "startup":
					return `I am excited to apply for the ${position} position at ${companyName}. As someone who thrives in fast-paced environments and enjoys wearing multiple hats, I am drawn to the opportunity to make a significant impact at a growing company.`;
				case "enterprise":
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years of experience working on large-scale systems and collaborating with cross-functional teams, I am excited about the opportunity to contribute to your organization's continued success.`;
				default:
					return `I am writing to express my strong interest in the ${position} position at ${companyName}. With ${yearsOfExperience}+ years of experience in software development, quality assurance, and leading engineering teams, I am excited about the opportunity to contribute to your organization's success.`;
			}
		};

		// Build experience paragraph
		const experienceParagraph = recentExperience
			? `In my current role as ${recentExperience.roles[0]} at ${recentExperience.company}, ${formattedFirstAchievement || "I have consistently delivered high-quality software solutions that drive business value."} This experience has strengthened my expertise in ${technologies || "modern web technologies"}, and I am confident these skills would be valuable in the ${position} role at ${companyName}.`
			: `As a ${personalInfo.role}, I have consistently delivered high-quality software solutions that drive business value. My expertise in ${technologies || "modern web technologies"} would be valuable in the ${position} role at ${companyName}.`;

		// Template-specific closing
		const getClosing = (): string => {
			switch (template) {
				case "technical":
					return `I am particularly excited about the opportunity to apply my technical expertise to solve complex challenges at ${companyName}. I would welcome the chance to discuss how my skills in ${technologies || "modern web technologies"} can contribute to your team's success.`;
				case "leadership":
					return `I am particularly excited about the opportunity to lead and mentor a talented team at ${companyName}. ${formattedSecondAchievement ? `My experience ${formattedSecondAchievement.replace(/\.$/, "")} has prepared me to drive technical excellence and team growth.` : `I would welcome the chance to discuss how my leadership experience can contribute to your team's success.`}`;
				case "startup":
					return `I am particularly excited about the opportunity to work in a dynamic environment where I can make a meaningful impact. ${formattedSecondAchievement ? `My experience ${formattedSecondAchievement.replace(/\.$/, "")} demonstrates my ability to deliver results in fast-paced settings.` : `I thrive on solving complex problems and am eager to contribute to ${companyName}'s growth.`}`;
				case "enterprise":
					return `I am particularly excited about the opportunity to work on large-scale systems at ${companyName}. ${formattedSecondAchievement ? `My experience ${formattedSecondAchievement.replace(/\.$/, "")} has prepared me to handle the complexity and scale of enterprise-level projects.` : `I would welcome the chance to discuss how my experience can contribute to your organization's technical initiatives.`}`;
				default:
					return `My combination of technical expertise, leadership experience, and passion for building scalable solutions makes me well-suited for this position. ${formattedSecondAchievement ? `I am particularly excited about the opportunity to ${formattedSecondAchievement.replace(/\.$/, "")} at ${companyName}.` : `I am excited about the opportunity to contribute to innovative projects and drive technical excellence at ${companyName}.`}`;
			}
		};

		return `Dear Hiring Manager,

${getOpening()}

${experienceParagraph}

Key Qualifications:
• ${yearsOfExperience}+ years of experience in frontend engineering, full-stack development, and QA automation
• Proven track record of delivering high-performance web applications using ${technologies || "React.js, Vue.js, TypeScript, and modern frameworks"}
• Strong leadership skills with experience mentoring engineers and leading cross-functional teams
• Expertise in performance optimization, accessibility, and modern web standards
• Comprehensive experience with CI/CD pipelines, automated testing, and DevOps practices

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
