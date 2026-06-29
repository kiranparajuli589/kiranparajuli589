import hljs from "highlight.js";
// @ts-expect-error - htmlmark doesn't have proper type definitions
import HtmlMark from "htmlmark";

export interface BlogFrontMatter {
	title: string;
	date: string;
	tags: string[];
	description?: string;
	image?: string;
}

export interface BlogSummary {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	description: string;
	readTime: number;
	image: string;
}

export interface BlogDetail {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	description: string;
	readTime: number;
	image: string;
	html: string;
}

const DEFAULT_IMAGE = "/letter_k.png";
const WORDS_PER_MINUTE = 200;

// htmlmark is pure string processing (no DOM globals), so it runs safely in
// the Nitro/Node server context. highlight.js is also Node-safe.
export const htmlMark = () => {
	return new HtmlMark({
		indent: 2,
		frontMatter: true,
		highlight: (code: string, lang: string) => {
			if (lang) {
				try {
					return hljs.highlight(lang, code).value;
				} catch {
					return hljs.highlightAuto(code).value;
				}
			} else return hljs.highlightAuto(code).value;
		},
	});
};

// Storage keys come back mountpoint-prefixed and colon-delimited, e.g.
// "blogBase:filtering_100k_invoices_js.md". Take the last segment, strip ".md".
export const slugFromKey = (key: string): string => {
	const last = key.split(":").pop() ?? key;
	return last.replace(/\.md$/, "");
};

// Strip front matter, code blocks, and markdown syntax to plain-ish text so we
// can derive a word count and an excerpt.
const toPlainText = (raw: string): string => {
	return raw
		.replace(/^---\n[\s\S]*?\n---\n?/, "") // front matter
		.replace(/```[\s\S]*?```/g, " ") // fenced code blocks
		.replace(/`[^`]*`/g, " ") // inline code
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
		.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
		.replace(/^#{1,6}\s+/gm, "") // headings
		.replace(/[*_~>#-]/g, " ") // residual markdown punctuation
		.replace(/\s+/g, " ")
		.trim();
};

export const computeReadTime = (raw: string): number => {
	const text = toPlainText(raw);
	const words = text ? text.split(/\s+/).length : 0;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export const excerpt = (raw: string, maxLength = 155): string => {
	const text = toPlainText(raw);
	if (text.length <= maxLength) return text;
	const truncated = text.slice(0, maxLength);
	const lastSpace = truncated.lastIndexOf(" ");
	return `${(lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated).trim()}…`;
};

const resolveImage = (image: unknown, siteUrl: string): string => {
	if (typeof image === "string" && image.length > 0) {
		if (/^https?:\/\//.test(image)) return image;
		return `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;
	}
	return `${siteUrl}${DEFAULT_IMAGE}`;
};

// htmlmark keeps surrounding quotes on quoted front-matter values, so strip a
// single matched pair of leading/trailing quotes.
const unquote = (value: unknown): string | undefined => {
	if (typeof value !== "string") return undefined;
	return value.replace(/^(["'])([\s\S]*)\1$/, "$2");
};

const normalizeFrontMatter = (fm: Record<string, unknown>): BlogFrontMatter => {
	return {
		title: unquote(fm.title) ?? String(fm.title ?? ""),
		date: unquote(fm.date) ?? String(fm.date ?? ""),
		tags: Array.isArray(fm.tags) ? (fm.tags as string[]) : [],
		description: unquote(fm.description),
		image: unquote(fm.image),
	};
};

export const parseSummary = (
	slug: string,
	raw: string,
	siteUrl: string,
): BlogSummary => {
	const parser = htmlMark();
	const fm = normalizeFrontMatter(parser.getFrontMatter(raw) ?? {});
	return {
		slug,
		title: fm.title,
		date: fm.date,
		tags: fm.tags,
		description: fm.description || excerpt(raw),
		readTime: computeReadTime(raw),
		image: resolveImage(fm.image, siteUrl),
	};
};

// The markdown often repeats the title as a leading H1; the page renders the
// title separately, so drop a leading H1 when it matches the front-matter title.
const stripLeadingTitle = (html: string, title: string): string => {
	const match = html.match(/^\s*<h1>([\s\S]*?)<\/h1>/);
	if (!match) return html;
	const heading = match[1]
		.replace(/<[^>]+>/g, "")
		.trim()
		.toLowerCase();
	if (heading === title.trim().toLowerCase()) {
		return html.slice(match[0].length).replace(/^\s+/, "");
	}
	return html;
};

export const parseDetail = (
	slug: string,
	raw: string,
	siteUrl: string,
): BlogDetail => {
	const parser = htmlMark();
	const fm = normalizeFrontMatter(parser.getFrontMatter(raw) ?? {});
	return {
		slug,
		title: fm.title,
		date: fm.date,
		tags: fm.tags,
		description: fm.description || excerpt(raw),
		readTime: computeReadTime(raw),
		image: resolveImage(fm.image, siteUrl),
		html: stripLeadingTitle(parser.parse(raw), fm.title),
	};
};
