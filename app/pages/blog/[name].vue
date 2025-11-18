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
		<div v-else class="blog-detail">
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
			<br /><br />
			<div class="blog-content" v-html="blogContent"></div>
		</div>
	</div>
</template>
<style scoped>
.blog-content {
	padding-left: 4rem;
	transition: all 0.3s ease-in-out;
	width: 100%;
}

@media only screen and (max-width: 600px) {
	.blog-content {
		padding-left: 0;
	}
}

.blog-content :deep(h1),
.blog-content :deep(h2),
.blog-content :deep(h3),
.blog-content :deep(h4),
.blog-content :deep(h5),
.blog-content :deep(h6),
.blog-content :deep(p),
.blog-content :deep(ul),
.blog-content :deep(ol),
.blog-content :deep(blockquote),
.blog-content :deep(pre) {
	margin-bottom: 0.5rem;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
	padding-left: 1.5rem;
}

.blog-content :deep(pre) {
	padding: 1rem;
	background-color: #eaeaea;
	border-radius: 0.5rem;
	border: 1px solid grey;
	max-height: 50vh;
	overflow: auto;
}

.blog-content :deep(pre code) {
	background-color: transparent;
	padding: 0;
	border: none;
}

.blog-content :deep(code) {
	background-color: #f5f5f5;
	border-radius: 0.25rem;
	border: 1px solid grey;
	padding-inline: 0.2rem;
}

body.dark .blog-content :deep(pre) {
	background-color: #3d3d3d;
	color: #f5f5f5;
	border: 1px solid #3d3d3d;
}

body.dark .blog-content :deep(code) {
	background-color: #3d3d3d;
	color: #f5f5f5;
	border: 1px solid #3d3d3d;
}
</style>
