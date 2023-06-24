<template>
	<NuxtLayout name="home">
		<v-card class="blog" variant="flat" color="transparent">
			<div class="py-8" />
			<v-card-title>
				<h1>Blogs</h1>
			</v-card-title>
			<v-card-subtitle>
				I write blogs occasionally. Here are some of them.
			</v-card-subtitle>
			<v-card-text>
				No blogs yet.
			</v-card-text>
		</v-card>
	</NuxtLayout>
</template>
<script setup lang="ts">
import Resume from "~/utils/resume";

useSeoMeta({
	title: "Blog | " + Resume.personalInfo.name + " | " + Resume.personalInfo.bio,
	ogTitle: "Blog | " + Resume.personalInfo.name + " | " + Resume.personalInfo.bio,
})
</script>
