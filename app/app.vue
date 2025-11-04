<script lang="ts" setup>
import { isDarkThemeSelected } from "~/utils/theme";
import { useAppStore } from "~/store/app.store";

const appStore = useAppStore();
const { isDarkTheme } = storeToRefs(appStore);
onMounted(() => {
	handleTheme();
});

function handleTheme() {
	const isDark = isDarkThemeSelected();
	isDarkTheme.value = isDark;
	if (import.meta.client) {
		document.body.classList.toggle("dark", isDark);
	}
}
</script>

<template>
	<UApp>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
