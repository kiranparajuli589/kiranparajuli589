<script setup lang="ts">
import Resume from "~/utils/resume";
import { getAssetUrl } from "~/utils";
import { useAppStore } from "~/store/app.store";
import type { Tool } from "~/customTypes";

const props = withDefaults(
	defineProps<{
		compact?: boolean;
	}>(),
	{
		compact: false,
	},
);

const appStore = useAppStore();
const { isDarkTheme } = toRefs(appStore);
const aiEngineering = Resume.aiEngineering;

function getToolImageSrc(tool: Tool): string {
	if (isDarkTheme.value && tool.imageDark) {
		return getAssetUrl(tool.imageDark, "tech");
	}

	return tool.image ? getAssetUrl(tool.image, "tech") : "";
}
</script>

<template>
	<section :class="props.compact ? '' : 'py-12'">
		<template v-if="!props.compact">
			<h2 class="text-4xl font-bold">{{ aiEngineering.title }}</h2>
			<div class="text-sm text-gray-500 dark:text-gray-400">
				{{ aiEngineering.subtitle }}
			</div>
			<div class="section-divider mb-8" />
		</template>

		<div class="flex flex-wrap items-center gap-4">
			<UTooltip
				v-for="tool in aiEngineering.tools"
				:key="tool.tooltip"
				:text="tool.tooltip"
			>
				<div
					class="inline-flex items-center rounded-lg bg-gray-100 p-3 transition hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800"
					:class="props.compact ? 'p-2' : 'p-3'"
				>
					<img
						v-if="tool.image"
						width="64"
						height="64"
						class="h-auto w-auto max-h-16 max-w-16 object-contain transition-all"
						loading="lazy"
						decoding="async"
						:src="getToolImageSrc(tool)"
						:alt="tool.tooltip"
						:class="tool.imgClass"
					/>
				</div>
			</UTooltip>
		</div>

		<ul
			v-if="!props.compact && aiEngineering.practices.length"
			class="mt-6 list-disc space-y-2 pl-6 text-gray-700 dark:text-gray-300"
		>
			<li v-for="practice in aiEngineering.practices" :key="practice">
				{{ practice }}
			</li>
		</ul>
	</section>
</template>
