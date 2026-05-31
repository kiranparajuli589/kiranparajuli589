<script setup lang="ts">
import Resume from "~/utils/resume";

const languages = Resume.languages;
</script>

<template>
	<section class="py-12">
		<h2 class="text-4xl font-bold">Languages</h2>
		<div class="text-sm text-gray-500 dark:text-gray-400">
			Spoken languages and proficiency levels.
		</div>
		<div class="section-divider mb-8" />
		<ul class="space-y-3">
			<li
				v-for="language in languages"
				:key="language.name"
				class="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-100 px-4 py-3 dark:bg-gray-900"
			>
				<div class="flex items-center gap-3">
					<UIcon
						class="language-flag-icon size-7 shrink-0"
						:name="language.icon"
						:aria-label="`${language.name} flag`"
					/>
					<span class="font-semibold">{{ language.name }}</span>
				</div>
				<span class="text-sm text-gray-600 dark:text-gray-400">
					{{ language.level }}
				</span>
			</li>
		</ul>
	</section>
</template>
