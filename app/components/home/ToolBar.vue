<template>
	<nav class="flex items-center justify-between gap-4 p-4 bg-gray-300">
		<div class="uppercase cursor-pointer font-semibold text-2xl" @click="onMainClick()">Kiran</div>
		<div class="flex gap-2">
			<UButton
				v-for="link in links"
				:key="link.name"
				variant="ghost"
				:icon="link.icon"
				:label="link.name"
				@click="link.action"
			/>
		</div>
		<a href="mailto:kiranparajuli589@gmail.com" class="email flex items-center gap-2">
			<UIcon name="i-heroicons-envelope" />
			<b class="hidden md:block">kiranparajuli589@gmail.com</b>
		</a>
	</nav>
</template>
<script setup lang="ts">
import { useScrollTo } from '~/composables/scrollTo'
import { useAppStore, addThemeToStorage, isDarkThemeSelected } from '~/composables/useAppStore'

const scrollTo = useScrollTo()
const route = useRoute()

const appStore = useAppStore()
const { isDarkTheme } = toRefs(appStore)

const onMainClick = () => {
	if (route.name === 'index') {
		scrollTo.top()
	} else {
		navigateTo('/')
	}
}

const changeTheme = () => {
	const currentTheme = isDarkThemeSelected()
	addThemeToStorage(!currentTheme)
	appStore.updateTheme(!currentTheme)
	if (import.meta.client) {
		document.body.classList.toggle('dark')
	}
}

const links = [
	{ name: 'Works', icon: 'i-heroicons-folder-open', action: scrollTo.works },
	{ name: 'Resume', icon: 'i-heroicons-user-circle', action: () => navigateTo('/resume') },
	{ name: 'Blogs', icon: 'i-heroicons-document-text', action: () => navigateTo('/blogs') },
	{ name: '', icon: 'i-heroicons-sun', action: () => changeTheme() },
]
</script>
