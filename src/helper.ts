import hljs from "highlight.js"
// import {MarkdownParser} from "htmlmark"

export function getAssetUrl (name: string) {
	return new URL(`./assets/${name}`, import.meta.url).href
}

export function addThemeToStorage(isDark: boolean) {
	localStorage.setItem("isDark", isDark.toString())
}

export function isDarkThemeSelected():boolean {
	return localStorage.getItem("isDark") === "true"
}

interface Asset { path: string, content: string, fileName: string }

export const readAssets = async (): Promise<Asset[]> => {
	// const assets = import.meta.glob(
	// 	"/src/assets/blogs/**/**.md",
	// 	{ as: "raw" }
	// )
	// return await Promise.all(
	// 	Object.entries(assets).map(async ([path, file]) => {
	// 		const content = await file()
	// 		return {
	// 			path, content, fileName: path.split("/").pop()
	// 		}
	// 	})
	// )
}

export const htmlMark = () => {
	// return new MarkdownParser({
	// 	indent: 2,
	// 	frontMatter: true,
	// 	highlight: (code, lang) => {
	// 		if (lang) {
	// 			try {
	// 				return hljs.highlight(lang, code).value
	// 			} catch (error) {
	// 				return hljs.highlightAuto(code).value
	// 			}
	// 		} else return hljs.highlightAuto(code).value
	// 	}
	// })
}
