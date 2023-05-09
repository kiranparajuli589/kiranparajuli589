<template>
	<div class="home--sidebar">
		<a href="https://www.linkedin.com/in/kiranparajuli589/" target="_blank"><v-icon class="linkedin">mdi-linkedin</v-icon></a>
		<a href="https://www.github.com/kiranparajuli589/" target="_blank">
			<v-icon class="github" :color="isDarkTheme ? 'white': ''">mdi-github</v-icon>
		</a>
		<a href="href" target="_blank"><v-icon class="twitter">mdi-twitter</v-icon></a>
	</div>
</template>
<script setup lang="ts">
import {useAppStore} from "@/store/app"
import {storeToRefs} from "pinia"

const appStore = useAppStore()
const {isDarkTheme} = storeToRefs(appStore)
</script>
