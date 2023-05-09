<template>
	<v-toolbar class="home--toolbar" density="compact">
		<div class="main" @click="onMainClick()">Kiran</div>
		<div class="btn-grp">
			<div class="btn" v-ripple @click="scrollTo.works()">
				<v-icon>mdi-file</v-icon>
				Works
			</div>
			<div class="btn" v-ripple @click="router.push({name: 'Resume'})">
				<v-icon>mdi-account-tie</v-icon>
				Resume
			</div>
			<div class="btn" v-ripple @click="router.push({name: 'Blog'})">
				<v-icon>mdi-post</v-icon>
				Blog
			</div>
			<v-btn size="small" icon title="Change Theme"
				@click="changeTheme()"
			>
				<v-icon size="24">
					{{isDarkTheme ? "mdi-weather-sunny" : "mdi-weather-night"}}
				</v-icon>
			</v-btn>
		</div>
		<div class="email">
			<v-icon>mdi-email</v-icon>
			<b>kiranparajuli589@gmail.com</b>
		</div>
	</v-toolbar>
</template>
<script setup lang="ts">
import useScrollTo from "@/composables/scrollTo"
import {useRouter} from "vue-router"
import {addThemeToStorage, isDarkThemeSelected} from "@/helper"
import {useAppStore} from "@/store/app"
import {storeToRefs} from "pinia"

const scrollTo = useScrollTo()
const router = useRouter()

const appStore = useAppStore()
const {isDarkTheme} = storeToRefs(appStore)

const onMainClick = () => {
	if (router.currentRoute.value.name === "Home") {
		scrollTo.top()
	} else {
		router.push({name: "Home"})
	}
}

const changeTheme = () => {
	const currentTheme:boolean = isDarkThemeSelected()
	addThemeToStorage(!currentTheme)
	appStore.updateTheme(!currentTheme)
	document.body.classList.toggle("dark")
}
</script>
