<template>
	<v-app>
		<v-main>
			<div class="cursor" />
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import {onMounted} from "vue"

onMounted(() => {
	const cursor: HTMLElement = document.querySelector(".cursor") as HTMLElement
	document.addEventListener("mousemove", (e) => {
		cursor.style.left = `${e.pageX}px`
		cursor.style.top = `${e.pageY}px`
	})
})
</script>
<style lang="scss">
@import "@/styles/main.scss";
</style>
