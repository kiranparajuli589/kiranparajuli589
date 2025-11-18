<script setup lang="ts">
import { computed } from "vue";

interface Props {
	content: string;
	preview: string;
}

interface Emits {
	(e: "update:content", value: string): void;
	(e: "download-txt" | "download-pdf" | "download-docx" | "copy"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Calculate word and character counts
const wordCount = computed(() => {
	if (!props.content) return 0;
	return props.content
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
});

const characterCount = computed(() => {
	return props.content ? props.content.length : 0;
});

const characterCountNoSpaces = computed(() => {
	return props.content ? props.content.replace(/\s/g, "").length : 0;
});
</script>

<template>
	<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-xl font-semibold">Generated Cover Letter</h2>
			<div class="flex gap-2 flex-wrap">
				<UButton
					color="primary"
					variant="outline"
					size="sm"
					title="Copy to clipboard"
					@click="emit('copy')"
				>
					<UIcon name="mdi:content-copy" />
					<span class="ml-1 text-sm">Copy</span>
				</UButton>
				<UButton
					color="primary"
					variant="outline"
					size="sm"
					title="Download as TXT"
					@click="emit('download-txt')"
				>
					<span class="ml-1 text-sm">Download TXT</span>
				</UButton>
				<UButton
					color="primary"
					variant="outline"
					size="sm"
					title="Download as PDF"
					@click="emit('download-pdf')"
				>
					<span class="ml-1 text-sm">Download PDF</span>
				</UButton>
				<UButton
					color="primary"
					variant="outline"
					size="sm"
					title="Download as DOCX"
					@click="emit('download-docx')"
				>
					<span class="ml-1 text-sm">Download DOCX</span>
				</UButton>
			</div>
		</div>
		<UTextarea
			rows="20"
			class="w-full font-mono text-sm"
			placeholder="Cover letter will appear here..."
			:model-value="content"
			@update:model-value="emit('update:content', $event)"
		/>
		<div
			class="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 mb-2"
		>
			<div class="flex gap-4">
				<span><strong>Words:</strong> {{ wordCount }}</span>
				<span><strong>Characters:</strong> {{ characterCount }}</span>
				<span
					><strong>Characters (no spaces):</strong>
					{{ characterCountNoSpaces }}</span
				>
			</div>
		</div>
		<div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
			<p class="mb-2">
				<strong>Preview:</strong>
			</p>
			<div
				class="cover-letter-content prose dark:prose-invert max-w-none whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded border"
			>
				{{ preview }}
			</div>
		</div>
	</div>
</template>

<style scoped>
.dark .cover-letter-content {
	color: #e5e7eb;
}

.cover-letter-content {
	white-space: pre-wrap;
	line-height: 1.6;
}
</style>
