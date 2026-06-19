<script lang="ts" setup>
import ServicesSection from "~/components/home/ServicesSection.vue";
import MyWorks from "~/components/home/MyWorks.vue";
import { useSeo } from "~/composables/useSeo";

const siteUrl = "https://kiranparajuli.com.np";
const currentUrl = `${siteUrl}/works`;
const imageUrl = `${siteUrl}/letter_k.png`;

useSeo({
	title: "Side Projects & Consulting",
	description:
		"Secondary open-source and portfolio work by Kiran Parajuli—outside primary full-time Senior Frontend Engineer roles. Not actively seeking freelance engagements.",
	keywords:
		"Kiran Parajuli, Open Source, Vue.js, React.js, Portfolio Projects, Side Projects, Nepal",
	image: imageUrl,
	url: currentUrl,
	type: "website",
});
</script>

<template>
	<div>
		<section class="pb-8">
			<h1 class="text-4xl font-bold">Side projects & consulting</h1>
			<p class="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
				<strong>Side projects &amp; consulting (secondary)</strong> — Open-source and
				portfolio work outside primary full-time Senior Frontend Engineer roles.
				Not actively seeking freelance engagements.
			</p>
		</section>
		<ServicesSection />
		<MyWorks />
	</div>
</template>
