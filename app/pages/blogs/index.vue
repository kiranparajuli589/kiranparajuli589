<script setup lang="ts">
import { ref, reactive, onBeforeMount } from "vue";
import { readAssets, htmlMark } from "~/utils";
import {
	useSeo,
	createCollectionPageStructuredData,
} from "~/composables/useSeo";

interface BlogFrontMatter {
	title: string;
	date: string;
	tags: string[];
	fileName: string;
	filePath: string;
	contentLength: number;
}

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/blogs`;
const imageUrl = `${siteUrl}/letter_k.png`;

const mdp = htmlMark();

const frontMatters = reactive<BlogFrontMatter[]>([]);
const loading = ref<boolean>(true);

onBeforeMount(async () => {
	const blogMarkdowns = await readAssets();

	blogMarkdowns.forEach((blog) => {
		const frontMatter = mdp.getFrontMatter(blog.content);
		if (!frontMatter) return;
		frontMatters.push({
			title: String(frontMatter.title || ""),
			date: String(frontMatter.date || ""),
			tags: Array.isArray(frontMatter.tags) ? frontMatter.tags as string[] : [],
			contentLength: blog.content.length,
			fileName: blog.fileName,
			filePath: blog.path,
		});
	});

	loading.value = false;
});

// Page-specific SEO
useSeo({
	title: "Blogs",
	description:
		"Read tech blogs, tutorials, and articles by Kiran Parajuli on software development, Python, Django, Vue.js, React.js, QA automation, and web development.",
	keywords:
		"Kiran Parajuli Blog, Tech Blog, Software Development Blog, Django Tutorial, Vue.js Tutorial, QA Automation Blog, Web Development Articles, Programming Tutorials",
	image: imageUrl,
	url: currentUrl,
	type: "website",
	structuredData: createCollectionPageStructuredData({
		name: "Kiran Parajuli Blog",
		description: "Tech blogs, tutorials, and articles on software development",
		url: currentUrl,
	}),
});
</script>
<template>
	<UCard variant="subtle" color="transparent" class="blog">
		<div class="py-8" />
		<template #header>
			<h1>Blogs</h1>
		</template>

		<div class="mb-4">
			I write blogs occasionally. I mostly write about things I learn, things I
			find interesting, and things I want to share.
		</div>

		<template v-if="loading">
			<div class="flex flex-col gap-4">
				<USkeleton class="h-64" />
				<USkeleton class="h-64" />
				<USkeleton class="h-64" />
			</div>
		</template>

		<template v-else>
			<template v-for="(blog, blogIndex) in frontMatters" :key="blogIndex">
				<UCard
					v-if="blog && blog.title"
					class="blog--item mb-4 hover:shadow-lg transition-shadow cursor-pointer"
					@click="navigateTo(`/blog/${blog.fileName.replace('.md', '')}`)"
				>
					<template #header>
						<h2 class="blog--title">
							{{ blog.title }}
						</h2>
					</template>

					<div v-if="blog.tags" class="blog--tags flex flex-wrap gap-2 mb-4">
						<template v-if="Array.isArray(blog.tags)">
							<div
								v-for="(tag, index) in blog.tags"
								:key="index"
								class="bg-gray-200 px-2 py-1 rounded dark:bg-gray-800"
							>
								{{ tag }}
							</div>
						</template>
					</div>

					<div
						class="blog--info flex justify-between text-sm text-gray-600 dark:text-gray-400"
					>
						<div class="blog--date">
							{{ new Date(blog.date).toDateString() }}
						</div>
						<div class="blog--time-to-read">
							{{ Math.ceil(blog.contentLength / 1000) }} minutes read
						</div>
					</div>
				</UCard>
			</template>
		</template>
	</UCard>
</template>
