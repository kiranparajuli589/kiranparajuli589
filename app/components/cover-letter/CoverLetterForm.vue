<script setup lang="ts">
import { computed } from "vue";

interface Props {
	disabled: boolean;
}

const emit = defineEmits<{
	generate: [];
	reset: [];
}>();

// Use defineModel for two-way binding
const companyName = defineModel<string>("companyName", { required: true });
const position = defineModel<string>("position", { required: true });
const jobDescription = defineModel<string>("jobDescription", {
	required: false,
});
const template = defineModel<
	"standard" | "technical" | "leadership" | "startup" | "enterprise"
>("template", { required: false, default: "standard" });

const { disabled } = defineProps<Props>();

const canGenerate = computed(() => {
	return companyName.value.trim() && position.value.trim();
});
</script>

<template>
	<UCard
		variant="soft"
		:ui="{
			root: 'dark:bg-gray-900! mb-6',
		}"
	>
		<h2 class="text-xl font-semibold mb-4">Job Information</h2>
		<div class="space-y-4">
			<div>
				<label for="company-name" class="block text-sm font-medium mb-2">
					Company Name *
				</label>
				<UInput
					id="company-name"
					v-model="companyName"
					placeholder="Enter company name"
					size="lg"
					class="w-full"
					:disabled="disabled"
				/>
			</div>
			<div>
				<label for="position" class="block text-sm font-medium mb-2">
					Position *
				</label>
				<UInput
					id="position"
					v-model="position"
					placeholder="Enter position title"
					size="lg"
					class="w-full"
					:disabled="disabled"
				/>
			</div>
			<UButton
				color="primary"
				size="lg"
				class="w-full sm:w-auto"
				:disabled="!canGenerate"
				@click="emit('generate')"
			>
				<UIcon name="i-heroicons-document-text" />
				<span class="ml-2">Generate Cover Letter</span>
			</UButton>
			<div class="w-full">
				<label for="template" class="block text-sm font-medium mb-2">
					Template Type
				</label>
				<USelect
					id="template"
					v-model="template"
					class="w-full"
					:items="[
						{ label: 'Standard', value: 'standard' },
						{ label: 'Technical', value: 'technical' },
						{ label: 'Leadership', value: 'leadership' },
						{ label: 'Startup', value: 'startup' },
						{ label: 'Enterprise', value: 'enterprise' },
					]"
					:disabled="disabled"
				/>
			</div>
			<div class="w-full">
				<label for="job-description" class="block text-sm font-medium mb-2">
					Job Description (Optional)
				</label>
				<UTextarea
					id="job-description"
					v-model="jobDescription"
					class="w-full"
					placeholder="Paste the job description here for better personalization..."
					:rows="4"
					:disabled="disabled"
				/>
			</div>
			<UButton
				v-if="disabled"
				color="neutral"
				variant="outline"
				size="lg"
				class="w-full sm:w-auto ml-2"
				@click="emit('reset')"
			>
				<UIcon name="i-heroicons-arrow-path" />
				<span class="ml-2">Generate New</span>
			</UButton>
		</div>
	</UCard>
</template>
