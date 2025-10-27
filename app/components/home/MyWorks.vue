<script lang="ts" setup>
import Resume from "~/utils/resume";
import { getAssetUrl } from "~/utils";

const works = Resume.works;
</script>
<template>
	<section id="works" class="py-12">
		<h1 class="text-4xl font-bold">My Works</h1>
		<div class="text-sm text-gray-500">Some of My Projects</div>
		<div class="section-divider mb-12" />
		<div class="flex flex-wrap gap-4">
			<UCard
				v-for="work in works"
				:key="work.title"
				variant="subtle"
				class="flex-[48%] min-w-80"
			>
				<template #header>
					<h2 class="work--card--title text-3xl">{{ work.title }}</h2>
				</template>

				<div class="bg-gray-200 rounded-lg overflow-hidden">
					<img
						class="w-full max-h-64 object-cover"
						alt="thumbnail"
						:src="getAssetUrl(work.thumbnail, 'projects')"
					/>
				</div>

				<div class="mt-4">
					{{ work.description }}
				</div>

				<div class="border-t border-gray-200 dark:border-gray-700 my-4" />

				<div class="flex flex-wrap gap-4">
					<a
						v-for="[key, value] in Object.entries(work.links)"
						:key="key"
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary hover:underline"
						:href="value"
						:title="key"
					>
						{{ key }}
					</a>
				</div>
			</UCard>
		</div>
	</section>
</template>
