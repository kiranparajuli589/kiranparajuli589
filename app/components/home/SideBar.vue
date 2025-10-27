<template>
	<div class="flex flex-col gap-4 w-72 md:w-auto md:absolute md:left-8 top-24">
		<a :href="personalInfo.linkedin" target="_blank" title="LinkedIn">
			<UIcon name="i-mdi-linkedin" class="text-4xl text-blue-600" />
		</a>
		<a :href="personalInfo.github" target="_blank" title="GitHub">
			<UIcon name="i-mdi-github" class="text-4xl" :class="isDarkTheme ? 'text-white' : 'text-black'" />
		</a>
		<a :href="personalInfo.devto" target="_blank" title="dev.to">
			<img src="/tech/devto.png" class="w-8 h-8" alt="dev.to" />
		</a>
	</div>
</template>
<script setup lang="ts">
import { useAppStore } from '~/composables/useAppStore'
import Resume from '~/utils/resume'

const personalInfo = Resume.personalInfo
const appStore = useAppStore()
const { isDarkTheme } = toRefs(appStore)
</script>
