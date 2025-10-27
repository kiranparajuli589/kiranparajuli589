<template>
	<UCard variant="flat" color="transparent" class="blog">
		<div class="py-8" />
		<template #header>
			<h1>Blogs</h1>
		</template>

		<div class="mb-4">
			I write blogs occasionally. I mostly write about things I learn, things I find interesting, and things I want to share.
		</div>

		<template v-if="loading">
			<div class="flex flex-col gap-4">
				<USkeleton class="h-64" />
				<USkeleton class="h-64" />
				<USkeleton class="h-64" />
			</div>
		</template>

		<template v-else>
			<template v-for="(blog, index) in frontMatters" :key="index">
				<UCard v-if="blog && blog.title" class="blog--item mb-4 hover:shadow-lg transition-shadow cursor-pointer"
					@click="navigateTo(`/blog/${blog.fileName.replace('.md', '')}`)"
				>
					<template #header>
						<h2 class="blog--title">
							{{ blog.title }}
						</h2>
					</template>

					<div class="blog--tags flex flex-wrap gap-2 mb-4" v-if="blog.tags">
						<template v-if="Array.isArray(blog.tags)">
							<div v-for="(tag, index) in blog.tags" :key="index" class="bg-gray-200 px-2 py-1 rounded dark:bg-gray-800">
								{{ tag }}
							</div>
						</template>
					</div>

					<div class="blog--info flex justify-between text-sm text-gray-600 dark:text-gray-400">
						<div class="blog--date">{{ new Date(blog.date).toDateString() }}</div>
						<div class="blog--time-to-read">{{ Math.ceil(blog.contentLength / 1000) }} minutes read</div>
					</div>
				</UCard>
			</template>
		</template>
	</UCard>
</template>
<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import { readAssets, htmlMark } from '~/utils'

const mdp = htmlMark()

const frontMatters = reactive<any[]>([])
const loading = ref<boolean>(true)

onBeforeMount(async () => {
	const blogMarkdowns = await readAssets()

	blogMarkdowns.forEach(blog => {
		const frontMatter = mdp.getFrontMatter(blog.content)
		if (!frontMatter) return
		frontMatters.push({ ...frontMatter, contentLength: blog.content.length, fileName: blog.fileName, filePath: blog.path })
	})

	loading.value = false
})
</script>

