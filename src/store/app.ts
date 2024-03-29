// Utilities
import {defineStore} from "pinia"

export const useAppStore = defineStore("app", {
	state: () => ({
		isDarkTheme: false,
	}),

	actions: {
		updateTheme(isDark:boolean) {
			this.isDarkTheme = isDark
		}
	}
})
