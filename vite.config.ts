import vue from "@vitejs/plugin-vue"
import {defineConfig} from "vite"
import {fileURLToPath, URL} from "node:url"
import vuetify, {transformAssetUrls} from "vite-plugin-vuetify"

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "docs"
	},
	plugins: [
		vue({
			template: {transformAssetUrls}
		}),
		vuetify({
			autoImport: true,
		}),
	],
	define: {"process.env": {}},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		},
		extensions: [
			".json",
			".ts",
			".tsx",
			".vue",
		],
	},
	server: {
		port: 3000,
	},
})
