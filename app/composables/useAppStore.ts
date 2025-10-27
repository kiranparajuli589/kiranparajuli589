export const useAppStore = () => {
	const isDarkTheme = useState("isDarkTheme", () => false);

	const updateTheme = (isDark: boolean) => {
		isDarkTheme.value = isDark;
	};

	return reactive({
		isDarkTheme,
		updateTheme,
	});
};

export const isDarkThemeSelected = (): boolean => {
	if (import.meta.client) {
		const stored = localStorage.getItem("isDark");
		if (stored !== null) return stored === "true";
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	}
	return false;
};

export const addThemeToStorage = (isDark: boolean) => {
	if (import.meta.client) {
		localStorage.setItem("isDark", isDark.toString());
	}
};
