<template>
	<v-app-bar class="home--toolbar" density="compact">
		<div class="main" @click="onMainClick()">Kiran</div>
		<div class="email">
			<v-icon>mdi-email</v-icon>
			kiranparajuli589@gmail.com
		</div>
		<v-btn icon><v-icon>mdi-weather-sunny</v-icon></v-btn>
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
	</v-app-bar>
</template>
<script setup lang="ts">
import useScrollTo from "@/composables/scrollTo"
import {useRouter} from "vue-router"

const scrollTo = useScrollTo()
const router = useRouter()

const onMainClick = () => {
	if (router.currentRoute.value.name === "Home") {
		scrollTo.top()
	} else {
		router.push({name: "Home"})
	}
}
</script>
