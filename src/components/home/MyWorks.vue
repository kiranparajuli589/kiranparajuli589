<template>
	<div class="home--works" id="works">
		<h1 class="section-title">My Works</h1>
		<div class="section-subtitle">Some of My Projects</div>
		<div class="section-divider" />
		<div class="cards-list">
			<v-card v-for="work in works"
				:key="work.title" elevation="4"
				variant="elevated" class="work--card"
			>
				<v-card-title>
					<h2 class="work--card--title">{{work.title}}</h2>
				</v-card-title>
				<v-card-text>
					<v-img :src="getAssetUrl(work.thumbnail)" height="auto" width="100%" />
				</v-card-text>
				<v-card-text>
					{{work.description}}
				</v-card-text>
				<v-divider />
				<v-card-text class="list links">
					<a v-for="[key, value] in Object.entries(work.links)" :key="key" :href="value"
						target="_blank" rel="noopener noreferrer" :title="capitalize(key)"
					>
						{{key}}
					</a>
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>
<script lang="ts" setup>
import {capitalize} from "vue"
import {getAssetUrl} from "@/helper"

const works: Work[] = [
	{
		title: "VueYtframe",
		description: "A Vue component to embed YouTube videos in your Vue app.",
		thumbnail: "vue-ytparser.png",
		technologies: ["VueJs", "Youtube Iframe API"],
		links: {
			github: "https://github.com/kiranparajuli589/vue3-ytframe",
			demo: "https://kiranparajuli589.github.io/vue3-ytframe/#/docs/ref=getting-started",
			playground: "https://kiranparajuli589.github.io/vue3-ytframe/#/playground"
		}
	},
	{
		title: "Markdown Parser",
		description: "A simple yet powerful markdown parser for NodeJS or Javascript.",
		thumbnail: "markdown-parser.png",
		technologies: ["NodeJS", "Javascript", "Modular Programming", "Recursion"],
		links: {
			github: "https://github.com/kiranparajuli589/md-parser",
			demo: "https://kiranparajuli589.github.io/md-parser/",
		}
	},
	{
		title: "Sachchai Kendra Nepal",
		description: "A website for Sachchai Kendra Nepal, a non-profit religious organization.",
		thumbnail: "sachchai-kendra-nepal.png",
		technologies: ["Vue3", "Vuetify", "Djangorestframework", "MySQL"],
		links: {
			demo: "https://sachchaikendranepal.org.np/",
		}
	},
	{
		title: "FoodSwipe",
		description: "A food delivery e-commerce website with beautiful carts and powerful order & transaction management.",
		thumbnail: "foodswipe.png",
		technologies: ["Vue2", "Vuetify", "Djangorestframework", "MySQL"],
		links: {
			demo: "https://foodswipe.com.np/",
			github: "https://github.com/foodswipe",
		}
	},
	{
		title: "WordClub",
		description: "A reddit based social media website for writers and readers.",
		thumbnail: "wordclub.png",
		technologies: ["Vue2", "Vuetify", "Djangorestframework", "MySQL"],
		links: {
			github: "https://github.com/word-club",
			demo: "https://wordclub.com.np/",
		}
	},
	{
		title: "Bagmati Nepal Sports Website",
		description: "A website for Bagmati Nepal Sports Government, providing news and information about the current sports events.",
		thumbnail: "bagmati-nepal-sports.png",
		technologies: ["Vue2", "Vuetify", "Laravel", "MySQL"],
		links: {
			website: "https://sports.bagamati.gov.np/",
		}
	}
]
</script>
