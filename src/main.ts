import App from "./App.vue"

import {createApp} from "vue"

import {registerPlugins} from "@/plugins"

const app = createApp(App)

function getAssetUrl (name: string) {
	return new URL(`./assets/${name}`, import.meta.url).href
}

registerPlugins(app)
	.then(() => app.mount("#app"))
	.catch(console.error)

app.config.globalProperties.$getAssetUrl = getAssetUrl
