export async function loadFonts() {
	const webFontLoader = await import(/* webpackChunkName: "webfontloader" */"webfontloader")

	webFontLoader.load({
		google: {
			families: [
				"Playfair Display:400,500,600,700,800,900",
			],
		},
	})
}
