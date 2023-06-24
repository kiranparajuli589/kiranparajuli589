<template>
	<NuxtLayout name="home">
		<IntroSection/>
		<ServicesSection/>
		<MyWorks/>
	</NuxtLayout>
</template>
<script lang="ts" setup>
import IntroSection from "@/components/home/IntroSection.vue"
import ServicesSection from "@/components/home/ServicesSection.vue"
import MyWorks from "@/components/home/MyWorks.vue"
import Resume from "@/utils/resume.ts"

useSeoMeta({
	title: Resume.personalInfo.name + " | " + Resume.personalInfo.bio,
	ogTitle: Resume.personalInfo.name + " | " + Resume.personalInfo.bio,
})
</script>
