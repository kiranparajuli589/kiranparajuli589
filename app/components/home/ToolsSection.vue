<script setup lang="ts">
import Resume from "~/utils/resume";
import { getAssetUrl } from "~/utils";

const Techs = Resume.technologies;
</script>
<template>
	<section>
		<h2>Tools I Use</h2>
		<div class="section-divider" />
		<p class="mb-7">
			These are, but not limited to, the techs I use for different services.
		</p>

		<UCard
			v-for="tech in Techs"
			:key="tech.name"
			class="mb-4"
			variant="soft"
			:ui="{
				root: 'dark:!bg-gray-900',
			}"
		>
			<template #header>
				{{ tech.name }}
			</template>

			<div class="tech-list flex items-center flex-wrap gap-4 mt-4">
				<div
					v-for="(tool, index) in tech.tools"
					:key="index"
					:title="tool.tooltip"
				>
					<i v-if="tool.class" class="text-5xl" :class="tool.class" />
					<img
						v-if="tool.image"
						width="64"
						height="64"
						class="w-16 h-16 object-contain transition-all"
						loading="lazy"
						decoding="async"
						:alt="tool.tooltip || 'Technology icon'"
						:src="getAssetUrl(tool.image, 'tech')"
						:class="tool.class"
					/>
				</div>
			</div>
		</UCard>
	</section>
</template>
<style scoped>
/* Special handling for specific tech logos that need custom sizing */
div[title="Behat"] img {
	height: 3.8rem;
	width: 3rem;
}

:global(body.dark) {
	div[title="Behat"],
	div[title="VPS"] {
		filter: invert(1);
	}
}

/* Ensure all tech icons are properly contained */
.tech-list img {
	max-width: 64px;
	max-height: 64px;
}
</style>
