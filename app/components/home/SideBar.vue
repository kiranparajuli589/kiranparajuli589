<script setup lang="ts">
import Resume from "~/utils/resume";

const personalInfo = Resume.personalInfo;
const links = [
	{
		name: "LinkedIn",
		icon: "mdi:linkedin",
		href: personalInfo.linkedin,
		color: "text-blue-600 dark:text-white",
	},
	{
		name: "GitHub",
		icon: "mdi:github",
		href: personalInfo.github,
		color: "text-black dark:text-white",
	},
	{
		name: "dev.to",
		icon: "fa7-brands:dev",
		href: personalInfo.devto,
		color: "text-black dark:text-white",
	},
];
</script>
<template>
	<div class="flex flex-col gap-4 w-72 md:w-auto md:absolute md:left-8 top-24">
		<a
			v-for="link in links"
			:key="link.name"
			target="_blank"
			:title="link.name"
			:href="link.href"
		>
			<UIcon class="text-4xl" :name="link.icon" :class="link.color" />
		</a>
	</div>
</template>
