export type Service = {
	name: string;
	description: string;
	icon: string;

	types?: string[],
	experience: number;
	iconColor: string;
}

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
}

export type Experience = {
	company: string;
	roles: string[];
	startDate: string;
	endDate: string;
	description: string;

	companyUrl: string;
	companyLogo: string;
	technologies: string[];
	achievements: string[];
	achievementsPdf?: string[];

	projects: Project[];
}

export type Tool = {
	image?: string;
	class?: string;
	tooltip: string;
}

export type Technology = {
	name: string;
	tools: Tool[],
}

export type Work = {
	title: string,
	description: string,
	thumbnail: string,
	technologies: string[],
	links: {
		github?: string,
		demo?: string,
		playground?: string,
		website?: string,
	}
}
