import Resume, { formatResumeLink } from "~/utils/resume";
import type {
	Education,
	ResumePdfExperience,
	ResumePdfVariant,
} from "~/customTypes";

const MONTH_NAMES = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

/**
 * Formats a stored date for display. "2023-03" -> "Mar 2023"; passes through
 * bare years ("2019") and sentinels ("Present") unchanged so roles without a
 * recorded month still render correctly.
 */
export function formatMonthYear(dateStr: string): string {
	const match = /^(\d{4})-(\d{2})$/.exec(dateStr);
	if (!match) return dateStr;
	const month = MONTH_NAMES[parseInt(match[2], 10) - 1];
	return month ? `${month} ${match[1]}` : match[1];
}

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
	parts.push(
		`${formatMonthYear(experience.startDate)}–${formatMonthYear(experience.endDate)}`,
	);
	return parts.join(" · ");
}

export function formatEducation(edu: Education): string {
	return `${edu.degree} in ${edu.major} — ${edu.name} (${formatMonthYear(edu.startDate)}–${formatMonthYear(edu.endDate)})`;
}

export function buildResumeSocialLinks(
	personalInfo: typeof Resume.personalInfo,
) {
	return [
		{ label: "LinkedIn", href: personalInfo.linkedin || "#" },
		{ label: "GitHub", href: personalInfo.github || "#" },
		{ label: "Portfolio", href: personalInfo.website || "#" },
		{ label: "Dev.to", href: personalInfo.devto || "#" },
	]
		.filter((link) => link.href !== "#")
		.map((link) => ({ ...link, display: formatResumeLink(link.href) }));
}
