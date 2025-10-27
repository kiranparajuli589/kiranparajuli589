<script lang="ts" setup>
import Resume from "@/resume";
import { capitalize } from "vue";
import { getAssetUrl } from "@/helper";

const works = Resume.works;
</script>
<template>
	<div id="works" class="home--works">
		<h1 class="section-title">My Works</h1>
		<div class="section-subtitle">Some of My Projects</div>
		<div class="section-divider" />
		<div class="cards-list">
			<v-card
				v-for="work in works"
				:key="work.title"
				elevation="4"
				variant="elevated"
				class="work--card"
			>
				<v-card-title>
					<h2 class="work--card--title">{{ work.title }}</h2>
				</v-card-title>
				<v-card-text>
					<v-card color="grey" elevation="6">
						<v-img
							height="auto"
							width="100%"
							style="max-height: 270px; object-fit: cover"
							:src="getAssetUrl(work.thumbnail)"
						/>
					</v-card>
				</v-card-text>
				<v-card-text>
					{{ work.description }}
				</v-card-text>
				<v-divider />
				<v-card-text class="list links">
					<a
						v-for="[key, value] in Object.entries(work.links)"
						:key="key"
						target="_blank"
						rel="noopener noreferrer"
						:href="value"
						:title="capitalize(key)"
					>
						{{ key }}
					</a>
				</v-card-text>
			</v-card>
		</div>
	</div>
</template>
<style lang="scss">
.home--works {
}
</style>
