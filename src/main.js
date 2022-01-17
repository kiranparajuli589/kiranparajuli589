import { createApp } from "vue"
import "virtual:windi.css"

import App from "./App"
import store from "./store"

import "./styles/global.scss"

createApp(App).use(store).mount("#app")
