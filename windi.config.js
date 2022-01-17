import {defineConfig} from "windicss/helpers"

export default defineConfig({
	extract: {
		include: ["**/*.vue"],
		exclude: ["node_modules", ".git", "excluded", "dist", "windi.config.js"],
		shortcuts: {},
		theme: {
			extend:{
				colors: {
					teal: {
						100: "#096"
					}
				}
			}
		}
	}
})
