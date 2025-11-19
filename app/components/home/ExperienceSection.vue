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

const getProjectAccordionItems = (company: string) => {
	const experience = getExperienceByCompany(company);
	if (!experience?.projects) return [];
	return experience.projects.map((proj, index) => ({
		label: proj.name,
		value: `${company}-project-${index}`,
		icon: undefined,
	}));
};

const getProjectByValue = (value: string | undefined) => {
	if (!value) return undefined;
	const [company, , indexStr] = value.split("-");
	if (!company) return undefined;
	const index = parseInt(indexStr || "0", 10);
	const experience = getExperienceByCompany(company);
	return experience?.projects?.[index];
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
				root: 'bg-gray-100 dark:bg-gray-900! rounded-lg overflow-hidden shadow-md main-accordion',
				trigger:
					'px-4 hover:bg-sky-100 dark:hover:bg-blue-800 transition-colors gap-4 md:gap-2',
				content: 'px-4',
			}"
		>
			<template #leading="{ item }">
				<template v-if="item.value">
					<img
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
							:href="getExperienceByCompany(item.value)?.companyUrl || '#'"
							:title="getExperienceByCompany(item.value)?.company || ''"
							@click.stop
						>
							<UIcon
								name="i-heroicons-arrow-top-right-on-square"
								class="text-xs"
							/>
						</a>
					</div>
				</template>
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
						v-if="item.value && getExperienceByCompany(item.value)?.projects"
						class="space-y-4"
					>
						<h2 class="mb-4 font-bold">Projects:</h2>
						<UAccordion
							class="w-full"
							type="multiple"
							:items="item.value ? getProjectAccordionItems(item.value) : []"
							:ui="{
								root: 'bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md',
								trigger:
									'px-4 hover:bg-sky-100 dark:hover:bg-blue-800 transition-colors',
								content: 'px-4',
							}"
						>
							<template #leading="{ item: projectItem }">
								<template v-if="projectItem.value">
									<div class="flex items-center gap-2">
										<h4
											class="overflow-hidden text-ellipsis whitespace-nowrap font-semibold flex-1 text-start"
											:title="getProjectByValue(projectItem.value)?.name"
										>
											{{ getProjectByValue(projectItem.value)?.name }}
										</h4>
										<template
											v-if="getProjectByValue(projectItem.value)?.badge"
										>
											<img
												v-if="isDarkTheme"
												height="28"
												width="auto"
												class="max-w-[100px] h-7 object-contain"
												loading="lazy"
												decoding="async"
												:alt="`${getProjectByValue(projectItem.value)?.name} badge`"
												:src="
													getProjectByValue(projectItem.value)?.badge?.dark ||
													getProjectByValue(projectItem.value)?.badge?.default
												"
											/>
											<img
												v-else
												height="28"
												width="auto"
												class="max-w-[100px] h-7 object-contain"
												loading="lazy"
												decoding="async"
												:alt="`${getProjectByValue(projectItem.value)?.name} badge`"
												:src="
													getProjectByValue(projectItem.value)?.badge?.light ||
													getProjectByValue(projectItem.value)?.badge?.default
												"
											/>
										</template>
										<a
											v-if="getProjectByValue(projectItem.value)?.url"
											target="_blank"
											:href="getProjectByValue(projectItem.value)?.url"
											:title="getProjectByValue(projectItem.value)?.name"
											@click.stop
										>
											<UIcon
												name="i-heroicons-arrow-top-right-on-square"
												class="text-xs"
											/>
										</a>
									</div>
								</template>
							</template>
							<template #body="{ item: projectItem }">
								<template v-if="projectItem.value">
									<div class="space-y-4">
										<div>
											{{ getProjectByValue(projectItem.value)?.description }}
										</div>

										<div
											v-if="
												getProjectByValue(projectItem.value)?.job &&
												(getProjectByValue(projectItem.value)?.job?.length ||
													0) > 0
											"
											class="mt-4"
										>
											<h3 class="mb-3 font-semibold">Responsibilities:</h3>
											<ItemList
												:items="getProjectByValue(projectItem.value)?.job || []"
												no-split
											/>
										</div>
									</div>
								</template>
							</template>
						</UAccordion>
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
<style lang="scss">
.main-accordion {
	.text-start.break-words {
		display: none !important;
	}
	div[role="region"] {
		padding-top: 0.5rem;
	}
}
</style>
