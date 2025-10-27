import hljs from "highlight.js";
// @ts-ignore
import { HtmlMark } from "htmlmark";

export function getAssetUrl(name: string) {
	return new URL(`./assets/${name}`, import.meta.url).href;
}

export function addThemeToStorage(isDark: boolean) {
	localStorage.setItem("isDark", isDark.toString());
}

export function isDarkThemeSelected(): boolean {
	return localStorage.getItem("isDark") === "true";
}

interface Asset {
	path: string;
	content: string;
	fileName: string;
}

export const readAssets = async () => {
	try {
		const response = await fetch("/blogs.json");
		if (!response.ok) {
			return [];
		}
		const files = await response.json();
		const assets: Asset[] = [];
		for (const file of files) {
			const response = await fetch(`/blogBase/${file}`);
			if (!response.ok) {
				continue;
			}
			const content = await response.text();
			assets.push({ path: `/blogBase/${file}`, content, fileName: file });
		}
		return assets;
	} catch (error) {
		console.error("Error fetching markdown content:", error);
		return [];
	}
};

export const htmlMark = () => {
	return new HtmlMark({
		indent: 2,
		frontMatter: true,
		highlight: (code: string, lang: string) => {
			if (lang) {
				try {
					return hljs.highlight(lang, code).value;
				} catch (error) {
					return hljs.highlightAuto(code).value;
				}
			} else return hljs.highlightAuto(code).value;
		},
	});
};
