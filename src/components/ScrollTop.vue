<template>
	<div v-if="showTop" class="scroll-top" v-ripple @click="scrollToTop">Scroll To Top</div>
</template>
<script setup lang="ts">
import {ref} from "vue"

function scrollToTop() {
	window.scrollTo({top: 0, behavior: "smooth"})
}

const showTop = ref(false)

document.addEventListener("scroll", () => {
	if(window.scrollY > 400) {
		showTop.value = true
	} else {
		showTop.value = false
	}
})
</script>
