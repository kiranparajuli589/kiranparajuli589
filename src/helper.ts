export function getAssetUrl (name: string) {
	return new URL(`./assets/${name}`, import.meta.url).href
}
