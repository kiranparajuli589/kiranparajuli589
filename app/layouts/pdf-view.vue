<script setup lang="ts">
definePageMeta({
	name: "pdf-view",
	layout: "pdf-view",
});
</script>
<template>
	<div class="pdf-view">
		<slot />
	</div>
</template>
<style scoped>
.pdf-view {
	padding: 0.5rem;
}
</style>
