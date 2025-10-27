<script setup lang="ts">
import Resume from "~/utils/resume";
import { getAssetUrl } from "~/utils";
import ItemList from "./ItemList.vue";
import { useAppStore } from "~/composables/useAppStore";

const experiences = Resume.experiences;
const appStore = useAppStore();
const { isDarkTheme } = toRefs(appStore);
</script>
<template>
	<section class="py-12">
		<h1 class="text-4xl font-bold">My Experiences</h1>
		<div class="text-sm text-gray-500">Where I had been engaged.</div>
		<div class="section-divider mb-12" />
		<UCard
			v-for="exp in experiences"
			:key="exp.company"
			class="mb-8"
			variant="subtle"
		>
			<template #header>
				<div class="flex items-center gap-2">
					{{ exp.roles.join(", ") }}
					<span class="mx-2">|</span>
					{{ exp.startDate }} - {{ exp.endDate }}
				</div>
			</template>

		<div class="flex items-center gap-2 mb-4">
			<img
				height="24"
				width="24"
				class="w-6 h-6 object-contain"
				loading="lazy"
				decoding="async"
				:alt="`${exp.company} logo`"
				:src="getAssetUrl(exp.companyLogo, 'company')"
			/>
			<strong class="overflow-hidden text-ellipsis whitespace-nowrap">{{
				exp.company
			}}</strong>
			<a target="_blank" :href="exp.companyUrl" :title="exp.company">
				<UIcon name="i-heroicons-arrow-top-right-on-square" class="text-xs" />
			</a>
		</div>

			<div class="mb-4">
				{{ exp.description }}
			</div>

			<div class="mb-4">
				<h2 class="mb-4 font-bold">Achievements:</h2>
				<ItemList :items="exp.achievements" no-split />
			</div>

			<div class="mb-4">
				<h2 class="mb-4 font-bold">Projects:</h2>
				<UCard
					v-for="proj in exp.projects"
					:key="proj.name"
					class="mb-6 pt-1 pb-2"
					variant="subtle"
				>
					<template #header>
						<div class="flex items-center gap-2">
							<h4
								class="overflow-hidden text-ellipsis whitespace-nowrap"
								:title="proj.name"
							>
								{{ proj.name }}
							</h4>
						<template v-if="proj.badge">
							<img
								v-if="isDarkTheme"
								height="28"
								width="auto"
								class="max-w-[100px] h-7 object-contain"
								loading="lazy"
								decoding="async"
								:alt="`${proj.name} badge`"
								:src="proj.badge.dark || proj.badge.default"
							/>
							<img
								v-else
								height="28"
								width="auto"
								class="max-w-[100px] h-7 object-contain"
								loading="lazy"
								decoding="async"
								:alt="`${proj.name} badge`"
								:src="proj.badge.light || proj.badge.default"
							/>
						</template>
							<a
								v-if="proj.url"
								target="_blank"
								:href="proj.url"
								:title="proj.name"
							>
								<UIcon
									name="i-heroicons-arrow-top-right-on-square"
									class="text-xs"
								/>
							</a>
						</div>
					</template>

					<div
						class="border-t border-gray-200 dark:border-gray-700 my-4 mx-4"
					/>

					<div class="mt-4">{{ proj.description }}</div>

					<div class="mt-4">
						<h3 class="mb-3 font-semibold">Responsibilities:</h3>
						<ItemList :items="proj.job" no-split />
					</div>
				</UCard>
			</div>
		</UCard>
	</section>
</template>
<style scoped>
.home--experience .header {
	gap: 0.3rem;
}
</style>
