<script setup lang="ts">
import { useAppStore } from "@/store/app";
import { storeToRefs } from "pinia";
import { getAssetUrl } from "@/helper";
import Resume from "@/resume";

const personalInfo = Resume.personalInfo;
const appStore = useAppStore();
const { isDarkTheme } = storeToRefs(appStore);
</script>
<template>
	<div class="home--sidebar">
		<a target="_blank" title="LinkedIn" :href="personalInfo.linkedin">
			<v-icon class="linkedin">mdi-linkedin</v-icon>
		</a>
		<a target="_blank" title="GitHub" :href="personalInfo.github">
			<v-icon class="github" :color="isDarkTheme ? 'white' : ''"
				>mdi-github</v-icon
			>
		</a>
		<a target="_blank" title="dev.to" :href="personalInfo.devto">
			<v-img class="twitter" width="30" :src="getAssetUrl('devto.png')" />
		</a>
	</div>
</template>
