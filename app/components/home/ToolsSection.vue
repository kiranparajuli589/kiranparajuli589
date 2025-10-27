<template>
	<div class="home--tools">
		<h2>Tools I Use</h2>
		<div class="section-divider"/>
		<p class="mb-7">These are, but not limited to, the techs I use for different services.</p>

		<UCard v-for="tech in Techs" :key="tech.name" class="mb-4" variant="outlined">
			<template #header>
				{{ tech.name }}
			</template>

			<div class="border-t border-gray-200 dark:border-gray-700 my-4" />

			<div class="tech-list flex items-center flex-wrap gap-4 mt-4">
				<div v-for="(tool, index) in tech.tools" :key="index" :title="tool.tooltip">
					<i v-if="tool.class" :class="tool.class" class="text-6xl" />
					<img v-if="tool.image" :src="getAssetUrl(tool.image, 'tech')" class="w-16 h-auto grayscale hover:grayscale-0 transition-all" />
				</div>
			</div>
		</UCard>
	</div>
</template>
<script setup lang="ts">
import Resume from '~/utils/resume'
import { getAssetUrl } from '~/utils'

const Techs = Resume.technologies
</script>
<style scoped>
div[title='Behat'] img {
	height: 3.8rem;
	width: 3rem;
}

:global(body.dark) {
	div[title='Behat'],
	div[title='VPS'] {
		filter: invert(1);
	}
}
</style>
