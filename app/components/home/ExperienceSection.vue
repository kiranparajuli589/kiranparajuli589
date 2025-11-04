<script setup lang="ts">
import Resume from "~/utils/resume";
import { getAssetUrl } from "~/utils";
import ItemList from "./ItemList.vue";
import { useAppStore } from "~/store/app.store";
import type { AccordionItem } from "@nuxt/ui";

const experiences = Resume.experiences;
const appStore = useAppStore();
const { isDarkTheme } = toRefs(appStore);

const accordionItems = computed<AccordionItem[]>(() => {
	return experiences.map((exp) => ({
		label: exp.company,
		value: exp.company,
		icon: undefined,
	}));
});

const getExperienceByCompany = (company: string) => {
	return experiences.find((e) => e.company === company);
};
</script>
<template>
	<section class="py-12">
		<h1 class="text-4xl font-bold">My Experiences</h1>
		<div class="text-sm text-gray-500 dark:text-gray-400">
			Where I had been engaged.
		</div>
		<div class="section-divider mb-12" />
		<UAccordion
			class="w-full"
			type="multiple"
			:items="accordionItems"
			:ui="{
				root: 'bg-gray-100 dark:bg-gray-900! rounded-lg overflow-hidden shadow-md',
				trigger:
					'px-4 hover:bg-sky-100 dark:hover:bg-blue-800 transition-colors',
				content: 'px-4',
			}"
		>
			<template #leading="{ item }">
				<img
					v-if="item.value"
					height="24px"
					width="24px"
					class="w-6 h-6 object-contain"
					loading="lazy"
					decoding="async"
					:alt="`${getExperienceByCompany(item.value)?.company} logo`"
					:src="
						getAssetUrl(
							getExperienceByCompany(item.value)?.companyLogo || '',
							'company',
						)
					"
				/>

				<div class="flex items-center gap-2 flex-wrap">
					<span class="font-semibold">{{
						getExperienceByCompany(item.value)?.company
					}}</span>
					<span class="mx-2 text-gray-400">|</span>
					<span class="text-sm text-gray-600 dark:text-gray-400">
						{{ getExperienceByCompany(item.value)?.roles.join(", ") }}
					</span>
					<span class="mx-2 text-gray-400">|</span>
					<span class="text-sm text-gray-600 dark:text-gray-400">
						{{
							`${getExperienceByCompany(item.value)?.startDate} - ${getExperienceByCompany(item.value)?.endDate}`
						}}
					</span>
					<a
						v-if="getExperienceByCompany(item.value)?.companyUrl"
						class="ml-auto"
						target="_blank"
						:href="getExperienceByCompany(item.value)?.companyUrl"
						:title="getExperienceByCompany(item.value)?.company"
						@click.stop
					>
						<UIcon
							name="i-heroicons-arrow-top-right-on-square"
							class="text-xs"
						/>
					</a>
				</div>
			</template>
			<template #body="{ item }">
				<div v-if="item.value" class="space-y-4">
					<div>
						{{ getExperienceByCompany(item.value)?.description }}
					</div>

					<div v-if="getExperienceByCompany(item.value)?.achievements">
						<h2 class="mb-4 font-bold">Achievements:</h2>
						<ItemList
							:items="getExperienceByCompany(item.value)?.achievements || []"
							no-split
						/>
					</div>

					<div
						v-if="getExperienceByCompany(item.value)?.projects"
						class="space-y-4"
					>
						<h2 class="mb-4 font-bold">Projects:</h2>
						<UCard
							v-for="proj in getExperienceByCompany(item.value)?.projects"
							:key="proj.name"
							class="mb-6 pt-1 pb-2"
							variant="subtle"
							:ui="{
								root: '!bg-gray-200 dark:bg-gray-800 shadow-md',
							}"
						>
							<template #header>
								<div class="flex items-center gap-2">
									<h4
										class="overflow-hidden text-ellipsis whitespace-nowrap font-semibold"
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

							<div>{{ proj.description }}</div>

							<div class="mt-4">
								<h3 class="mb-3 font-semibold">Responsibilities:</h3>
								<ItemList :items="proj.job" no-split />
							</div>
						</UCard>
					</div>
				</div>
			</template>
		</UAccordion>
	</section>
</template>
<style scoped>
.home--experience .header {
	gap: 0.3rem;
}
</style>
