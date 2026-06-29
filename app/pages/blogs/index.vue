<script setup lang="ts">
import { computed, ref } from "vue";
import {
	useSeo,
	createCollectionPageStructuredData,
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

const siteUrl = useRuntimeConfig().public.siteUrl;
const currentUrl = `${siteUrl}/blogs`;
const imageUrl = `${siteUrl}/letter_k.png`;

const { data: blogs } = await useAsyncData<BlogSummary[]>("blogs-list", () =>
	$fetch("/api/blogs"),
);

const search = ref("");
const activeTag = ref<string | null>(null);

const allTags = computed(() => {
	const counts = new Map<string, number>();
	for (const blog of blogs.value ?? []) {
		for (const tag of blog.tags) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
		.map(([name, count]) => ({ name, count }));
});

const filteredBlogs = computed(() => {
	const term = search.value.trim().toLowerCase();
	return (blogs.value ?? []).filter((blog) => {
		const matchesTag = !activeTag.value || blog.tags.includes(activeTag.value);
		const matchesTerm =
			!term ||
			blog.title.toLowerCase().includes(term) ||
			blog.description.toLowerCase().includes(term) ||
			blog.tags.some((tag) => tag.toLowerCase().includes(term));
		return matchesTag && matchesTerm;
	});
});

const totalReadTime = computed(() =>
	(blogs.value ?? []).reduce((sum, blog) => sum + blog.readTime, 0),
);

function toggleTag(tag: string) {
	activeTag.value = activeTag.value === tag ? null : tag;
}

function clearFilters() {
	search.value = "";
	activeTag.value = null;
}

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

// Page-specific SEO (top-level, emitted during SSR).
useSeo({
	title: "Blogs",
	description:
		"Tech blogs and articles by Kiran Parajuli on frontend engineering, Vue.js, React.js, TypeScript, and web product delivery.",
	keywords:
		"Kiran Parajuli Blog, Senior Frontend Engineer, Vue.js, React.js, TypeScript, Web Development, Frontend Engineering",
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
	<div class="blog min-h-[70vh]">
		<header class="blog__header mb-8">
			<h1 class="text-4xl font-black tracking-tight">Blogs</h1>
			<p class="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
				I write occasionally about things I learn, find interesting, or want to
				share — mostly frontend engineering, performance, and the web platform.
			</p>
			<div
				class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500 dark:text-gray-400"
			>
				<span class="inline-flex items-center gap-1.5">
					<UIcon name="i-heroicons-document-text" />
					{{ blogs?.length ?? 0 }} articles
				</span>
				<span class="inline-flex items-center gap-1.5">
					<UIcon name="i-heroicons-clock" />
					{{ totalReadTime }} min of reading
				</span>
			</div>
		</header>

		<div class="blog__controls mb-6 flex flex-col gap-4">
			<UInput
				v-model="search"
				icon="i-heroicons-magnifying-glass"
				size="lg"
				placeholder="Search articles by title, summary, or tag…"
				:ui="{ root: 'w-full' }"
			/>
			<div v-if="allTags.length" class="flex flex-wrap gap-2">
				<UButton
					v-for="tag in allTags"
					:key="tag.name"
					size="xs"
					class="rounded-full"
					:color="activeTag === tag.name ? 'primary' : 'neutral'"
					:variant="activeTag === tag.name ? 'solid' : 'subtle'"
					@click="toggleTag(tag.name)"
				>
					{{ tag.name }}
					<span class="opacity-60">{{ tag.count }}</span>
				</UButton>
			</div>
		</div>

		<div v-if="filteredBlogs.length" class="blog__list grid grid-cols-1 gap-5">
			<NuxtLink
				v-for="blog in filteredBlogs"
				:key="blog.slug"
				class="blog__card group block"
				:to="`/blog/${blog.slug}`"
			>
				<UCard
					class="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-primary-500/40"
				>
					<div class="flex items-start justify-between gap-4">
						<h2
							class="text-xl font-semibold leading-snug transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400"
						>
							{{ blog.title }}
						</h2>
						<UIcon
							name="i-heroicons-arrow-up-right"
							class="mt-1 shrink-0 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
						/>
					</div>

					<p
						v-if="blog.description"
						class="mt-2 line-clamp-2 text-gray-600 dark:text-gray-300"
					>
						{{ blog.description }}
					</p>

					<div v-if="blog.tags.length" class="mt-4 flex flex-wrap gap-1.5">
						<UBadge
							v-for="tag in blog.tags"
							:key="tag"
							color="neutral"
							variant="subtle"
							size="sm"
						>
							{{ tag }}
						</UBadge>
					</div>

					<div
						class="mt-4 flex items-center gap-x-4 text-sm text-gray-500 dark:text-gray-400"
					>
						<span class="inline-flex items-center gap-1.5">
							<UIcon name="i-heroicons-calendar" />
							{{ formatDate(blog.date) }}
						</span>
						<span class="inline-flex items-center gap-1.5">
							<UIcon name="i-heroicons-clock" />
							{{ blog.readTime }} min read
						</span>
					</div>
				</UCard>
			</NuxtLink>
		</div>

		<div
			v-else
			class="blog__empty flex flex-col items-center gap-3 rounded-xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700"
		>
			<UIcon
				name="i-heroicons-magnifying-glass"
				class="text-3xl text-gray-400"
			/>
			<p class="text-gray-600 dark:text-gray-300">
				No articles match your search.
			</p>
			<UButton
				color="primary"
				variant="ghost"
				icon="i-heroicons-arrow-path"
				@click="clearFilters"
			>
				Clear filters
			</UButton>
		</div>
	</div>
</template>
