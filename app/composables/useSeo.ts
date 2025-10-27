interface SeoOptions {
	title: string;
	description: string;
	keywords?: string;
	image?: string;
	url?: string;
	type?: "website" | "article" | "profile";
	publishedTime?: string;
	structuredData?: Record<string, unknown>;
	customMeta?: Array<Record<string, string>>;
}

const defaultImage = "https://kiranparajuli.com.np/letter_k.png";
const defaultUrl = "https://kiranparajuli.com.np";

export const useSeo = (options: SeoOptions) => {
	const {
		title,
		description,
		keywords = "",
		image = defaultImage,
		url = defaultUrl,
		type = "website",
		publishedTime,
		structuredData,
		customMeta = [],
	} = options;

	const fullTitle = `${title} | Kiran Parajuli`;

	// Common meta tags
	const commonMeta = [
		{
			name: "description",
			content: description,
		},
		{
			name: "author",
			content: "Kiran Parajuli",
		},
		{
			name: "robots",
			content: "index, follow",
		},
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1.0",
		},
		{
			name: "theme-color",
			content: "#0e62c0",
		},
	];

	// Keywords meta (optional)
	const keywordsMeta = keywords
		? [
				{
					name: "keywords",
					content: keywords,
				},
			]
		: [];

	// Open Graph tags
	const ogMeta = [
		{
			property: "og:title",
			content: title,
		},
		{
			property: "og:description",
			content: description,
		},
		{
			property: "og:image",
			content: image,
		},
		{
			property: "og:url",
			content: url,
		},
		{
			property: "og:type",
			content: type,
		},
		{
			property: "og:locale",
			content: "en_US",
		},
		{
			property: "og:site_name",
			content: "Kiran Parajuli",
		},
	];

	// Twitter Card tags
	const twitterMeta = [
		{
			name: "twitter:card",
			content: "summary_large_image",
		},
		{
			name: "twitter:title",
			content: title,
		},
		{
			name: "twitter:description",
			content: description,
		},
		{
			name: "twitter:image",
			content: image,
		},
		{
			name: "twitter:creator",
			content: "@kiranparajuli589",
		},
		{
			name: "twitter:site",
			content: "@kiranparajuli589",
		},
	];

	// Article specific meta
	const articleMeta =
		type === "article" && publishedTime
			? [
					{
						property: "article:published_time",
						content: publishedTime,
					},
					{
						property: "article:author",
						content: "Kiran Parajuli",
					},
				]
			: [];

	// Combine all meta tags
	const allMeta = [
		...commonMeta,
		...keywordsMeta,
		...ogMeta,
		...twitterMeta,
		...articleMeta,
		...customMeta,
	];

	// Set up head with all meta
	useHead({
		title: fullTitle,
		htmlAttrs: {
			lang: "en",
		},
		meta: allMeta,
		link: [
			{
				rel: "canonical",
				href: url,
			},
		],
	});

	// Add structured data if provided
	if (structuredData) {
		useHead({
			script: [
				{
					type: "application/ld+json",
					innerHTML: JSON.stringify({
						"@context": "https://schema.org",
						...structuredData,
					}),
				},
			],
		});
	}
};

// Helper functions for common structured data types
export const createPersonStructuredData = (data: {
	name: string;
	jobTitle: string;
	description: string;
	image: string;
	url: string;
	email?: string;
	telephone?: string;
	sameAs?: (string | undefined)[];
	address?: {
		addressLocality: string;
		addressCountry: string;
		postalCode?: string;
	};
	knowsAbout?: string[];
}) => {
	return {
		"@type": "Person",
		name: data.name,
		jobTitle: data.jobTitle,
		description: data.description,
		image: data.image,
		url: data.url,
		...(data.email && { email: data.email }),
		...(data.telephone && { telephone: data.telephone }),
		...(data.sameAs && {
			sameAs: data.sameAs.filter((item): item is string => !!item),
		}),
		...(data.address && {
			address: {
				"@type": "PostalAddress",
				addressLocality: data.address.addressLocality,
				addressCountry: data.address.addressCountry,
				...(data.address.postalCode && {
					postalCode: data.address.postalCode,
				}),
			},
		}),
		...(data.knowsAbout && { knowsAbout: data.knowsAbout }),
	};
};

export const createArticleStructuredData = (data: {
	headline: string;
	description: string;
	image: string;
	datePublished: string;
	dateModified: string;
	authorName: string;
	authorUrl: string;
	authorJobTitle: string;
	publisherName: string;
	publisherImage: string;
	keywords: string;
	url: string;
}) => {
	return {
		"@type": "BlogPosting",
		headline: data.headline,
		description: data.description,
		image: data.image,
		datePublished: data.datePublished,
		dateModified: data.dateModified,
		author: {
			"@type": "Person",
			name: data.authorName,
			url: data.authorUrl,
			jobTitle: data.authorJobTitle,
		},
		publisher: {
			"@type": "Person",
			name: data.publisherName,
			image: data.publisherImage,
		},
		keywords: data.keywords,
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": data.url,
		},
		url: data.url,
	};
};

export const createWebsiteStructuredData = (data: {
	name: string;
	description: string;
	url: string;
}) => {
	return {
		"@type": "WebSite",
		name: data.name,
		description: data.description,
		url: data.url,
		author: {
			"@type": "Person",
			name: "Kiran Parajuli",
		},
	};
};

export const createCollectionPageStructuredData = (data: {
	name: string;
	description: string;
	url: string;
}) => {
	return {
		"@type": "CollectionPage",
		name: data.name,
		description: data.description,
		url: data.url,
		author: {
			"@type": "Person",
			name: "Kiran Parajuli",
			jobTitle: "Frontend & Full Stack Developer & QA Engineer",
		},
	};
};
