<script setup lang="ts">
import type { ResumePdfVariant } from "~/customTypes";
import { useResumeExport } from "~/composables/useResumeExport";
import { useAnalytics } from "~/composables/useAnalytics";
import { useResumeToolsReveal } from "~/composables/useResumeToolsReveal";

const { trackPlainTextDownload } = useAnalytics();
const { toolsUnlocked, headingPressHandlers } = useResumeToolsReveal();

const handleDownloadPlainText = (variant: ResumePdfVariant) => {
	trackPlainTextDownload();
	const { downloadAsPlainText } = useResumeExport(variant);
	downloadAsPlainText();
};

const handleDownloadDocx = async (variant: ResumePdfVariant) => {
	try {
		const { useDocxExport } = await import("~/composables/useDocxExport");
		const { exportResumeAsDocx } = useDocxExport();
		await exportResumeAsDocx(variant);
	} catch (error) {
		console.error("Failed to export DOCX:", error);
		const message =
			error instanceof Error
				? error.message
				: "Failed to export DOCX. Please try again.";
		alert(message);
	}
};
</script>

<template>
	<h1
		class="text-xl uppercase font-bold select-none touch-none w-fit"
		v-bind="headingPressHandlers"
	>
		Resume
	</h1>

	<template v-if="toolsUnlocked">
		<section class="space-y-3">
			<h2
				class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
			>
				Vue / Nuxt Resume
			</h2>
			<div class="flex flex-wrap gap-4 items-center">
				<UButton
					color="primary"
					title="Download Vue/Nuxt resume as PDF"
					variant="subtle"
					to="/resume-pdf"
				>
					<UIcon name="i-heroicons-arrow-down-tray" />
					<span class="px-1 font-bold">PDF</span>
				</UButton>
				<UButton
					color="primary"
					title="Download Vue/Nuxt resume as plain text"
					variant="subtle"
					@click="handleDownloadPlainText('vue')"
				>
					<UIcon name="i-heroicons-document-text" />
					<span class="px-1 font-bold">TXT</span>
				</UButton>
				<UButton
					color="primary"
					title="Download Vue/Nuxt resume as DOCX"
					variant="subtle"
					@click="handleDownloadDocx('vue')"
				>
					<UIcon name="i-heroicons-document-duplicate" />
					<span class="px-1 font-bold">DOCX</span>
				</UButton>
				<UButton
					color="primary"
					title="Generate cover letter aligned with Vue/Nuxt resume"
					variant="subtle"
					to="/cover-letter?variant=vue"
				>
					<UIcon name="i-heroicons-envelope" />
					<span class="px-1 font-bold">Cover Letter</span>
				</UButton>
			</div>
			<p class="text-sm text-gray-600 dark:text-gray-400 print-tip">
				When saving as PDF, disable <strong>Headers and footers</strong> in the
				print dialog to remove date, title, URL, and page numbers.
			</p>
		</section>

		<section class="space-y-3">
			<h2
				class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
			>
				React / Next.js Resume
			</h2>
			<div class="flex flex-wrap gap-4 items-center">
				<UButton
					color="primary"
					title="Download React/Next.js resume as PDF"
					variant="subtle"
					to="/resume-pdf/react"
				>
					<UIcon name="i-heroicons-arrow-down-tray" />
					<span class="px-1 font-bold">PDF</span>
				</UButton>
				<UButton
					color="primary"
					title="Download React/Next.js resume as plain text"
					variant="subtle"
					@click="handleDownloadPlainText('react')"
				>
					<UIcon name="i-heroicons-document-text" />
					<span class="px-1 font-bold">TXT</span>
				</UButton>
				<UButton
					color="primary"
					title="Download React/Next.js resume as DOCX"
					variant="subtle"
					@click="handleDownloadDocx('react')"
				>
					<UIcon name="i-heroicons-document-duplicate" />
					<span class="px-1 font-bold">DOCX</span>
				</UButton>
				<UButton
					color="primary"
					title="Generate cover letter aligned with React/Next.js resume"
					variant="subtle"
					to="/cover-letter?variant=react"
				>
					<UIcon name="i-heroicons-envelope" />
					<span class="px-1 font-bold">Cover Letter</span>
				</UButton>
			</div>
			<p class="text-sm text-gray-600 dark:text-gray-400 print-tip">
				When saving as PDF, disable <strong>Headers and footers</strong> in the
				print dialog to remove date, title, URL, and page numbers.
			</p>
		</section>

		<section class="space-y-3">
			<h2
				class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
			>
				Full-Stack (Python / Django) Resume
			</h2>
			<div class="flex flex-wrap gap-4 items-center">
				<UButton
					color="primary"
					title="Download Full-Stack (Python/Django) resume as PDF"
					variant="subtle"
					to="/resume-pdf/fullstack"
				>
					<UIcon name="i-heroicons-arrow-down-tray" />
					<span class="px-1 font-bold">PDF</span>
				</UButton>
				<UButton
					color="primary"
					title="Download Full-Stack (Python/Django) resume as plain text"
					variant="subtle"
					@click="handleDownloadPlainText('fullstack')"
				>
					<UIcon name="i-heroicons-document-text" />
					<span class="px-1 font-bold">TXT</span>
				</UButton>
				<UButton
					color="primary"
					title="Download Full-Stack (Python/Django) resume as DOCX"
					variant="subtle"
					@click="handleDownloadDocx('fullstack')"
				>
					<UIcon name="i-heroicons-document-duplicate" />
					<span class="px-1 font-bold">DOCX</span>
				</UButton>
				<UButton
					color="primary"
					title="Generate cover letter aligned with Full-Stack (Python/Django) resume"
					variant="subtle"
					to="/cover-letter?variant=fullstack"
				>
					<UIcon name="i-heroicons-envelope" />
					<span class="px-1 font-bold">Cover Letter</span>
				</UButton>
			</div>
			<p class="text-sm text-gray-600 dark:text-gray-400 print-tip">
				When saving as PDF, disable <strong>Headers and footers</strong> in the
				print dialog to remove date, title, URL, and page numbers.
			</p>
		</section>
	</template>
</template>
