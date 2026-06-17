export type Service = {
	name: string;
	description: string;
	icon: string;

	types?: string[];
	experience: number;
	iconColor: string;
};

export type Project = {
	name: string;
	description: string;
	job: string[];
	url?: string;
	badge?: {
		dark?: string;
		light?: string;
		default?: string;
	};
};

export type EmploymentType =
	| "Full-time"
	| "Contract"
	| "Part-time Contract"
	| "Part-time"
	| "Freelance";

export type Credential = {
	label: string;
	image?: string;
	badge?: {
		dark?: string;
		light?: string;
		default?: string;
	};
	href?: string;
};

export type ResumePdfVariant = "vue" | "react";

export type Experience = {
	company: string;
	roles: string[];
	startDate: string;
	endDate: string;
	description: string;
	employmentType?: EmploymentType;
	concurrent?: boolean;
	includeInYearsCalc?: boolean;
	includeInPdf?: boolean;
	pdfMaxBullets?: number;
	pdfMaxBulletsReact?: number;
	pdfPageBreakBefore?: boolean;
	pdfSortOrder?: Partial<Record<ResumePdfVariant, number>>;

	companyUrl: string;
	companyLogo: string;
	technologies: string[];
	achievements: string[];
	achievementsPdf?: string[];
	achievementsPdfReact?: string[];

	projects: Project[];
};

export type Tool = {
	image?: string;
	imageDark?: string;
	class?: string;
	tooltip: string;
	imgClass?: string;
};

export type Technology = {
	name: string;
	tools: Tool[];
};

export type AiEngineering = {
	title: string;
	subtitle: string;
	tools: Tool[];
	practices: string[];
	pdfToolsLine: string;
	pdfPracticesLine: string;
};

export type Work = {
	title: string;
	description: string;
	thumbnail: string;
	technologies: string[];
	links: {
		github?: string;
		demo?: string;
		playground?: string;
		website?: string;
	};
};

export type FrontMatter = {
	title: string;
	date: string;
	tags: string[];
	contentLength: number;
	fileName: string;
	filePath: string;
};

export type Education = {
	name: string;
	degree: string;
	major: string;
	startDate: string;
	endDate: string;
};

export type Language = {
	name: string;
	level: string;
	icon: string;
};

export type ResumePdfSelectedProject = {
	title: string;
	line: string;
};

export type ResumePdfExperience = {
	company: string;
	roles: string[];
	startDate: string;
	endDate: string;
	employmentType?: EmploymentType;
	concurrent?: boolean;
	pageBreakBefore?: boolean;
	companyUrl?: string;
	achievements: string[];
};

export type ResumePdfSkillCategory = {
	title: string;
	items: string[];
};

export type ResumePdfExport = {
	summary: string;
	skills: ResumePdfSkillCategory[];
	experiences: ResumePdfExperience[];
	selectedProjects: ResumePdfSelectedProject[];
};
