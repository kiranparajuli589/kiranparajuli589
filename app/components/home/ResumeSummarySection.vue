<script setup lang="ts">
import Resume from "~/utils/resume";
import ItemList from "./ItemList.vue";

const personalInfo = Resume.personalInfo;
const leadershipHighlights = Resume.leadershipHighlights;
</script>

<template>
	<section class="py-8">
		<h2 class="text-2xl font-bold">{{ personalInfo.role }}</h2>
		<p class="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
			{{ personalInfo.summary }}
		</p>
		<div class="mt-6">
			<h3 class="mb-3 font-semibold">Leadership & delivery</h3>
			<ItemList :items="leadershipHighlights.slice(0, 4)" no-split />
		</div>
	</section>
</template>
