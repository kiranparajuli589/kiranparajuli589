<template>
	<div class="resume">
		<h1 class="mb-10 pt-12">
			Resume
			<UButton color="primary" :to="'/resume-pdf'"
				title="Download a copy of my resume"
				variant="solid"
			>
				<UIcon name="i-heroicons-arrow-down-tray" />
				<span class="px-1 font-bold">Download Pdf</span>
			</UButton>
		</h1>

		<ExperienceSection />
		<ToolsSection />
	</div>
</template>
<script setup lang="ts">
import ExperienceSection from '~/components/home/ExperienceSection.vue'
import ToolsSection from '~/components/home/ToolsSection.vue'
</script>
<style scoped>
.tech-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
}

.tech-list i {
	font-size: 4rem;
}

.tech-list img {
	width: 4rem;
	height: auto;
	filter: grayscale(1);
}

.tech-list img:hover {
	filter: grayscale(0);
}

div[title='Behat'] img {
	height: 3.8rem;
	width: 3rem;
}

body.dark div[title='Behat'],
body.dark div[title='VPS'] {
	filter: invert(1);
}
</style>

