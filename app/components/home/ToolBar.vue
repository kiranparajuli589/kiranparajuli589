<script setup lang="ts">
import { useScrollTo } from "~/composables/scrollTo";
import {
	useAppStore,
	addThemeToStorage,
	isDarkThemeSelected,
} from "~/composables/useAppStore";

const scrollTo = useScrollTo();
const route = useRoute();

const appStore = useAppStore();

const onMainClick = () => {
	if (route.name === "index") {
		scrollTo.top();
	} else {
		navigateTo("/");
	}
};

const changeTheme = () => {
	const currentTheme = isDarkThemeSelected();
	addThemeToStorage(!currentTheme);
	appStore.updateTheme(!currentTheme);
	if (import.meta.client) {
		document.body.classList.toggle("dark");
	}
};

const links = [
	{ name: "Works", icon: "i-heroicons-folder-open", action: scrollTo.works },
	{
		name: "Resume",
		icon: "i-heroicons-user-circle",
		action: () => navigateTo("/resume"),
	},
	{
		name: "Blogs",
		icon: "i-heroicons-document-text",
		action: () => navigateTo("/blogs"),
	},
];
const changeThemeButton = computed(() => {
	return {
		icon: "i-heroicons-sun",
		action: () => changeTheme(),
		isDark: isDarkThemeSelected(),
		label: isDarkThemeSelected() ? "Light Mode" : "Dark Mode",
	};
});
</script>
<template>
	<nav
		class="flex items-center justify-between gap-4 p-4 bg-gray-300 dark:bg-gray-900"
	>
		<div
			class="uppercase cursor-pointer font-semibold text-2xl"
			@click="onMainClick()"
		>
			Kiran
		</div>
		<div class="flex gap-2">
			<UButton
				v-for="link in links"
				:key="link.name"
				variant="ghost"
				class="font-bold"
				:icon="link.icon"
				:label="link.name"
				@click="link.action"
			/>
			<UButton
				variant="ghost"
				class="font-bold"
				:icon="changeThemeButton.icon"
				:color="changeThemeButton.isDark ? 'white' : 'black'"
				:title="changeThemeButton.label"
				@click="changeThemeButton.action"
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
