<script setup lang="ts">
import { useScrollTo } from "~/composables/scrollTo";
import { addThemeToStorage, isDarkThemeSelected } from "~/utils/theme";
import { useAppStore } from "~/store/app.store";
import { storeToRefs } from "pinia";
import { NuxtLink } from "#components";

const scrollTo = useScrollTo();

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
const links = computed(() => {
	return [
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
		<NuxtLink to="/" class="uppercase font-semibold text-2xl font-brand">
			Kiran
		</NuxtLink>
		<div class="flex gap-2 flex-wrap">
			<UButton
				variant="ghost"
				class="font-bold"
				icon="i-heroicons-folder-open"
				label="Works"
				@click="scrollTo.works"
			/>
			<UButton
				v-for="link in links"
				:key="link.name"
				variant="ghost"
				as="NuxtLink"
				:to="link.to"
				:icon="link.icon"
				:label="link.name"
				:ui="{
					label: 'font-bold',
				}"
			/>
			<UButton
				variant="ghost"
				class="font-bold"
				:icon="isDarkTheme ? 'mdi-weather-night' : 'mdi-weather-sunny'"
				:title="isDarkTheme ? 'Dark Mode' : 'Light Mode'"
				@click="changeTheme"
			/>
		</div>
		<a
			href="mailto:kiranparajuli589@gmail.com"
			class="email flex items-center gap-2"
		>
			<UIcon name="i-heroicons-envelope" />
			<b class="hidden md:block">kiranparajuli589@gmail.com</b>
		</a>
	</nav>
</template>
