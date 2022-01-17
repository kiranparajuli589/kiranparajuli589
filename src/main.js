import { createApp } from "vue"
import "virtual:windi.css"

import App from "./App"
import store from "./store"

createApp(App).use(store).mount("#app")
