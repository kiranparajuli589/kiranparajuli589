<script setup lang="ts">
import Resume from "@/resume";
import { getAssetUrl } from "@/helper";

const Techs = Resume.technologies;
</script>
<template>
	<div class="home--tools">
		<h2>Tools I Use</h2>
		<div class="section-divider" />
		<p class="mb-7">
			These are, but not limited to, the techs I use for different services.
		</p>
		<i class="colored" />

		<v-card
			v-for="tech in Techs"
			:key="tech.name"
			class="mb-4"
			variant="outlined"
		>
			<v-card-title>{{ tech.name }}</v-card-title>
			<v-divider />
			<v-card-text class="tech-list">
				<div
					v-for="(tool, index) in tech.tools"
					:key="index"
					:title="tool.tooltip"
				>
					<i v-if="tool.class" class="colored" :class="tool.class" />
					<img v-if="tool.image" :src="getAssetUrl(tool.image)" />
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>
