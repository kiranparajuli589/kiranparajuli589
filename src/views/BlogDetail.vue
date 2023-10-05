<template>
	<div>
		<div class="blog-detail">
			<h1>{{ frontMatter.title }}</h1>
			<p>{{ new Date(frontMatter.date).toDateString() }}</p>
			<div class="blog-tags">
				<span v-for="(tag, index) in frontMatter.tags" :key="index">{{tag}}</span>
			</div>
			<br><br>
			<div class="blog-content" v-html="blogContent"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import {htmlMark} from "@/helper"
import {useRoute} from "vue-router"
import {onBeforeMount, ref} from "vue"
import { FrontMatter } from "..";

const mdp = htmlMark()
const route = useRoute()

const emptyFrontMatter: FrontMatter = {
	title: "",
	date: "",
	tags: [],
	fileName: "",
	filePath: "",
	contentLength: 0
}

const frontMatter = ref<FrontMatter>(emptyFrontMatter)

const blogContent = ref("")
const blogPath = `/src/assets/blogs/${route.params.name}.md`

const fileURL = new URL(blogPath, import.meta.url).href

onBeforeMount(async () => {
	const response = await fetch(fileURL)
	const text = await response.text()
	frontMatter.value = mdp.getFrontMatter(text)
	blogContent.value = mdp.parse(text)
})
</script>
<style lang="scss">
.blog-detail {
	.blog-tags {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: .2rem;
		span {
			background-color: #f5f5f5;
			padding: .2rem .5rem;
			border-radius: .5rem;
			border: 1px solid grey;
		}
	}
}

body.dark {
	.blog-detail {
		.blog-tags {
			span {
				background-color: #3d3d3d;
				color: #f5f5f5;
				border: 1px solid #3d3d3d;
			}
		}
	}
}

.blog-content {
	padding-left: 4rem;
	transition: all .3s ease-in-out;

	@media only screen and (max-width: 600px) {
		padding-left: 0;
	}


	width: 100%;

	h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote, pre {
		margin-bottom: .5rem;
	}
	ul, ol {
		padding-left: 1.5rem;
	}
	pre {
		padding: 1rem;
		background-color: #f5f5f5;
		border-radius: .5rem;
		border: 1px solid grey;
		max-height: 50vh;
		overflow: auto;
		code {
			background-color: transparent;
			padding: 0;
			border: none;
		}
	}

	code {
		background-color: #f5f5f5;
		border-radius: .25rem;
		border: 1px solid grey;
		padding-inline: .2rem;
	}
}

body.dark {
	.blog-content {
		pre {
			background-color: #3d3d3d;
			color: #f5f5f5;
			border: 1px solid #3d3d3d;
		}
		code {
			background-color: #3d3d3d;
			color: #f5f5f5;
			border: 1px solid #3d3d3d;
		}
	}
}
</style>
