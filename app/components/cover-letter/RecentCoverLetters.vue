<script setup lang="ts">
import type { SavedCoverLetter } from "~/composables/useCoverLetterStorage";

interface Props {
	letters: SavedCoverLetter[];
	show: boolean;
}

interface Emits {
	(e: "load", letter: SavedCoverLetter): void;
	(e: "delete", id: string): void;
	(e: "clear-all"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleLoad = (letter: SavedCoverLetter) => {
	emit("load", letter);
};

const handleDelete = (id: string) => {
	emit("delete", id);
};

const handleClearAll = () => {
	if (
		confirm(
			"Are you sure you want to delete all saved cover letters? This action cannot be undone.",
		)
	) {
		emit("clear-all");
	}
};
</script>

<template>
	<UCard
		v-if="show && letters.length > 0"
		variant="soft"
		:ui="{
			root: 'dark:bg-gray-900! mb-6',
		}"
	>
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-semibold">Recent Cover Letters</h2>
			<UButton color="error" variant="ghost" size="xs" @click="handleClearAll">
				<UIcon name="i-heroicons-trash" />
				<span class="ml-1">Clear All</span>
			</UButton>
		</div>
		<div class="space-y-2">
			<div
				v-for="letter in letters"
				:key="letter.id"
				class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-colors cursor-pointer group"
				@click="handleLoad(letter)"
			>
				<div class="flex-1 min-w-0">
					<div class="flex items-center gap-2 mb-1">
						<h3 class="font-semibold text-lg truncate">
							{{ letter.position }}
						</h3>
						<span class="text-gray-400">at</span>
						<span
							class="font-medium text-primary-600 dark:text-primary-400 truncate"
						>
							{{ letter.companyName }}
						</span>
					</div>
					<div
						class="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400"
					>
						<span class="flex items-center gap-1">
							<UIcon name="i-heroicons-calendar" class="text-xs" />
							{{ letter.createdAt }}
						</span>
						<span v-if="letter.jobDescription" class="flex items-center gap-1">
							<UIcon name="i-heroicons-document-text" class="text-xs" />
							Has job description
						</span>
					</div>
				</div>
				<div class="flex items-center gap-2 ml-4">
					<UButton
						color="primary"
						variant="ghost"
						size="xs"
						title="Load this cover letter"
						@click.stop="handleLoad(letter)"
					>
						<UIcon name="lets-icons:arhive-load-duotone" />
					</UButton>
					<UButton
						color="red"
						variant="ghost"
						size="xs"
						title="Delete this cover letter"
						@click.stop="handleDelete(letter.id)"
					>
						<UIcon name="i-heroicons-trash" />
					</UButton>
				</div>
			</div>
		</div>
	</UCard>
</template>
