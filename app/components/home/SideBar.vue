<script setup lang="ts">
import { useAppStore } from "~/composables/useAppStore";
import Resume from "~/utils/resume";

const personalInfo = Resume.personalInfo;
const appStore = useAppStore();
const { isDarkTheme } = toRefs(appStore);
</script>
<template>
	<div class="flex flex-col gap-4 w-72 md:w-auto md:absolute md:left-8 top-24">
		<a target="_blank" title="LinkedIn" :href="personalInfo.linkedin">
			<UIcon name="i-mdi-linkedin" class="text-4xl text-blue-600" />
		</a>
		<a target="_blank" title="GitHub" :href="personalInfo.github">
			<UIcon
				name="i-mdi-github"
				class="text-4xl"
				:class="isDarkTheme ? 'text-white' : 'text-black'"
			/>
		</a>
		<a target="_blank" title="dev.to" :href="personalInfo.devto">
			<img src="/tech/devto.png" class="w-8 h-8" alt="dev.to" />
		</a>
	</div>
</template>
