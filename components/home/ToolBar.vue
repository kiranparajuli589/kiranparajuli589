<template>
	<v-toolbar class="home--toolbar" density="compact" :extended="width < 820">
		<div class="main" @click="onMainClick()">Kiran</div>
		<div v-if="width >= 820" class="btn-grp">
			<div class="btn" v-ripple @click="scrollTo.works()">
				<v-icon>mdi-file</v-icon>
				Works
			</div>
			<div class="btn" v-ripple @click="navigateTo('/resume')">
				<v-icon>mdi-account-tie</v-icon>
				Resume
			</div>
			<div class="btn" v-ripple @click="navigateTo('blog')">
				<v-icon>mdi-post</v-icon>
				Blog
			</div>
			<v-btn size="small" icon title="Change Theme" @click="changeTheme()">
				<v-icon size="24">
					{{ isDarkTheme ? "mdi-weather-sunny" : "mdi-weather-night" }}
				</v-icon>
			</v-btn>
		</div>
		<a href="mailto:kiranparajuli589@gmail.com" class="email">
			<v-icon>mdi-email</v-icon>
			<b v-if="!vs">kiranparajuli589@gmail.com</b>
		</a>
		<template #extension v-if="width < 820">
			<div class="btn-grp px-1">
				<div class="btn" v-ripple @click="scrollTo.works()"
						 title="Works"
				>
					<v-icon>mdi-file</v-icon>
					<template v-if="!vs">Works</template>
				</div>
				<div class="btn" v-ripple @click="navigateTo('/resume')"
						 title="Resume"
				>
					<v-icon>mdi-account-tie</v-icon>
					<template v-if="!vs">Resume</template>
				</div>
				<div class="btn" v-ripple @click="navigateTo('/blog')"
						 title="Blog"
				>
					<v-icon>mdi-post</v-icon>
					<template v-if="!vs">Blog</template>
				</div>
				<v-btn size="small" icon title="Change Theme" @click="changeTheme()">
					<v-icon size="24">
						{{ isDarkTheme ? "mdi-weather-sunny" : "mdi-weather-night" }}
					</v-icon>
				</v-btn>
			</div>
		</template>
	</v-toolbar>
</template>
<script setup lang="ts">
import useScrollTo from "@/composables/scrollTo"
import {useRoute} from "vue-router"
import {addThemeToStorage, isDarkThemeSelected} from "@/utils/helper"
import {useAppStore} from "@/store/app"
import {storeToRefs} from "pinia"
import {useDisplay} from "vuetify"
import {computed} from "vue"

const scrollTo = useScrollTo()
const route = useRoute()
const {width} = useDisplay()

const appStore = useAppStore()
const {isDarkTheme} = storeToRefs(appStore)

const vs = computed(() => width.value < 400)

const onMainClick = () => {
	if (route.name === "index") {
		scrollTo.top()
	} else {
		navigateTo("/")
	}
}

const changeTheme = () => {
	const currentTheme: boolean = isDarkThemeSelected()
	addThemeToStorage(!currentTheme)
	appStore.updateTheme(!currentTheme)
	document.body.classList.toggle("dark")
}
</script>
