<template>
	<v-card class="blog" variant="flat" color="transparent">
		<div class="py-8" />
		<v-card-title>
			<h1>Blogs</h1>
		</v-card-title>
		<v-card-subtitle>
			I write blogs occasionally. I mostly write about things I learn, things I find interesting, and things I want to share.
		</v-card-subtitle>
		<v-card-text>
			<template v-for="(blog, index) in frontMatters" :key="index">
				<v-card v-if="blog && blog.title" class="blog--item"
					:to="{
						name: 'BlogDetail',
						params: {
							name: blog.fileName.replace('.md', '')
						}
					}"
				>
					<v-card-text>
						<h2 class="blog--title">
							{{blog.title}}
						</h2>
					</v-card-text>
					<v-card-text class="blog--tags" v-if="blog.tags">
						<template v-if="Array.isArray(blog.tags)">
							<div v-for="(tag, index) in blog.tags" :key="index">
								{{tag}}
							</div>
						</template>
					</v-card-text>
					<v-card-text class="blog--info">
						<div class="blog--date">{{new Date(blog.date).toDateString()}}</div>
						<div class="blog--time-to-read">{{ Math.ceil(blog.contentLength / 1000) }} minutes read</div>
					</v-card-text>
				</v-card>
			</template>
		</v-card-text>
	</v-card>
</template>
<script setup lang="ts">
import { FrontMatter } from "@/customTypes";
import {readAssets, htmlMark} from "@/helper"
import {onBeforeMount, reactive} from "vue"

const mdp = htmlMark()

const frontMatters = reactive<FrontMatter[]>([])

onBeforeMount(async () => {
	const blogMarkdowns = await readAssets()
	blogMarkdowns.forEach(blog => {
		const frontMatter = mdp.getFrontMatter(blog.content)
		if(!frontMatter) return
		frontMatters.push({...frontMatter, contentLength: blog.content.length, fileName: blog.fileName, filePath: blog.path })
	})
})
</script>
<style lang="scss" scoped>
.blog {
	width: 100%;
	&--item {
		&:hover {
			box-shadow: 0 0 0 2px #e0e0e0;
			background: #f5f5f5;
			h2 {
				color: #3d3d3d;
			}
		}
	}
	&--info {
		display: flex;
		justify-content: space-between;
	}
	&--tags {
		padding-block: 0;
		display: flex;
		flex-wrap: wrap;
		gap: .2rem;
		div {
			background-color: #e0e0e0;
			padding: 0.25rem;
			border-radius: 0.25rem;
		}
		margin-bottom: 1rem;
	}
}

body.dark {
	.blog {
		&--item {
			&:hover {
				box-shadow: 0 0 0 2px #3d3d3d;
				background: #242424;
				h2 {
					color: #f5f5f5;
				}
			}
		}
		&--tags {
			div {
				background-color: #3d3d3d;
			}
		}
	}
}
</style>
