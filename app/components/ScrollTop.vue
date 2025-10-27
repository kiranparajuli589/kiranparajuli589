<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useScrollTo } from "~/composables/scrollTo";

const scrollTo = useScrollTo();
const showTop = ref(false);

const handleScroll = () => {
	if (import.meta.client) {
		if (window.scrollY > 400) {
			showTop.value = true;
		} else {
			showTop.value = false;
		}
	}
};

onMounted(() => {
	if (import.meta.client) {
		document.addEventListener("scroll", handleScroll);
	}
});

onUnmounted(() => {
	if (import.meta.client) {
		document.removeEventListener("scroll", handleScroll);
	}
});
</script>
<template>
	<UButton v-if="showTop" class="scroll-top" @click="scrollTo.top()">
		Scroll To Top
	</UButton>
</template>
