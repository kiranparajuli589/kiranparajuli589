<script setup lang="ts">
import { htmlMark } from "~/utils";
import { ref, onBeforeMount } from "vue";
import { useSeo, createArticleStructuredData } from "~/composables/useSeo";

const mdp = htmlMark();
const route = useRoute();
const siteUrl = "https://kiranparajuli.com.np";
const imageUrl = `${siteUrl}/letter_k.png`;

const emptyFrontMatter = {
	title: "",
	date: "",
	tags: [] as string[],
	fileName: "",
	filePath: "",
	contentLength: 0,
};

const frontMatter = ref(emptyFrontMatter);
const blogContent = ref("");
const blogPath = `/blogBase/${route.params.name}.md`;

const loading = ref<boolean>(true);

onBeforeMount(async () => {
	const response = await fetch(blogPath);
	const text = await response.text();
	frontMatter.value = mdp.getFrontMatter(text);
	blogContent.value = mdp.parse(text);

	// Set up dynamic SEO based on blog content
	const currentUrl = `${siteUrl}/blog/${route.params.name}`;
	const blogTitle = frontMatter.value.title || "Blog Post";
	const blogDescription = `${blogTitle} - Read this tech blog article by Kiran Parajuli`;
	const blogTags = frontMatter.value.tags || [];
	const blogDate = frontMatter.value.date
		? new Date(frontMatter.value.date)
		: new Date();

	// Use the SEO composable
	useSeo({
		title: blogTitle,
		description: blogDescription,
		keywords: `${blogTags.join(", ")}, Kiran Parajuli, Tech Blog, Software Development`,
		image: imageUrl,
		url: currentUrl,
		type: "article",
		publishedTime: blogDate.toISOString(),
		structuredData: createArticleStructuredData({
			headline: blogTitle,
			description: blogDescription,
			image: imageUrl,
			datePublished: blogDate.toISOString(),
			dateModified: blogDate.toISOString(),
			authorName: "Kiran Parajuli",
			authorUrl: siteUrl,
			authorJobTitle: "Frontend & Full Stack Developer & QA Engineer",
			publisherName: "Kiran Parajuli",
			publisherImage: imageUrl,
			keywords: blogTags.join(", "),
			url: currentUrl,
		}),
	});

	loading.value = false;
});
</script>
<template>
	<div class="w-full">
		<template v-if="loading">
			<div>
				<USkeleton class="h-64 mb-4" />
				<USkeleton class="h-64 mb-4" />
				<USkeleton class="h-64 mb-4" />
				<USkeleton class="h-64 mb-4" />
			</div>
		</template>
		<div v-else>
			<h1>{{ frontMatter.title }}</h1>
			<p>{{ new Date(frontMatter.date).toDateString() }}</p>
			<div class="blog-tags flex flex-wrap gap-2 mt-4">
				<span
					v-for="(tag, index) in frontMatter.tags"
					:key="index"
					class="bg-gray-100 px-3 py-1 rounded-lg dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
				>
					{{ tag }}
				</span>
			</div>
			<br />
			<div
				class="blog-content dark:bg-gray-900 pt-6 rounded-xl p-4"
				v-html="blogContent"
			/>
		</div>
	</div>
</template>
<style scoped lang="scss">
.blog-content {
	padding-left: 4rem;
	transition: all 0.3s ease-in-out;
	width: 100%;
	line-height: 1.7;
	color: #333;

	// Dark mode support
	body.dark & {
		color: #e5e7eb;
	}
}

@media only screen and (max-width: 600px) {
	.blog-content {
		padding-left: 0;
	}
}

// Headings
.blog-content :deep(h1) {
	font-size: 2.5rem;
	font-weight: 700;
	margin-top: 2rem;
	margin-bottom: 1rem;
	padding-bottom: 0.5rem;
	border-bottom: 2px solid #e5e7eb;
	color: #111827;
	line-height: 1.2;

	body.dark & {
		color: #f9fafb;
		border-bottom-color: #374151;
	}
}

.blog-content :deep(h2) {
	font-size: 2rem;
	font-weight: 600;
	margin-top: 1.75rem;
	margin-bottom: 0.875rem;
	padding-bottom: 0.375rem;
	border-bottom: 1px solid #e5e7eb;
	color: #1f2937;
	line-height: 1.3;

	body.dark & {
		color: #f3f4f6;
		border-bottom-color: #4b5563;
	}
}

.blog-content :deep(h3) {
	font-size: 1.5rem;
	font-weight: 600;
	margin-top: 1.5rem;
	margin-bottom: 0.75rem;
	color: #374151;
	line-height: 1.4;

	body.dark & {
		color: #e5e7eb;
	}
}

.blog-content :deep(h4) {
	font-size: 1.25rem;
	font-weight: 600;
	margin-top: 1.25rem;
	margin-bottom: 0.625rem;
	color: #4b5563;
	line-height: 1.4;

	body.dark & {
		color: #d1d5db;
	}
}

.blog-content :deep(h5) {
	font-size: 1.125rem;
	font-weight: 600;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
	color: #6b7280;
	line-height: 1.5;

	body.dark & {
		color: #9ca3af;
	}
}

.blog-content :deep(h6) {
	font-size: 1rem;
	font-weight: 600;
	margin-top: 0.875rem;
	margin-bottom: 0.5rem;
	color: #6b7280;
	line-height: 1.5;

	body.dark & {
		color: #9ca3af;
	}
}

// Paragraphs
.blog-content :deep(p) {
	margin-bottom: 1rem;
	line-height: 1.75;
	color: #374151;

	body.dark & {
		color: #d1d5db;
	}
}

// Links
.blog-content :deep(a) {
	color: #2563eb;
	text-decoration: underline;
	text-underline-offset: 2px;
	transition: color 0.2s ease;

	&:hover {
		color: #1d4ed8;
		text-decoration-thickness: 2px;
	}

	&:visited {
		color: #7c3aed;
	}

	body.dark & {
		color: #60a5fa;

		&:hover {
			color: #93c5fd;
		}

		&:visited {
			color: #a78bfa;
		}
	}
}

// Lists
.blog-content :deep(ul),
.blog-content :deep(ol) {
	margin-bottom: 1rem;
	margin-left: 1.5rem;
	padding-left: 1rem;
}

.blog-content :deep(ul) {
	list-style-type: disc;
}

.blog-content :deep(ol) {
	list-style-type: decimal;
}

.blog-content :deep(li) {
	margin-bottom: 0.5rem;
	line-height: 1.75;
	color: #374151;

	body.dark & {
		color: #d1d5db;
	}

	// Nested lists
	> ul,
	> ol {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
}

// Code blocks
.blog-content :deep(pre) {
	background-color: #1f2937;
	border-radius: 0.5rem;
	padding: 1rem;
	margin-bottom: 1.5rem;
	max-height: 500px;
	overflow: auto;
	font-size: 0.875rem;
	line-height: 1.5;
	border: 1px solid #374151;

	body.dark & {
		background-color: #222d45;
		border-color: #374151;
	}

	code {
		background-color: transparent !important;
		padding: 0 !important;
		border-radius: 0 !important;
		font-size: inherit ;
		color: #e5e7eb !important;
	}

	// Custom scrollbar styling
	&::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	&::-webkit-scrollbar-track {
		background: #1f2937;
		border-radius: 4px;

		body.dark & {
			background: #111827;
		}
	}

	&::-webkit-scrollbar-thumb {
		background: #4b5563;
		border-radius: 4px;
		border: 1px solid #374151;

		&:hover {
			background: #6b7280;
		}

		body.dark & {
			background: #4b5563;
			border-color: #374151;

			&:hover {
				background: #6b7280;
			}
		}
	}

	// Firefox scrollbar
	scrollbar-width: thin;
	scrollbar-color: #4b5563 #1f2937;

	body.dark & {
		scrollbar-color: #4b5563 #111827;
	}
}

// Inline code
.blog-content :deep(code) {
	background-color: #f3f4f6;
	color: #dc2626;
	padding: 0.125rem 0.375rem;
	border-radius: 0.25rem;
	font-size: 0.875em;
	font-family: "Courier New", Courier, monospace;
	font-weight: 500;

	body.dark & {
		background-color: #374151;
		color: #f87171;
	}

	// Code inside pre should not have background
	pre & {
		background-color: transparent;
		color: inherit;
		padding: 0;
	}
}

// Blockquotes
.blog-content :deep(blockquote) {
	border-left: 4px solid #3b82f6;
	padding-left: 1rem;
	margin-left: 0;
	margin-right: 0;
	margin-bottom: 1rem;
	margin-top: 1rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	background-color: #eff6ff;
	font-style: italic;
	color: #1e40af;

	body.dark & {
		border-left-color: #60a5fa;
		background-color: #1e3a8a;
		color: #bfdbfe;
	}

	p {
		margin-bottom: 0.5rem;

		&:last-child {
			margin-bottom: 0;
		}
	}
}

// Images
.blog-content :deep(img) {
	max-width: 100%;
	height: auto;
	border-radius: 0.5rem;
	margin-top: 1.5rem;
	margin-bottom: 1.5rem;
	box-shadow:
		0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
	display: block;
	margin-left: auto;
	margin-right: auto;
}

// Horizontal rules
.blog-content :deep(hr) {
	border: none;
	border-top: 2px solid #e5e7eb;
	margin: 2rem 0;
	width: 100%;

	body.dark & {
		border-top-color: #4b5563;
	}
}

// Tables
.blog-content :deep(table) {
	width: 100%;
	border-collapse: collapse;
	margin-bottom: 1.5rem;
	font-size: 0.875rem;
	overflow-x: auto;
	display: block;

	@media (min-width: 768px) {
		display: table;
	}
}

.blog-content :deep(thead) {
	background-color: #f9fafb;
	border-bottom: 2px solid #e5e7eb;

	body.dark & {
		background-color: #1f2937;
		border-bottom-color: #374151;
	}
}

.blog-content :deep(tbody) {
	tr {
		border-bottom: 1px solid #e5e7eb;

		body.dark & {
			border-bottom-color: #374151;
		}

		&:hover {
			background-color: #f9fafb;

			body.dark & {
				background-color: #1f2937;
			}
		}
	}
}

.blog-content :deep(th),
.blog-content :deep(td) {
	padding: 0.75rem 1rem;
	text-align: left;
	border-right: 1px solid #e5e7eb;

	body.dark & {
		border-right-color: #374151;
	}

	&:last-child {
		border-right: none;
	}
}

.blog-content :deep(th) {
	font-weight: 600;
	color: #111827;
	text-transform: uppercase;
	font-size: 0.75rem;
	letter-spacing: 0.05em;

	body.dark & {
		color: #f9fafb;
	}
}

.blog-content :deep(td) {
	color: #374151;

	body.dark & {
		color: #d1d5db;
	}
}

// Text formatting
.blog-content :deep(strong),
.blog-content :deep(b) {
	font-weight: 700;
	color: #111827;

	body.dark & {
		color: #f9fafb;
	}
}

.blog-content :deep(em),
.blog-content :deep(i) {
	font-style: italic;
}

.blog-content :deep(del),
.blog-content :deep(s) {
	text-decoration: line-through;
	opacity: 0.7;
}

.blog-content :deep(mark) {
	background-color: #fef08a;
	color: #78350f;
	padding: 0.125rem 0.25rem;
	border-radius: 0.25rem;

	body.dark & {
		background-color: #78350f;
		color: #fef08a;
	}
}

.blog-content :deep(small) {
	font-size: 0.875em;
	opacity: 0.8;
}

.blog-content :deep(sub),
.blog-content :deep(sup) {
	font-size: 0.75em;
	line-height: 0;
	position: relative;
	vertical-align: baseline;
}

.blog-content :deep(sub) {
	bottom: -0.25em;
}

.blog-content :deep(sup) {
	top: -0.5em;
}

// Definition lists
.blog-content :deep(dl) {
	margin-bottom: 1rem;
}

.blog-content :deep(dt) {
	font-weight: 600;
	margin-top: 0.75rem;
	margin-bottom: 0.25rem;
	color: #111827;

	body.dark & {
		color: #f9fafb;
	}
}

.blog-content :deep(dd) {
	margin-left: 1.5rem;
	margin-bottom: 0.5rem;
	color: #374151;

	body.dark & {
		color: #d1d5db;
	}
}

// Address
.blog-content :deep(address) {
	font-style: normal;
	margin-bottom: 1rem;
}

// Details and Summary
.blog-content :deep(details) {
	margin-bottom: 1rem;
	border: 1px solid #e5e7eb;
	border-radius: 0.5rem;
	padding: 0.75rem;
	background-color: #f9fafb;

	body.dark & {
		border-color: #4b5563;
		background-color: #1f2937;
	}
}

.blog-content :deep(summary) {
	font-weight: 600;
	cursor: pointer;
	padding: 0.5rem;
	margin: -0.75rem;
	margin-bottom: 0.5rem;
	border-radius: 0.5rem;
	user-select: none;

	&:hover {
		background-color: #f3f4f6;

		body.dark & {
			background-color: #374151;
		}
	}
}

// Keyboard input
.blog-content :deep(kbd) {
	background-color: #f3f4f6;
	border: 1px solid #d1d5db;
	border-radius: 0.25rem;
	box-shadow:
		0 1px 0 rgba(0, 0, 0, 0.2),
		inset 0 0 0 2px #fff;
	color: #111827;
	font-family: "Courier New", Courier, monospace;
	font-size: 0.875em;
	padding: 0.125rem 0.375rem;

	body.dark & {
		background-color: #374151;
		border-color: #4b5563;
		color: #f9fafb;
		box-shadow:
			0 1px 0 rgba(0, 0, 0, 0.5),
			inset 0 0 0 2px #1f2937;
	}
}

// Abbreviations
.blog-content :deep(abbr[title]) {
	cursor: help;
	text-decoration: underline;
	text-decoration-style: dotted;
	text-underline-offset: 2px;
}

// First and last child adjustments
.blog-content :deep(> *:first-child) {
	margin-top: 0;
}

.blog-content :deep(> *:last-child) {
	margin-bottom: 0;
}

// Print styles
@media print {
	.blog-content {
		padding-left: 0;

		:deep(a) {
			color: #000;
			text-decoration: underline;
		}

		:deep(pre) {
			background-color: #f5f5f5;
			border: 1px solid #ccc;
		}

		:deep(code) {
			background-color: #f5f5f5;
			color: #000;
		}

		:deep(blockquote) {
			border-left-color: #ccc;
			background-color: #f9f9f9;
		}
	}
}
</style>
