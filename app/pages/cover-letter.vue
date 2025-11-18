<script setup lang="ts">
import { ref, computed } from "vue";
import Resume from "~/utils/resume";
import { useSeo } from "~/composables/useSeo";

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/cover-letter`;
const imageUrl = `${siteUrl}/letter_k.png`;
const personalInfo = Resume.personalInfo;

// Form inputs
const companyName = ref("");
const position = ref("");
const coverLetterGenerated = ref(false);

// Page-specific SEO
useSeo({
	title: `Cover Letter Generator - ${personalInfo.name}`,
	description: `Generate a personalized cover letter for your job application. ${personalInfo.name}, ${personalInfo.role}.`,
	keywords: `${personalInfo.name} Cover Letter, Job Application, Cover Letter Generator, Resume Cover Letter`,
	image: imageUrl,
	url: currentUrl,
	type: "website",
});

// Generate cover letter based on company and position
const coverLetter = computed(() => {
	if (!companyName.value || !position.value) {
		return "";
	}

	const currentDate = new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const yearsOfExperience = new Date().getFullYear() - 2019;

	const topSkills = Resume.coreSkills[0]?.items[0] || "modern web development";
	const recentExperience = Resume.experiences[0];
	const firstAchievement = recentExperience?.achievements[0] || "";
	const secondAchievement = recentExperience?.achievements[1] || "";

	// Extract key technologies from experiences
	const technologies = Resume.experiences
		.flatMap((exp) => exp.technologies || [])
		.filter((tech, index, self) => self.indexOf(tech) === index)
		.slice(0, 8)
		.join(", ");

	return `Dear Hiring Manager,

I am writing to express my strong interest in the ${position.value} position at ${companyName.value}. With ${yearsOfExperience}+ years of experience in software development, quality assurance, and leading engineering teams, I am excited about the opportunity to contribute to your organization's continued success.

${recentExperience?.company || "Current"} Experience:
In my current role as ${recentExperience?.roles[0] || personalInfo.role} at ${recentExperience?.company || "my current organization"}, I have been instrumental in ${firstAchievement ? firstAchievement.toLowerCase() : "delivering high-quality software solutions"}. This experience has honed my ability to ${topSkills.toLowerCase()}, and I am confident that these skills would translate well to the ${position.value} role at ${companyName.value}.

Key Qualifications:
• ${yearsOfExperience}+ years of experience in frontend engineering, full-stack development, and QA automation
• Proven track record of delivering high-performance web applications using ${technologies || "React.js, Vue.js, TypeScript, and modern frameworks"}
• Strong leadership skills with experience mentoring engineers and leading cross-functional teams
• Expertise in performance optimization, accessibility, and modern web standards
• Comprehensive experience with CI/CD pipelines, automated testing, and DevOps practices

What I Can Bring to ${companyName.value}:
My combination of technical expertise, leadership experience, and passion for building scalable solutions makes me well-suited for this position. I am particularly excited about the opportunity to ${secondAchievement ? secondAchievement.toLowerCase().replace(/\.$/, "") : "contribute to innovative projects and drive technical excellence"} at ${companyName.value}.

I am eager to discuss how my background, skills, and enthusiasm can contribute to your team's success. Thank you for considering my application. I look forward to hearing from you.

Sincerely,

${personalInfo.name}
${personalInfo.role}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
${personalInfo.linkedin ? `LinkedIn: ${personalInfo.linkedin}` : ""}
${personalInfo.website ? `Website: ${personalInfo.website}` : ""}

${currentDate}`;
});

// Generate cover letter
const generateCoverLetter = () => {
	if (companyName.value.trim() && position.value.trim()) {
		coverLetterGenerated.value = true;
	}
};

// Copy to clipboard
const copyToClipboard = async () => {
	try {
		await navigator.clipboard.writeText(coverLetter.value);
		// You can add a toast notification here if needed
		alert("Cover letter copied to clipboard!");
	} catch (err) {
		console.error("Failed to copy:", err);
		alert("Failed to copy to clipboard. Please try again.");
	}
};

// Download as TXT
const downloadAsTxt = () => {
	const blob = new Blob([coverLetter.value], { type: "text/plain" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `cover-letter-${companyName.value.replace(/\s+/g, "-").toLowerCase()}-${position.value.replace(/\s+/g, "-").toLowerCase()}.txt`;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

// Download as PDF
const downloadAsPdf = () => {
	const printWindow = window.open("", "_blank");
	if (!printWindow) {
		alert("Please allow pop-ups to download PDF");
		return;
	}

	const htmlContent = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Cover Letter - ${companyName.value}</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			max-width: 800px;
			margin: 40px auto;
			padding: 20px;
			line-height: 1.6;
			color: #333;
		}
		.date {
			text-align: right;
			margin-bottom: 30px;
		}
		.content {
			white-space: pre-wrap;
		}
		@media print {
			body {
				margin: 0;
				padding: 20px;
			}
		}
	</style>
</head>
<body>
	<div class="content">${coverLetter.value.replace(/\n/g, "<br>")}</div>
</body>
</html>
	`;

	printWindow.document.write(htmlContent);
	printWindow.document.close();

	// Wait for content to load, then print
	setTimeout(() => {
		printWindow.print();
		// Optionally close the window after printing
		// printWindow.close();
	}, 500);
};
</script>

<template>
	<div class="cover-letter-page pt-12 pb-8">
		<div class="max-w-4xl mx-auto px-4">
			<h1 class="text-2xl uppercase font-bold mb-6">Cover Letter Generator</h1>

			<!-- Input Form -->
			<UCard
				variant="soft"
				:ui="{
					root: 'dark:bg-gray-900!',
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
							:disabled="coverLetterGenerated"
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
							:disabled="coverLetterGenerated"
						/>
					</div>
					<UButton
						color="primary"
						size="lg"
						class="w-full sm:w-auto"
						:disabled="!companyName.trim() || !position.trim()"
						@click="generateCoverLetter"
					>
						<UIcon name="i-heroicons-document-text" />
						<span class="ml-2">Generate Cover Letter</span>
					</UButton>
					<UButton
						v-if="coverLetterGenerated"
						color="neutral"
						variant="outline"
						size="lg"
						class="w-full sm:w-auto ml-2"
						@click="
							coverLetterGenerated = false;
							companyName = '';
							position = '';
						"
					>
						<UIcon name="i-heroicons-arrow-path" />
						<span class="ml-2">Generate New</span>
					</UButton>
				</div>
			</UCard>

			<!-- Generated Cover Letter -->
			<div
				v-if="coverLetterGenerated && coverLetter"
				class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
			>
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold">Generated Cover Letter</h2>
					<div class="flex gap-2 flex-wrap">
						<UButton
							color="primary"
							variant="outline"
							size="sm"
							title="Copy to clipboard"
							@click="copyToClipboard"
						>
							<UIcon name="mdi:content-copy" />
							<span class="ml-1 text-sm">Copy</span>
						</UButton>
						<UButton
							color="primary"
							variant="outline"
							size="sm"
							title="Download as TXT"
							@click="downloadAsTxt"
						>
							<span class="ml-1 text-sm">Download TXT</span>
						</UButton>
						<UButton
							color="primary"
							variant="outline"
							size="sm"
							title="Download as PDF"
							@click="downloadAsPdf"
						>
							<span class="ml-1 text-sm">Download PDF</span>
						</UButton>
					</div>
				</div>
				<div
					class="cover-letter-content prose dark:prose-invert max-w-none whitespace-pre-wrap"
					v-html="coverLetter.replace(/\n/g, '<br />')"
				/>
			</div>

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
.dark .cover-letter-content {
	color: #e5e7eb;
}

@media print {
	.cover-letter-page {
		padding: 0;
	}
}
</style>
