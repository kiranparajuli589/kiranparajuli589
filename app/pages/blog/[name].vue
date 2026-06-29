<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import {
	useSeo,
	createArticleStructuredData,
	SITE_JOB_TITLE,
} from "~/composables/useSeo";

interface BlogSummary {
	slug: string;
	title: string;
	date: string;
	tags: string[];
	description: string;
	readTime: number;
	image: string;
}

const route = useRoute();
const name = route.params.name as string;
const siteUrl = useRuntimeConfig().public.siteUrl;

const { data: blog, error } = await useAsyncData(`blog-${name}`, () =>
	$fetch(`/api/blogs/${name}`),
);

if (error.value || !blog.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Blog not found",
		fatal: true,
	});
}

const post = blog.value;

// Sibling navigation (prev = newer, next = older) from the shared list.
const { data: list } = await useAsyncData<BlogSummary[]>("blogs-list", () =>
	$fetch("/api/blogs"),
);

const siblings = computed(() => {
	const items = list.value ?? [];
	const index = items.findIndex((item) => item.slug === post.slug);
	if (index === -1) return { prev: null, next: null };
	return {
		prev: index > 0 ? items[index - 1] : null,
		next: index < items.length - 1 ? items[index + 1] : null,
	};
});

const currentUrl = `${siteUrl}/blog/${post.slug}`;
const publishedTime = post.date
	? new Date(post.date).toISOString()
	: new Date().toISOString();

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

// Reading progress bar (client-only behavior).
const progress = ref(0);

function updateProgress() {
	const el = document.documentElement;
	const scrollable = el.scrollHeight - el.clientHeight;
	progress.value = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0;
}

onMounted(() => {
	updateProgress();
	window.addEventListener("scroll", updateProgress, { passive: true });
	window.addEventListener("resize", updateProgress, { passive: true });
});

onBeforeUnmount(() => {
	window.removeEventListener("scroll", updateProgress);
	window.removeEventListener("resize", updateProgress);
});

// SEO runs synchronously after the awaited data resolves, so it is emitted
// into the SSR HTML (this is the fix for social scrapers seeing generic meta).
useSeo({
	title: post.title,
	description: post.description,
	keywords: `${post.tags.join(", ")}, Kiran Parajuli, Tech Blog, Software Development`,
	image: post.image,
	url: currentUrl,
	type: "article",
	publishedTime,
	structuredData: createArticleStructuredData({
		headline: post.title,
		description: post.description,
		image: post.image,
		datePublished: publishedTime,
		dateModified: publishedTime,
		authorName: "Kiran Parajuli",
		authorUrl: siteUrl,
		authorJobTitle: SITE_JOB_TITLE,
		publisherName: "Kiran Parajuli",
		publisherImage: post.image,
		keywords: post.tags.join(", "),
		url: currentUrl,
	}),
});
</script>
<template>
	<article class="blog-post w-full">
		<div
			class="reading-progress"
			aria-hidden="true"
			:style="{ width: `${progress}%` }"
		/>

		<UButton
			to="/blogs"
			color="neutral"
			variant="link"
			icon="i-heroicons-arrow-left"
			class="-ml-2 mb-4"
		>
			All articles
		</UButton>

		<header class="blog-post__header">
			<h1 class="text-3xl font-black leading-tight md:text-4xl">
				{{ post.title }}
			</h1>

			<div
				class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
			>
				<span class="inline-flex items-center gap-1.5">
					<UIcon name="i-heroicons-calendar" />
					{{ formatDate(post.date) }}
				</span>
				<span class="inline-flex items-center gap-1.5">
					<UIcon name="i-heroicons-clock" />
					{{ post.readTime }} min read
				</span>
			</div>

			<div v-if="post.tags.length" class="mt-4 flex flex-wrap gap-1.5">
				<UBadge
					v-for="tag in post.tags"
					:key="tag"
					color="primary"
					variant="subtle"
					size="sm"
				>
					{{ tag }}
				</UBadge>
			</div>
		</header>

		<hr class="my-6 border-gray-200 dark:border-gray-700" />

		<!-- eslint-disable vue/no-v-html -->
		<div
			class="blog-content bg-white dark:bg-gray-900 pt-6 rounded-xl p-4"
			v-html="post.html"
		/>
		<!-- eslint-enable vue/no-v-html -->

		<nav
			v-if="siblings.prev || siblings.next"
			class="blog-post__nav mt-12 grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 dark:border-gray-700 sm:grid-cols-2"
		>
			<NuxtLink
				v-if="siblings.prev"
				class="group rounded-xl border border-gray-200 p-4 transition-colors hover:border-primary-400 dark:border-gray-700"
				:to="`/blog/${siblings.prev.slug}`"
			>
				<span
					class="flex items-center gap-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"
				>
					<UIcon name="i-heroicons-arrow-left" /> Newer
				</span>
				<span
					class="mt-1 block font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400"
				>
					{{ siblings.prev.title }}
				</span>
			</NuxtLink>
			<span v-else class="hidden sm:block" />

			<NuxtLink
				v-if="siblings.next"
				class="group rounded-xl border border-gray-200 p-4 text-right transition-colors hover:border-primary-400 dark:border-gray-700"
				:to="`/blog/${siblings.next.slug}`"
			>
				<span
					class="flex items-center justify-end gap-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"
				>
					Older <UIcon name="i-heroicons-arrow-right" />
				</span>
				<span
					class="mt-1 block font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400"
				>
					{{ siblings.next.title }}
				</span>
			</NuxtLink>
		</nav>
	</article>
</template>
<style scoped lang="scss">
.blog-post {
	position: relative;
}

.reading-progress {
	position: fixed;
	top: 0;
	left: 0;
	height: 3px;
	z-index: 50;
	background: linear-gradient(
		90deg,
		var(--ui-color-primary-400),
		var(--ui-color-primary-600)
	);
	transition: width 0.1s ease-out;
}
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
		font-size: inherit;
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
