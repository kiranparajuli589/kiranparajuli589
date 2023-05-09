<template>
	<v-app>
		<v-main>
			<div class="cursor" />
			<router-view />
			<ScrollTop />
			<Footer />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import {onMounted} from "vue"
import Footer from "@/components/Footer.vue"
import ScrollTop from "@/components/ScrollTop.vue"

onMounted(() => {
	addMouseMoveEvent()
})

function addMouseMoveEvent() {
	const cursor: HTMLElement = document.querySelector(".cursor") as HTMLElement
	document.addEventListener("mousemove", (e) => {
		cursor.style.left = `${e.pageX}px`
		cursor.style.top = `${e.pageY}px`
	})
}
</script>
<style lang="scss">
@import "@/styles/main.scss";
</style>
