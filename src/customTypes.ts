export type Service = {
	name: string;
	description: string;
	icon: string;
	techs: string[];

	types?: string[],
	experience: number;
	iconColor: string;
}

export type Project = {
	name: string;
	description: string;
	job: string[];
	url: string;
}

export type Experience = {
	company: string;
	roles: string[];
	startDate: string;
	endDate: string;
	description: string;

	companyUrl?: string;
	companyLogo?: string;
	technologies?: string[];
	achievements?: string[];

	projects?: Project[];
}

export type Techonlogy = {
	name: string;
	tools: string[],
	maxItemsInAColumn: number;
}
