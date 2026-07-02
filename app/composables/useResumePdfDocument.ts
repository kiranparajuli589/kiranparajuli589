import Resume from "~/utils/resume";
import type {
	Education,
	ResumePdfExperience,
	ResumePdfVariant,
} from "~/customTypes";

export function getResumeDownloadFilename(
	variant: ResumePdfVariant,
	extension?: string,
): string {
	const name = Resume.personalInfo.name?.replace(/\s+/g, "_") || "Resume";
	const variantLabels: Record<ResumePdfVariant, string> = {
		vue: "Vue",
		react: "React",
		fullstack: "FullStack",
	};
	const variantPart = variantLabels[variant];
	const base = `${name}_Resume_${variantPart}`;
	return extension ? `${base}.${extension}` : base;
}

/** Sets document.title for print-to-PDF filename, then restores it after print. */
export function printResumePdf(variant: ResumePdfVariant): void {
	const previousTitle = document.title;
	document.title = getResumeDownloadFilename(variant);

	window.addEventListener(
		"afterprint",
		() => {
			document.title = previousTitle;
		},
		{ once: true },
	);

	window.print();
}

export function formatEmploymentLine(experience: ResumePdfExperience): string {
	const parts = [experience.roles.join(", ")];
	if (experience.employmentType) {
		parts.push(experience.employmentType);
	}
	if (experience.concurrent) {
		parts.push("concurrent");
	}
	parts.push(`${experience.startDate}–${experience.endDate}`);
	return parts.join(" · ");
}

export function formatEducation(edu: Education): string {
	return `${edu.degree} in ${edu.major} — ${edu.name} (${edu.startDate}–${edu.endDate})`;
}

export function buildResumeSocialLinks(
	personalInfo: typeof Resume.personalInfo,
) {
	return [
		{ label: "LinkedIn", href: personalInfo.linkedin || "#" },
		{ label: "GitHub", href: personalInfo.github || "#" },
		{ label: "Portfolio", href: personalInfo.website || "#" },
		{ label: "Dev.to", href: personalInfo.devto || "#" },
	].filter((link) => link.href !== "#");
}
