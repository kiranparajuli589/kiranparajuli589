<template>
	<NuxtLayout name="home">
		<div class="resume">
			<h1 class="mb-10 pt-12">
				Resume
				<v-chip color="primary" :to="{name: 'ResumePdf'}"
								title="Download a copy of my resume"
				>
					<v-icon>mdi-download</v-icon>

					<span class="px-1 font-weight-bold">Download Pdf</span>
				</v-chip>
			</h1>
			<h2>Tools I Use</h2>
			<div class="section-divider" />
			<p class="mb-7">These are, but not limited to, the techs I use for different services.</p>
			<i class=" colored" />

			<v-card v-for="tech in Techs" :key="tech.name"
							class="mb-4" variant="outlined"
			>
				<v-card-title>{{tech.name}}</v-card-title>
				<v-divider />
				<v-card-text class="tech-list">
					<div v-for="(tool, index) in tech.tools" :key="index" :title="tool.tooltip">
						<i v-if="tool.class" class="colored" :class="tool.class" />
						<img v-if="tool.image" :src="getAssetUrl(tool.image)" />
					</div>
				</v-card-text>
			</v-card>
			<div class="py-12" />
			<ExperienceSection />
		</div>
	</NuxtLayout>
</template>
<script setup lang="ts">
import Resume from "@/utils/resume"
import {getAssetUrl} from "@/utils/helper"
import ExperienceSection from "@/components/home/ExperienceSection.vue"

const Techs = Resume.technologies

useSeoMeta({
	title: "Resume | " + Resume.personalInfo.name + " | " + Resume.personalInfo.bio,
	ogTitle: "Resume | " + Resume.personalInfo.name + " | " + Resume.personalInfo.bio,
})
</script>
<style lang="scss">
.tech-list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 1rem;
	i {
		font-size: 4rem;
	}
	img {
		width: 4rem;
		height: auto;
	}
	filter: grayscale(1);
	&:hover {
		filter: grayscale(0);
	}
}
div[title='Behat'] {
	img {
		height: 3.8rem;
		width: 3rem;
	}
}
body.dark {
	div[title='Behat'], div[title='VPS'], div[title='GitHub CI'], div[title='Django'] {
		filter: invert(1);
	}
}
</style>
