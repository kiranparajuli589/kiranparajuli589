import Resume from "~/utils/resume";

export function useResumeExport() {
	const exportAsPlainText = () => {
		const personalInfo = Resume.personalInfo;
		const experiences = Resume.experiences;
		const education = Resume.education;
		const skills = Resume.skills;
		const leadershipHighlights = Resume.leadershipHighlights;
		const selectedProjects = Resume.selectedProjects;
		const extras = Resume.extras;

		let text = "";

		// Header
		text += `${personalInfo.name.toUpperCase()}\n`;
		text += `${personalInfo.role}\n\n`;

		// Contact Info
		text += "CONTACT INFORMATION\n";
		text += `${"=".repeat(20)}\n`;
		if (personalInfo.email) text += `Email: ${personalInfo.email}\n`;
		if (personalInfo.phone) text += `Phone: ${personalInfo.phone}\n`;
		if (personalInfo.website) text += `Website: ${personalInfo.website}\n`;
		if (personalInfo.linkedin) text += `LinkedIn: ${personalInfo.linkedin}\n`;
		if (personalInfo.github) text += `GitHub: ${personalInfo.github}\n`;
		text += `Location: ${personalInfo.municipality}, ${personalInfo.country}, ${personalInfo.postalCode}\n\n`;

		// Summary
		if (personalInfo.summary) {
			text += "SUMMARY\n";
			text += `${"=".repeat(20)}\n`;
			text += `${personalInfo.summary}\n\n`;
		}

		// Leadership Highlights
		if (leadershipHighlights && leadershipHighlights.length > 0) {
			text += "LEADERSHIP HIGHLIGHTS\n";
			text += `${"=".repeat(20)}\n`;
			leadershipHighlights.forEach((highlight) => {
				text += `• ${highlight}\n`;
			});
			text += "\n";
		}

		// Skills
		if (skills && skills.length > 0) {
			text += "SKILLS\n";
			text += `${"=".repeat(20)}\n`;
			skills.forEach((skill) => {
				text += `${skill.title}:\n`;
				skill.items.forEach((item) => {
					text += `  • ${item}\n`;
				});
			});
			text += "\n";
		}

		// Experience
		text += "EXPERIENCE\n";
		text += `${"=".repeat(20)}\n`;
		experiences.forEach((exp) => {
			text += `${exp.company}\n`;
			if (exp.companyUrl) text += `Website: ${exp.companyUrl}\n`;
			text += `${exp.roles.join(", ")} | ${exp.startDate} - ${exp.endDate}\n`;
			if (exp.description) {
				text += `${exp.description}\n`;
			}
			if (exp.achievements && exp.achievements.length > 0) {
				text += "Achievements:\n";
				exp.achievements.forEach((achievement) => {
					text += `  • ${achievement}\n`;
				});
			}
			text += "\n";
		});

		// Selected Projects
		if (selectedProjects && selectedProjects.length > 0) {
			text += "SELECTED PROJECTS\n";
			text += `${"=".repeat(20)}\n`;
			selectedProjects.forEach((project) => {
				text += `${project.title}\n`;
				if (project.description) {
					text += `${project.description}\n`;
				}
				if (project.impact) {
					text += `Impact: ${project.impact}\n`;
				}
				if (project.stack && project.stack.length > 0) {
					text += `Stack: ${project.stack.join(", ")}\n`;
				}
				if (project.links) {
					Object.entries(project.links).forEach(([key, value]) => {
						text += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
					});
				}
				text += "\n";
			});
		}

		// Education
		text += "EDUCATION\n";
		text += `${"=".repeat(20)}\n`;
		education.forEach((edu) => {
			text += `${edu.degree} in ${edu.name}\n`;
			text += `${edu.major}\n`;
			text += `${edu.startDate} - ${edu.endDate}\n\n`;
		});

		// Extras
		if (extras && extras.length > 0) {
			text += "ADDITIONAL INFORMATION\n";
			text += `${"=".repeat(20)}\n`;
			extras.forEach((extra) => {
				text += `• ${extra}\n`;
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
