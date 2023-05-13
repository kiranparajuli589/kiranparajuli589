<template>
	<v-toolbar class="home--toolbar"
		 density="compact" :extended="width < 820"
	>
		<div class="main" @click="onMainClick()">Kiran</div>
		<div v-if="width >= 820" class="btn-grp">
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
		<a href="mailto:kiranparajuli589@gmail.com" class="email">
			<v-icon>mdi-email</v-icon>
			<b>kiranparajuli589@gmail.com</b>
		</a>
		<template #extension v-if="width < 820">
			<div class="btn-grp px-1">
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
		</template>
	</v-toolbar>
</template>
<script setup lang="ts">
import useScrollTo from "@/composables/scrollTo"
import {useRouter} from "vue-router"
import {addThemeToStorage, isDarkThemeSelected} from "@/helper"
import {useAppStore} from "@/store/app"
import {storeToRefs} from "pinia"
import {useDisplay} from "vuetify"

const scrollTo = useScrollTo()
const router = useRouter()
const {mobile, width} = useDisplay()

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
<style lang="scss" scoped>
.email {
	text-decoration: none;
}
</style>
