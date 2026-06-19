<script setup lang="ts">
import { addThemeToStorage, isDarkThemeSelected } from "~/utils/theme";
import { useAppStore } from "~/store/app.store";
import { storeToRefs } from "pinia";
import { NuxtLink } from "#components";

const route = useRoute();
const appStore = useAppStore();
const { isDarkTheme } = storeToRefs(appStore);

const changeTheme = () => {
	const currentTheme = isDarkThemeSelected();
	addThemeToStorage(!currentTheme);
	isDarkTheme.value = !currentTheme;
	if (import.meta.client) {
		document.body.classList.toggle("dark");
	}
};

function isNavLinkActive(to: string): boolean {
	const path = route.path;

	if (to === "/works") {
		return path === "/works" || path.startsWith("/works/");
	}

	if (to === "/resume") {
		return (
			path === "/resume" ||
			path.startsWith("/resume") ||
			path === "/cover-letter" ||
			path.startsWith("/cover-letter/")
		);
	}

	if (to === "/blogs") {
		return (
			path === "/blogs" ||
			path.startsWith("/blogs/") ||
			path.startsWith("/blog/")
		);
	}

	return path === to || path.startsWith(`${to}/`);
}

const links = computed(() => {
	return [
		{
			name: "Works",
			icon: "i-heroicons-folder-open",
			to: "/works",
		},
		{
			name: "Resume",
			icon: "i-heroicons-user-circle",
			to: "/resume",
		},
		{
			name: "Blogs",
			icon: "i-heroicons-document-text",
			to: "/blogs",
		},
	];
});
</script>
<template>
	<nav
		class="flex items-center justify-between flex-wrap gap-4 p-4 bg-gray-300 dark:bg-gray-900"
	>
		<NuxtLink
			to="/"
			class="toolbar-brand uppercase font-semibold text-2xl font-brand transition-colors duration-200 ease-out"
			:class="
				route.path === '/'
					? 'text-primary-700 dark:text-primary-300'
					: 'text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400'
			"
		>
			Kiran
		</NuxtLink>
		<div class="flex gap-2 flex-wrap">
			<UButton
				v-for="link in links"
				:key="link.name"
				class="toolbar-link transition-all duration-200 ease-out"
				as="NuxtLink"
				:to="link.to"
				:icon="link.icon"
				:label="link.name"
				:variant="isNavLinkActive(link.to) ? 'soft' : 'ghost'"
				:color="isNavLinkActive(link.to) ? 'primary' : 'neutral'"
				:ui="{
					label: 'font-bold',
				}"
			/>
			<UButton
				variant="ghost"
				color="neutral"
				class="toolbar-link font-bold transition-all duration-200 ease-out"
				:icon="isDarkTheme ? 'mdi-weather-night' : 'mdi-weather-sunny'"
				:title="isDarkTheme ? 'Dark Mode' : 'Light Mode'"
				@click="changeTheme"
			/>
		</div>
		<a
			href="mailto:kiranparajuli589@gmail.com"
			class="email toolbar-link flex items-center gap-2 transition-colors duration-200 ease-out hover:text-primary-600 dark:hover:text-primary-400"
		>
			<UIcon name="i-heroicons-envelope" />
			<b class="hidden md:block">kiranparajuli589@gmail.com</b>
		</a>
	</nav>
</template>

<style scoped>
.toolbar-link:active {
	transform: scale(0.97);
}
</style>
