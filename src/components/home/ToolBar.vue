<template>
	<v-toolbar class="home--toolbar">
		<div class="main">Kiran</div>
		<div class="email">
			<v-icon>mdi-email</v-icon>
			kiranparajuli589@gmail.com
		</div>
		<v-btn icon><v-icon>mdi-weather-sunny</v-icon></v-btn>
		<div class="btn" v-ripple @click="scrollTo.scrollToWorks()">
			<v-icon>mdi-file</v-icon>
			Works
		</div>
		<div class="btn" v-ripple>
			<v-icon>mdi-account-tie</v-icon>
			Resume
		</div>
		<div class="btn" v-ripple>
			<v-icon>mdi-post</v-icon>
			Blog
		</div>
	</v-toolbar>
</template>
<script setup lang="ts">
import useScrollTo from "@/composables/scrollTo"

const scrollTo = useScrollTo()
</script>
