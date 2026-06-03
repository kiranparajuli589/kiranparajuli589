import Resume, { formatResumeLink } from "~/utils/resume";
import type { ResumePdfExperience } from "~/customTypes";

function formatEmploymentLine(experience: ResumePdfExperience): string {
	const parts = [experience.roles.join(", ")];
	if (experience.employmentType) {
		parts.push(experience.employmentType);
	}
	if (experience.concurrent) {
		parts.push("concurrent");
	}
	parts.push(`${experience.startDate} - ${experience.endDate}`);
	return parts.join(" · ");
}

function formatEducation(edu: (typeof Resume.education)[number]): string {
	return `${edu.degree} in ${edu.major} — ${edu.name} (${edu.startDate}–${edu.endDate})`;
}

function formatContactLinks(personalInfo: typeof Resume.personalInfo): string {
	const links = [
		{ label: "LinkedIn", url: personalInfo.linkedin },
		{ label: "GitHub", url: personalInfo.github },
		{ label: "Portfolio", url: personalInfo.website },
		{ label: "Dev.to", url: personalInfo.devto },
	]
		.filter((link) => link.url)
		.map((link) => `${link.label}: ${formatResumeLink(String(link.url))}`);
	return links.join(" | ");
}

export function useResumeExport() {
	const exportAsPlainText = () => {
		const personalInfo = Resume.personalInfo;
		const resumePdf = Resume.resumePdf;
		const education = Resume.education.filter(
			(edu) => edu.degree !== "High School",
		);
		const languages = Resume.languages;

		const {
			summary: pdfSummary,
			skills: pdfSkills,
			experiences,
			selectedProjects,
		} = resumePdf;

		let text = "";

		text += `${(personalInfo.name ?? "Resume").toUpperCase()}\n`;
		text += `${personalInfo.role}\n\n`;

		text += "CONTACT INFORMATION\n";
		text += `${"=".repeat(20)}\n`;
		if (personalInfo.email) text += `Email: ${personalInfo.email}\n`;
		if (personalInfo.phone) text += `Phone: ${personalInfo.phone}\n`;
		text += `Location: ${personalInfo.locationLine}\n`;
		text += `${formatContactLinks(personalInfo)}\n\n`;

		if (pdfSummary) {
			text += "SUMMARY\n";
			text += `${"=".repeat(20)}\n`;
			text += `${pdfSummary}\n\n`;
		}

		if (pdfSkills && pdfSkills.length > 0) {
			text += "SKILLS\n";
			text += `${"=".repeat(20)}\n`;
			pdfSkills.forEach((skill) => {
				text += `${skill.title}: ${skill.items.join(" ")}\n`;
			});
			text += "\n";
		}

		text += "PROFESSIONAL EXPERIENCE\n";
		text += `${"=".repeat(20)}\n`;
		experiences.forEach((exp) => {
			text += `${exp.company}\n`;
			text += `${formatEmploymentLine(exp)}\n`;
			exp.achievements.forEach((achievement) => {
				text += `  • ${achievement}\n`;
			});
			text += "\n";
		});

		if (selectedProjects.length > 0) {
			text += "SELECTED PROJECTS\n";
			text += `${"=".repeat(20)}\n`;
			selectedProjects.forEach((project) => {
				text += `• ${project.title}: ${project.line}\n`;
			});
			text += "\n";
		}

		text += "EDUCATION\n";
		text += `${"=".repeat(20)}\n`;
		education.forEach((edu) => {
			text += `${formatEducation(edu)}\n\n`;
		});

		if (languages && languages.length > 0) {
			text += "LANGUAGES\n";
			text += `${"=".repeat(20)}\n`;
			languages.forEach((language) => {
				text += `• ${language.name} — ${language.level}\n`;
			});
		}

		return text;
	};

	const downloadAsPlainText = (filename = "resume.txt") => {
		const text = exportAsPlainText();
		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return {
		exportAsPlainText,
		downloadAsPlainText,
	};
}
