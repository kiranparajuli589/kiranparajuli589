<script setup lang="ts">
import Resume from "~/utils/resume";

const projects = Resume.selectedProjects.slice(0, 4);
</script>

<template>
	<section class="py-12">
		<h2 class="text-4xl font-bold">Featured work</h2>
		<div class="text-sm text-gray-500 dark:text-gray-400">
			Product UI and open-source highlights
		</div>
		<div class="section-divider mb-12" />
		<div class="flex flex-wrap gap-4">
			<UCard
				v-for="project in projects"
				:key="project.title"
				variant="subtle"
				class="grow w-full md:w-[calc(50%-0.5rem)]"
				:ui="{ root: 'dark:!bg-gray-900' }"
			>
				<template #header>
					<h3 class="text-xl font-semibold m-0">{{ project.title }}</h3>
				</template>
				<p class="text-gray-600 dark:text-gray-300 mb-2">
					{{ project.description }}
				</p>
				<p class="mb-4">{{ project.impact }}</p>
				<div class="flex flex-wrap gap-2 mb-4">
					<UBadge
						v-for="tech in project.stack"
						:key="tech"
						variant="subtle"
						color="primary"
					>
						{{ tech }}
					</UBadge>
				</div>
				<div v-if="project.links" class="flex flex-wrap gap-4">
					<a
						v-for="[key, value] in Object.entries(project.links)"
						:key="key"
						:href="value"
						target="_blank"
						rel="noopener noreferrer"
						class="text-primary hover:underline capitalize"
					>
						{{ key }}
					</a>
				</div>
			</UCard>
		</div>
	</section>
</template>
