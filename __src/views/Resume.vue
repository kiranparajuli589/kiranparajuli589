<script setup lang="ts">
import ExperienceSection from "@/components/home/ExperienceSection.vue";
import ToolsSection from "@/components/home/ToolsSection.vue";
</script>
<template>
	<div class="resume">
		<h1 class="mb-10 pt-12">
			Resume
			<v-chip
				color="primary"
				title="Download a copy of my resume"
				:to="{ name: 'ResumePdf' }"
			>
				<v-icon>mdi-download</v-icon>

				<span class="px-1 font-weight-bold">Download Pdf</span>
			</v-chip>
		</h1>

		<ExperienceSection />
		<ToolsSection />
	</div>
</template>
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
div[title="Behat"] {
	img {
		height: 3.8rem;
		width: 3rem;
	}
}
body.dark {
	div[title="Behat"],
	div[title="VPS"] {
		filter: invert(1);
	}
}
</style>
