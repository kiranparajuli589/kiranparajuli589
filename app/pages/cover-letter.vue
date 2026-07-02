<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Resume from "~/utils/resume";
import type { ResumePdfVariant } from "~/customTypes";
import { useSeo } from "~/composables/useSeo";
import {
	useCoverLetterStorage,
	type SavedCoverLetter,
} from "~/composables/useCoverLetterStorage";
import {
	useCoverLetterGenerator,
	getCoverLetterVariantLabel,
	type CoverLetterTemplate,
} from "~/composables/useCoverLetterGenerator";
import { useCoverLetterActions } from "~/composables/useCoverLetterActions";
import { useAnalytics } from "~/composables/useAnalytics";
import RecentCoverLetters from "~/components/cover-letter/RecentCoverLetters.vue";
import CoverLetterForm from "~/components/cover-letter/CoverLetterForm.vue";
import CoverLetterEditor from "~/components/cover-letter/CoverLetterEditor.vue";

const siteUrl = "https://kiranparajuli.com.np";
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const route = useRoute();
const router = useRouter();

function parseResumeVariant(value: unknown): ResumePdfVariant {
	if (value === "react") return "react";
	if (value === "fullstack") return "fullstack";
	return "vue";
}

const resumeVariant = ref<ResumePdfVariant>(
	parseResumeVariant(route.query.variant),
);

watch(
	() => route.query.variant,
	(value) => {
		resumeVariant.value = parseResumeVariant(value);
	},
);

const currentUrl = computed(
	() => `${siteUrl}/cover-letter?variant=${resumeVariant.value}`,
);

const companyName = ref("");
const position = ref("");
const jobDescription = ref("");
const coverLetterTemplate = ref<CoverLetterTemplate>("standard");
const coverLetterGenerated = ref(false);
const editableContent = ref("");
const showRecentLetters = ref(false);
const pendingVariantRegenerate = ref(false);

const toast = useToast();
const {
	recentCoverLetters,
	saveCoverLetter,
	deleteCoverLetter,
	clearAllRecent,
} = useCoverLetterStorage();
const { generateCoverLetterTemplate } = useCoverLetterGenerator();
const { trackCoverLetterGeneration } = useAnalytics();

const variantLabel = computed(() =>
	getCoverLetterVariantLabel(resumeVariant.value),
);

useSeo({
	title: `Cover Letter Generator - ${personalInfo.name}`,
	description: `Generate a personalized cover letter aligned with your resume variant. ${personalInfo.name}, ${personalInfo.role}.`,
	keywords: `${personalInfo.name} Cover Letter, Job Application, Cover Letter Generator, Resume Cover Letter, Vue Nuxt, React Next.js`,
	image: imageUrl,
	url: currentUrl.value,
	type: "website",
});

useHead({
	title: computed(
		() =>
			`Cover Letter Generator (${resumeVariant.value === "react" ? "React/Next.js" : "Vue/Nuxt"}) - ${personalInfo.name} | Kiran Parajuli`,
	),
});

const buildCoverLetter = () =>
	generateCoverLetterTemplate(
		companyName.value,
		position.value,
		jobDescription.value,
		coverLetterTemplate.value,
		resumeVariant.value,
	);

const coverLetter = computed(() => {
	if (coverLetterGenerated.value && editableContent.value) {
		return editableContent.value;
	}
	return buildCoverLetter();
});

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

const { copyToClipboard, downloadAsTxt, downloadAsPdf, downloadAsDocx } =
	useCoverLetterActions(
		coverLetter,
		companyName,
		position,
		showToastNotification,
		resumeVariant,
	);

const setResumeVariant = (variant: ResumePdfVariant) => {
	if (resumeVariant.value === variant) return;

	resumeVariant.value = variant;
	router.replace({ query: { ...route.query, variant } });

	if (coverLetterGenerated.value) {
		pendingVariantRegenerate.value = true;
	}
};

const regenerateForCurrentVariant = () => {
	if (!companyName.value.trim() || !position.value.trim()) {
		showToastNotification(
			"Please fill in both company name and position.",
			"error",
		);
		return;
	}

	editableContent.value = buildCoverLetter();
	pendingVariantRegenerate.value = false;
	saveCoverLetter(
		companyName.value,
		position.value,
		jobDescription.value,
		editableContent.value,
		resumeVariant.value,
	);
	showToastNotification(`Cover letter regenerated for ${variantLabel.value}.`);
};

const loadCoverLetter = (letter: SavedCoverLetter) => {
	companyName.value = letter.companyName;
	position.value = letter.position;
	jobDescription.value = letter.jobDescription;
	editableContent.value = letter.content;
	coverLetterGenerated.value = true;
	showRecentLetters.value = false;
	pendingVariantRegenerate.value = false;

	if (letter.variant) {
		resumeVariant.value = letter.variant;
		router.replace({ query: { ...route.query, variant: letter.variant } });
	}

	showToastNotification("Cover letter loaded successfully!");
};

const handleDelete = (id: string) => {
	const success = deleteCoverLetter(id);
	if (success) {
		showToastNotification("Cover letter deleted successfully!");
	} else {
		showToastNotification("Failed to delete cover letter.", "error");
	}
};

const handleClearAll = () => {
	const success = clearAllRecent();
	if (success) {
		showToastNotification("All cover letters cleared successfully!");
	} else {
		showToastNotification("Failed to clear cover letters.", "error");
	}
};

const generateCoverLetter = () => {
	if (companyName.value.trim() && position.value.trim()) {
		editableContent.value = buildCoverLetter();
		coverLetterGenerated.value = true;
		pendingVariantRegenerate.value = false;
		trackCoverLetterGeneration();
		setTimeout(() => {
			saveCoverLetter(
				companyName.value,
				position.value,
				jobDescription.value,
				editableContent.value,
				resumeVariant.value,
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
				resumeVariant.value,
			);
		}, 2000);
	}
};

const resetForm = () => {
	coverLetterGenerated.value = false;
	pendingVariantRegenerate.value = false;
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

			<div
				class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
			>
				<p class="text-sm text-gray-600 dark:text-gray-400">
					Aligned with:
					<strong>{{ variantLabel }}</strong>
				</p>
				<div class="flex flex-wrap gap-2">
					<UButton
						size="sm"
						:color="resumeVariant === 'vue' ? 'primary' : 'neutral'"
						:variant="resumeVariant === 'vue' ? 'subtle' : 'outline'"
						@click="setResumeVariant('vue')"
					>
						Vue / Nuxt
					</UButton>
					<UButton
						size="sm"
						:color="resumeVariant === 'react' ? 'primary' : 'neutral'"
						:variant="resumeVariant === 'react' ? 'subtle' : 'outline'"
						@click="setResumeVariant('react')"
					>
						React / Next.js
					</UButton>
					<UButton
						size="sm"
						:color="resumeVariant === 'fullstack' ? 'primary' : 'neutral'"
						:variant="resumeVariant === 'fullstack' ? 'subtle' : 'outline'"
						@click="setResumeVariant('fullstack')"
					>
						Full-Stack (Python / Django)
					</UButton>
				</div>
			</div>

			<div
				v-if="pendingVariantRegenerate"
				class="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20"
			>
				<p class="mb-3 text-sm">
					You switched to the {{ variantLabel }}. Regenerate to replace the
					current letter with content matched to that resume variant.
				</p>
				<UButton color="primary" size="sm" @click="regenerateForCurrentVariant">
					Regenerate for {{ variantLabel }}
				</UButton>
			</div>

			<RecentCoverLetters
				:letters="recentCoverLetters"
				:show="showRecentLetters"
				@load="loadCoverLetter"
				@delete="handleDelete"
				@clear-all="handleClearAll"
			/>

			<CoverLetterForm
				v-model:company-name="companyName"
				v-model:position="position"
				v-model:job-description="jobDescription"
				v-model:template="coverLetterTemplate"
				:disabled="coverLetterGenerated"
				@generate="generateCoverLetter"
				@reset="resetForm"
			/>

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

			<div
				v-if="!coverLetterGenerated"
				class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6"
			>
				<h3 class="font-semibold mb-2">Instructions:</h3>
				<ul class="list-disc list-inside space-y-1 text-sm">
					<li>
						Choose Vue/Nuxt or React/Next.js to match the resume you are
						submitting
					</li>
					<li>
						Paste the job description when possible — the generator detects
						Figma, AI, and QA keywords to tailor qualifications
					</li>
					<li>Enter the company name and position you're applying for</li>
					<li>
						Click "Generate Cover Letter" to create a personalized cover letter
					</li>
					<li>Review and customize the generated cover letter as needed</li>
					<li>Copy to clipboard or download as TXT, PDF, or DOCX</li>
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
