import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"
// import {VitePWA} from "vite-plugin-pwa"
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		// github pages uses docs dir
		outDir: "./docs"
	},
	plugins: [
		vue(),
		Components({
			resolvers: IconsResolver(),
		}),
		Icons({
			autoInstall: true
		}),
		// VitePWA()
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		},
		extensions:  [".vue", ".js", ".scss"]
	}
})

