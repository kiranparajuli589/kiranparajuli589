<template>
	<div class="blog-content" v-html="blogContent"></div>
</template>
<script setup>
import {htmlMark} from "@/helper"
import {useRoute} from "vue-router"
import {onBeforeMount, ref} from "vue"

const mdp = htmlMark()
const route = useRoute()

const blogContent = ref("")
const blogPath = `/src/assets/blogs/${route.params.name}.md`

const fileURL = new URL(blogPath, import.meta.url).href
console.log(fileURL)
onBeforeMount(async () => {
	const response = await fetch(fileURL)
	const text = await response.text()
	blogContent.value = mdp.parse(text)
})
</script>
<style lang="scss">
.blog-content {
	padding-left: 4rem;
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
		width: 100%;
		overflow-y: auto;
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
