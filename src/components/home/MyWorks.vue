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
					<v-card color="grey" elevation="6">
						<v-img :src="getAssetUrl(work.thumbnail)" height="auto" width="100%"
							style="max-height: 270px; object-fit: cover;"
						/>
					</v-card>
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
import Resume from "@/resume"
import {capitalize} from "vue"
import {getAssetUrl} from "@/helper"

const works = Resume.works
</script>
<style lang="scss">
.home--works {

}
</style>
