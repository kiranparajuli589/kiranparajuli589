<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ExperienceSection from "~/components/home/ExperienceSection.vue";
import ToolsSection from "~/components/home/ToolsSection.vue";
import Resume from "~/utils/resume";
import {
	useSeo,
	createPersonStructuredData,
	createCollectionPageStructuredData,
} from "~/composables/useSeo";

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/resume`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;
const experiences = Resume.experiences;
const technologies = Resume.technologies;

// Extract skills from technologies
const skills = technologies.flatMap((tech) => tech.tools.map((t) => t.tooltip));
const skillsList = [...new Set(skills)].slice(0, 10).join(", ");

// Create a summary for SEO
const resumeSummary = `Professional resume of ${personalInfo.name}, a ${personalInfo.role} with ${experiences.length} years of experience in software development and quality assurance. Specialized in ${skillsList} and modern web technologies.`;

// Page-specific SEO
useSeo({
	title: `Resume - ${personalInfo.name}`,
	description: resumeSummary,
	keywords: `${personalInfo.name}, Resume, Curriculum Vitae, Frontend Developer Resume, Full Stack Developer Resume, QA Engineer Resume, Developer Portfolio`,
	image: imageUrl,
	url: currentUrl,
	type: "profile",
	structuredData: createPersonStructuredData({
		name: String(personalInfo.name),
		jobTitle: String(personalInfo.role),
		description: String(personalInfo.summary),
		image: imageUrl,
		url: siteUrl,
		email: personalInfo.email ? String(personalInfo.email) : undefined,
		telephone: personalInfo.phone ? String(personalInfo.phone) : undefined,
		address: {
			addressLocality: String(personalInfo.municipality),
			addressCountry: String(personalInfo.country),
			postalCode: personalInfo.postalCode
				? String(personalInfo.postalCode)
				: undefined,
		},
		sameAs: [
			personalInfo.linkedin ? String(personalInfo.linkedin) : undefined,
			personalInfo.github ? String(personalInfo.github) : undefined,
			personalInfo.devto ? String(personalInfo.devto) : undefined,
		].filter((item) => item !== undefined),
		knowsAbout: [...new Set(skills)].slice(0, 20),
	}),
});

// Additional structured data for collection page
useHead({
	script: [
		{
			type: "application/ld+json",
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				...createCollectionPageStructuredData({
					name: `${personalInfo.name} Resume`,
					description: `Professional resume and experience of ${personalInfo.name}`,
					url: currentUrl,
				}),
			}),
		},
	],
});

// Easter egg: Show buttons when pressing "k" three times
const showButtons = ref(false);
const keySequence = ref<string[]>([]);
let resetSequenceTimeout: ReturnType<typeof setTimeout> | null = null;
const expectedLetter = "k";

const handleKeyPress = (event: KeyboardEvent) => {
	// Only listen for "k" key (case-insensitive)
	if (event.key.toLowerCase() !== expectedLetter) {
		return;
	}

	// Prevent default if not in an input field
	if (
		event.target instanceof HTMLInputElement ||
		event.target instanceof HTMLTextAreaElement
	) {
		return;
	}

	// Clear previous timeout
	if (resetSequenceTimeout) {
		clearTimeout(resetSequenceTimeout);
	}

	// Add "k" to sequence
	keySequence.value.push(expectedLetter);

	// Reset sequence if more than 3 presses
	if (keySequence.value.length > 3) {
		keySequence.value = [expectedLetter];
	}

	// Check if we have three "k" presses
	if (keySequence.value.length === 3) {
		// Show buttons
		showButtons.value = true;

		// Hide buttons after 3 seconds
		setTimeout(() => {
			showButtons.value = false;
		}, 3000);

		// Reset sequence
		keySequence.value = [];
	} else {
		// Reset sequence if no press within 1 second
		resetSequenceTimeout = setTimeout(() => {
			keySequence.value = [];
		}, 1000);
	}
};

onMounted(() => {
	if (import.meta.client) {
		window.addEventListener("keydown", handleKeyPress);
	}
});

onUnmounted(() => {
	if (import.meta.client) {
		window.removeEventListener("keydown", handleKeyPress);
		if (resetSequenceTimeout) {
			clearTimeout(resetSequenceTimeout);
		}
	}
});
</script>
<template>
	<div class="resume">
		<h1 class="pt-12">
			<span class="text-xl uppercase font-bold mr-4">Resume</span>
			<UButton
				color="primary"
				title="Download a copy of my resume"
				variant="subtle"
				class="mr-4"
				:to="'/resume-pdf'"
			>
				<UIcon name="i-heroicons-arrow-down-tray" />
				<span class="px-1 font-bold">Download Pdf</span>
			</UButton>
			<!-- Generate Cover Letter -->
			<UButton
				v-if="showButtons"
				color="primary"
				title="Generate a cover letter"
				variant="subtle"
				:to="'/cover-letter'"
			>
				<UIcon name="i-heroicons-envelope" />
				<span class="px-1 font-bold">Generate Cover Letter</span>
			</UButton>
		</h1>

		<ExperienceSection />
		<ToolsSection />
	</div>
</template>
<style scoped>
.tech-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
}

.tech-list i {
	font-size: 4rem;
}

.tech-list img {
	width: 4rem;
	height: auto;
	filter: grayscale(1);
}

.tech-list img:hover {
	filter: grayscale(0);
}

div[title="Behat"] img {
	height: 3.8rem;
	width: 3rem;
}

body.dark div[title="Behat"],
body.dark div[title="VPS"] {
	filter: invert(1);
}
</style>
