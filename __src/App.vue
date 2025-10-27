<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { isDarkThemeSelected } from "@/helper";
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";

onMounted(() => {
	handleTheme();
	// addMouseMoveEvent()
});

// function addMouseMoveEvent() {
// 	const cursor: HTMLElement = document.querySelector(".cursor") as HTMLElement
// 	document.addEventListener("mousemove", (e) => {
// 		cursor.style.left = `${e.pageX}px`
// 		cursor.style.top = `${e.pageY}px`
// 	})
// }

const appStore = useAppStore();

function handleTheme() {
	const isDark = isDarkThemeSelected();
	appStore.updateTheme(isDark);
	document.body.classList.toggle("dark", isDark);
}

const { isDarkTheme } = storeToRefs(appStore);

const theme = computed(() => {
	return isDarkTheme.value ? "dark" : "light";
});
</script>

<template>
	<v-app :theme="theme">
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>
<style lang="scss">
@import "@/styles/main.scss";
</style>
