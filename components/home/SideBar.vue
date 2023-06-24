<template>
	<div class="home--sidebar">
		<a :href="personalInfo.linkedin" target="_blank" title="LinkedIn">
			<v-icon class="linkedin">mdi-linkedin</v-icon>
		</a>
		<a :href="personalInfo.github" target="_blank" title="GitHub">
			<v-icon class="github" :color="isDarkTheme ? 'white': ''">mdi-github</v-icon>
		</a>
		<a :href="personalInfo.devto" target="_blank" title="dev.to">
			<v-img :src="getAssetUrl('devto.png')" class="twitter" width="30" />
		</a>
	</div>
</template>
<script setup lang="ts">
import {useAppStore} from "@/store/app"
import {storeToRefs} from "pinia"
import {getAssetUrl} from "@/utils/helper"
import Resume from "@/utils/resume"

const personalInfo = Resume.personalInfo
const appStore = useAppStore()
const {isDarkTheme} = storeToRefs(appStore)
</script>
