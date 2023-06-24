<template>
	<div v-if="showTop" class="scroll-top" v-ripple @click="scrollTo.top()">Scroll To Top</div>
</template>
<script setup lang="ts">
import {ref} from "vue"
import useScrollTo from "@/composables/scrollTo"

const scrollTo = useScrollTo()

const showTop = ref(false)

document.addEventListener("scroll", () => {
	if(window.scrollY > 400) {
		showTop.value = true
	} else {
		showTop.value = false
	}
})
</script>
