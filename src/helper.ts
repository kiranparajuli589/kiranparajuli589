export function getAssetUrl (name: string) {
	return new URL(`./assets/${name}`, import.meta.url).href
}


export function addThemeToStorage(isDark: boolean) {
	localStorage.setItem("isDark", isDark.toString())
}

export function isDarkThemeSelected():boolean {
	return localStorage.getItem("isDark") === "true"
}
