<script setup lang="ts">
import { ref, computed } from "vue";
import Resume from "~/utils/resume";
import { useSeo } from "~/composables/useSeo";
import {
	useCoverLetterStorage,
	type SavedCoverLetter,
} from "~/composables/useCoverLetterStorage";
import {
	useCoverLetterGenerator,
	type CoverLetterTemplate,
} from "~/composables/useCoverLetterGenerator";
import { useCoverLetterActions } from "~/composables/useCoverLetterActions";
import { useAnalytics } from "~/composables/useAnalytics";
import RecentCoverLetters from "~/components/cover-letter/RecentCoverLetters.vue";
import CoverLetterForm from "~/components/cover-letter/CoverLetterForm.vue";
import CoverLetterEditor from "~/components/cover-letter/CoverLetterEditor.vue";

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/cover-letter`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;

// Form inputs
const companyName = ref("");
const position = ref("");
const jobDescription = ref("");
const coverLetterTemplate = ref<CoverLetterTemplate>("standard");
const coverLetterGenerated = ref(false);
const editableContent = ref("");
const showRecentLetters = ref(false);

// Composables
const toast = useToast();
const {
	recentCoverLetters,
	saveCoverLetter,
	deleteCoverLetter,
	clearAllRecent,
} = useCoverLetterStorage();
const { generateCoverLetterTemplate } = useCoverLetterGenerator();
const { trackCoverLetterGeneration } = useAnalytics();

// Page-specific SEO
useSeo({
	title: `Cover Letter Generator - ${personalInfo.name}`,
	description: `Generate a personalized cover letter for your job application. ${personalInfo.name}, ${personalInfo.role}.`,
	keywords: `${personalInfo.name} Cover Letter, Job Application, Cover Letter Generator, Resume Cover Letter`,
	image: imageUrl,
	url: currentUrl,
	type: "website",
});

const coverLetter = computed(() => {
	if (coverLetterGenerated.value && editableContent.value) {
		return editableContent.value;
	}
	return generateCoverLetterTemplate(
		companyName.value,
		position.value,
		jobDescription.value,
		coverLetterTemplate.value,
	);
});

// Show toast notification using Nuxt UI
const showToastNotification = (
	message: string,
	type: "success" | "error" = "success",
) => {
	toast.add({
		title: type === "success" ? "Success" : "Error",
		description: message,
		color: type === "success" ? "success" : "error",
		icon:
			type === "success" ? "i-heroicons-check-circle" : "i-heroicons-x-circle",
	});
};

// Actions composable
const { copyToClipboard, downloadAsTxt, downloadAsPdf, downloadAsDocx } =
	useCoverLetterActions(
		coverLetter,
		companyName,
		position,
		showToastNotification,
	);

// Load cover letter from storage
const loadCoverLetter = (letter: SavedCoverLetter) => {
	companyName.value = letter.companyName;
	position.value = letter.position;
	jobDescription.value = letter.jobDescription;
	editableContent.value = letter.content;
	coverLetterGenerated.value = true;
	showRecentLetters.value = false;
	showToastNotification("Cover letter loaded successfully!");
};

// Handle delete with toast
const handleDelete = (id: string) => {
	const success = deleteCoverLetter(id);
	if (success) {
		showToastNotification("Cover letter deleted successfully!");
	} else {
		showToastNotification("Failed to delete cover letter.", "error");
	}
};

// Handle clear all with toast
const handleClearAll = () => {
	const success = clearAllRecent();
	if (success) {
		showToastNotification("All cover letters cleared successfully!");
	} else {
		showToastNotification("Failed to clear cover letters.", "error");
	}
};

// Generate cover letter
const generateCoverLetter = () => {
	if (companyName.value.trim() && position.value.trim()) {
		const template = generateCoverLetterTemplate(
			companyName.value,
			position.value,
			jobDescription.value,
			coverLetterTemplate.value,
		);
		editableContent.value = template;
		coverLetterGenerated.value = true;
		trackCoverLetterGeneration();
		// Auto-save after a short delay to allow user to edit first
		setTimeout(() => {
			saveCoverLetter(
				companyName.value,
				position.value,
				jobDescription.value,
				editableContent.value,
			);
		}, 1000);
		showToastNotification(
			"Cover letter generated successfully! You can now edit it before downloading.",
		);
	} else {
		showToastNotification(
			"Please fill in both company name and position.",
			"error",
		);
	}
};

// Save cover letter when content changes (debounced)
let saveTimeout: ReturnType<typeof setTimeout> | null = null;
const handleContentChange = (value: string) => {
	editableContent.value = value;
	if (coverLetterGenerated.value && editableContent.value) {
		if (saveTimeout) {
			clearTimeout(saveTimeout);
		}
		saveTimeout = setTimeout(() => {
			saveCoverLetter(
				companyName.value,
				position.value,
				jobDescription.value,
				editableContent.value,
			);
		}, 2000); // Save 2 seconds after user stops typing
	}
};

// Reset form
const resetForm = () => {
	coverLetterGenerated.value = false;
	companyName.value = "";
	position.value = "";
	jobDescription.value = "";
	editableContent.value = "";
};
</script>

<template>
	<div class="cover-letter-page w-full pt-12 pb-8">
		<div class="w-full px-4">
			<div class="flex justify-between items-center mb-6">
				<h1 class="text-2xl uppercase font-bold">Cover Letter Generator</h1>
				<UButton
					v-if="recentCoverLetters.length > 0"
					color="neutral"
					variant="outline"
					size="sm"
					@click="showRecentLetters = !showRecentLetters"
				>
					<UIcon name="i-heroicons-clock" />
					<span class="ml-2">Recent ({{ recentCoverLetters.length }})</span>
				</UButton>
			</div>

			<!-- Recent Cover Letters -->
			<RecentCoverLetters
				:letters="recentCoverLetters"
				:show="showRecentLetters"
				@load="loadCoverLetter"
				@delete="handleDelete"
				@clear-all="handleClearAll"
			/>

			<!-- Input Form -->
			<CoverLetterForm
				v-model:company-name="companyName"
				v-model:position="position"
				v-model:job-description="jobDescription"
				:disabled="coverLetterGenerated"
				@generate="generateCoverLetter"
				@reset="resetForm"
			/>

			<!-- Generated Cover Letter -->
			<CoverLetterEditor
				v-if="coverLetterGenerated && coverLetter"
				v-model:content="editableContent"
				:preview="coverLetter"
				@update:content="handleContentChange"
				@copy="copyToClipboard"
				@download-txt="downloadAsTxt"
				@download-pdf="downloadAsPdf"
				@download-docx="downloadAsDocx"
			/>

			<!-- Instructions -->
			<div
				v-if="!coverLetterGenerated"
				class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6"
			>
				<h3 class="font-semibold mb-2">Instructions:</h3>
				<ul class="list-disc list-inside space-y-1 text-sm">
					<li>Enter the company name and position you're applying for</li>
					<li>
						Click "Generate Cover Letter" to create a personalized cover letter
					</li>
					<li>Review and customize the generated cover letter as needed</li>
					<li>Copy to clipboard or download as TXT or PDF</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
@media print {
	.cover-letter-page {
		padding: 0;
	}
}
</style>
